import { Server } from "socket.io";

let io: Server;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://44.222.124.225:3000",
  "https://groupchat-kabw.akbarfikri.my.id",
  ...(process.env.APP_ORIGIN ? process.env.APP_ORIGIN.split(",").map((origin) => origin.trim()) : []),
];

export function initSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    },
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
