// import { Server } from "socket.io";
// import http from "http";

// // Function to initialize and return Socket.IO
// export const initializeSocket = (server: http.Server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//     },
//   });
  
//   return io;
// };

import { Server } from "socket.io";

let ioInstance: Server | null = null;

export const initializeSocket = (server: any) => {
  if (!ioInstance) {
    ioInstance = new Server(server);
    console.log('Socket.IO initialized');
  } else {
    console.log("Socket.IO instance already exists");
  }
  return ioInstance;
};

export const getSocketInstance = () => {
  if (!ioInstance) {
    throw new Error("Socket.IO instance is not initialized yet");
  }
  return ioInstance;
};

