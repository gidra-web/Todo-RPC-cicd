import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
dotenv.config();

//test list
let todoList = [
    { id: 1, text: "Text 1" },
    { id: 2, text: "Text 2" },
  ];
  //options
  const options = {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    };

const packageDef = protoLoader.loadSync(process.env.PROTO_PATH, options);
const grpcObject = grpc.loadPackageDefinition(packageDef).todoPackage;

const server = new grpc.Server();

server.addService(grpcObject.Todo.service, {
  createTodo: (call, callback) => {
    const _new = { id: Date.now(), ...call.request };
    todoList.push(call.request);
    callback(null, _new);
  },
  readTodo: (_, callback) => {
    callback(null, {"items": todoList}); //items match the rpc in TodoItems
  },
  updateTodo: (call, callback) => {
    const todo = todoList.find((t) => t.id === call.request.id);
    todo.text = call.request.text;
    callback(null, todo);
  },
  readTodoStream: (call) => {
    todoList.forEach(todo => {
      call.write(todo);  // Stream each todo item
    });
    call.end();  // Close the stream
  }
});
server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`server run`);
  }
);

