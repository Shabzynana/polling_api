console.log("Initializing application...");

import express, { Express, Request, Response } from "express";
import { initializeSocket } from "./middleware/io";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig";
import { errorHandler, routeNotFound } from "./middleware";
import { authRoute, pollRoute, optionRoute, userRoute, voteRoute } from "./routes";
import http from 'http';
import path from 'path';
import cors from "cors";




const app: Express = express();
const server = http.createServer(app);

const io = initializeSocket(server);


app.options("*", cors());



// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//     allowedHeaders: [
//       "Origin",
//       "X-Requested-With",
//       "Content-Type",
//       "Authorization",
//     ],
//   },
// // });

// console.log( 'io runnung', !!initializeSocket())

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  }),
);


// app.use(Limiter);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get("/home", (req: Request, res: Response) => {
  res.send({
    message: "I am the express API responding for Polling System",
  });
});

app.use("/api/v1", authRoute);
app.use("/api/v1", pollRoute);
app.use("/api/v1", optionRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", voteRoute);



app.use("/openapi.json", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use(errorHandler);
app.use(routeNotFound);

console.log("index app.ts", !!io)


export { app, server, io };

