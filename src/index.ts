import "reflect-metadata";
import { app, server, io } from "./app";
import dotenv from "dotenv";
import AppDataSource from "./data-source";
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


