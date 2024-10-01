import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import jwt from "jsonwebtoken";
import { User, UserType } from "../models";
import { asyncHandler } from "../helpers";
import { Forbidden, HttpError } from "./error";


export const checkPermission = (roles: UserType) => {
  return asyncHandler(async (
    req: Request & { user?: User },
    res: Response,
    next: NextFunction,
  ) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.decode(token);
      if (typeof decodedToken === "string" || !decodedToken) {
        throw new Forbidden("Access denied. Invalid token");
      }
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: decodedToken.user_id },
      });

      if (!user || !roles.includes(user.user_type)) {
        throw new Forbidden("Access denied. Not an admin");
      }
      next();
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      
    }
  });
};
