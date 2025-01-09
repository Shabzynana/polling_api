import "reflect-metadata";
import { app, server, io } from "./app";
import dotenv from "dotenv";
import AppDataSource from "./data-source";
// import app from "./app";
import config from "./config";
import log from "./utils/logger";



dotenv.config();

const port = config.port;

console.log("index.ts", !!io)         


AppDataSource.initialize()
  .then(async () => {
    server.listen(port, () => {
      log.info(`Server is listening on port ${port}`);

    });
  })
  .catch((error) => log.error(error));


io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  // socket.emit('vote-updated', { text: "This is a test message" });
  // setInterval(() => {
  //   socket.emit('vote-updated', {
  //     text: 1,
  //     optionId: 2,
  //     voteCount: Math.floor(Math.random() * 100),
  //   });
  // }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

