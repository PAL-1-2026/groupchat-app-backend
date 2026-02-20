import {io} from "socket.io-client";

const socket = io("http://localhost:8080");

socket.on("connect", () => {
    console.log("connected:", socket.id);
    socket.emit("join-group", "test123");
});

socket.on("message", (msg) => {
    console.log("new message:", msg);
});