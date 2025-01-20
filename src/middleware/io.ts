// middleware/io.ts
import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | null = null;

export const initializeSocket = (server: HTTPServer) => {
  if (!io) {
    io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization"],
      },
    });

    // Socket.IO event handlers
    io.on("connection", (socket) => {
      console.log(`Client connected: ${socket.id}`);

      // Join a poll room
      socket.on("join_poll", (pollId: string) => {
        socket.join(pollId);
        console.log(`Client ${socket.id} joined poll: ${pollId}`);
      });

      // Leave a poll room
      socket.on("leave_poll", (pollId: string) => {
        socket.leave(pollId);
        console.log(`Client ${socket.id} left poll: ${pollId}`);
      });

      // Handle vote updates
      socket.on("vote_update", (data: { pollId: string; optionId: string }) => {
        socket.to(data.pollId).emit("vote_received", data);
      });

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });

    console.log("Socket.IO initialized successfully");
  }
  return io;
};

export const getIO = (): Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
};

// Helper function to emit events to specific rooms or all clients
export const emitSocketEvent = (event: string, room: string | null, data: any) => {
  const socket = getIO();
  if (room) {
    socket.to(room).emit(event, data);
  } else {
    socket.emit(event, data);
  }
};