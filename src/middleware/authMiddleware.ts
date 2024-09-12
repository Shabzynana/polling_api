import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { User } from "../models";
import { JwtPayload } from "../types";

// import log from "../utils/logger";
import { ServerError } from "./error";

export const authMiddleware = async (
  // req: Request & { user?: User },
  req: Request & { user?: { user_id: string; } },
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status_code: "401",
        message: "Invalid token",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status_code: "401",
        message: "Invalid token",
      });
    }

    jwt.verify(token, config.TOKEN_SECRET, async (err, decoded) => {
      if (err || !decoded) {
        return res.status(401).json({
          status_code: "401",
          message: "Invalid token",
        });
      }

      // log.info(decoded);

      const { user_id } = decoded as JwtPayload;
      // log.info(`user with id ${user_id} is logged in`);
      console.log(`user with id ${user_id} is logged in`);

      const user = await User.findOne({
        where: { id: user_id },
      });

      if (!user) {
        return res.status(401).json({
          status_code: "401",
          message: "Invalid token",
        });
      }

      req.user = {
        email: user.email,
        user_id: user.id,
        username: user.username,
      };

      next();
    });
  } catch (error) {
    console.log(error);
    // log.error(error);
    throw new ServerError("INTERNAL_SERVER_ERROR");
  }
};
