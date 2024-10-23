// test.js
import client from "./client";

client.createTodo({
    "id": 10,
    "text": "Todo 10"
}, (err, _) => {
    if (!err) throw err;
    console.log("Successfully created a todo.");
})

client.readTodos({}, (err, response) => {
    if (!err) throw err;
    console.log(response);
})

client.updateTodo({
    "id": 10,
    "text": "Todo 10 updated"
}, (err, response) => {
    if (!err) throw err;
    console.log("Successfully edited a todo.");
})

client.deleteTodo({
    "id": 10
}, (err, response) => {
    if (!err) throw err;
    console.log("Successfully deleted a todo item.");
})