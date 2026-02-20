import { Server } from "socket.io";

let io: Server;

export function initSocket(server: any) {
    io = new Server(server, {
        cors: { origin: "*" }
    });

    io.on("connection", (socket) => {
        console.log("connected:", socket.id);

        socket.on("join-group", (groupId: string) => {
            socket.join(groupId);
        });

        socket.on("leave-group", (groupId: string) => {
            socket.leave(groupId);
        });
    });

    return io;
}

export function getIO(): Server {
    if (!io) throw new Error("Socket not initialized");
    return io;
}
