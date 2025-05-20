// index.ts or app.ts
import express, { Express, Request, Response } from "express";
import { initializeSocket, getIO } from "./middleware/io";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig";
import { errorHandler, routeNotFound } from "./middleware";
import { authRoute, pollRoute, optionRoute, userRoute, voteRoute } from "./routes";
import http from 'http';
import path from 'path';
import cors from "cors";
import { startPollBroadcast } from "./helpers/emitData";
import { voteService } from "./controllers";

const app: Express = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = initializeSocket(server);

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization"],
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Add Socket.IO instance to request object
app.use((req: Request & { io?: any }, _res, next) => {
  req.io = getIO();
  next();
});

// Routes
app.get("/home", (_req: Request, res: Response) => {
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

app.get('/room/:pollId', (req, res) => {
  const pollId = req.params.pollId;
  res.render('room', { pollId });
});

// Error handling
app.use(errorHandler);
app.use(routeNotFound);

startPollBroadcast(voteService);

export { app, server, io };