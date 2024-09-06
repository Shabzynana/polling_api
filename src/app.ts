import cors from "cors";
import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
// import { errorHandler, routeNotFound } from "./middleware";
import { authRoute } from "./routes";
import swaggerSpec from "./config/swaggerConfig";
const app: Express = express();
app.options("*", cors());
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
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "I am the express API responding for Polling System",
  });
});

app.use("/api/v1", authRoute);


app.use("/openapi.json", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
// app.use(errorHandler);
// app.use(routeNotFound);

export default app;
