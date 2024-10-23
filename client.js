import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
dotenv.config();

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };

const grpcDef = protoLoader.loadSync(process.env.PROTO_PATH, options);
const grpcObject = grpc.loadPackageDefinition(grpcDef).todoPackage;

export const client = new grpcObject.Todo(
    "127.0.0.1:50051",
    grpc.credentials.createInsecure()
);

client.createTodo({
    "id": 10,
    "text": "Todo 10"
}, (err, response) => {
    console.log(response);
})

client.readTodo({}, (_, response) => {
    console.log(response);
});

client.updateTodo({
    "id": 1,
    "text": "Todo 1 updated"
}, (err, response) => {
    console.log(response);
});

const call = client.readTodoStream({}); 
call.on("data", (data) => {
    console.log("Received:", data);
});

call.on("end", () => {
    console.log("Stream ended");
});