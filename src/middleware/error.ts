import { NextFunction, Request, Response } from "express";
import log from "../utils/logger";


class HttpError extends Error {
  status_code: number;
  success: boolean = false;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status_code = statusCode;
  }
}

class BadRequest extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}

class ResourceNotFound extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}

class Unauthorized extends HttpError {
  constructor(message: string) {
    super(401, message);
  }
}

class Forbidden extends HttpError {
  constructor(message: string) {
    super(403, message);
  }
}

class Conflict extends HttpError {
  constructor(message: string) {
    super(409, message);
  }
}

class InvalidInput extends HttpError {
  constructor(message: string) {
    super(422, message);
  }
}

class ServerError extends HttpError {
  constructor(message: string) {
    super(500, message);
  }
}

const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  const message = `Route not found: ${req.originalUrl}`;
  res.status(404).json({ success: false, status: 404, message });
};

// const errorHandler = (
//   err: HttpError,
//   _req: Request,
//   res: Response,
//   _next: NextFunction,
// ) => {
//   const { success, status_code, message } = err;
//   const cleanedMessage = message.replace(/"/g, "");
//   res.status(status_code).json({
//     success: success || false,
//     status_code,
//     message: cleanedMessage,
//   });
// };

const errorHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Log the error object for debugging purposes
  // log.error('Error caught by errorhandler:', err);
  console.log('Error caught by errorhandler:', err);


  const { success, status_code, message } = err;

  // Fallback to 500 if status_code is undefined
  const statusCode = status_code || 500;

  // Ensure the message is defined and sanitized
  const cleanedMessage = message ? message.replace(/"/g, "") : "An unexpected error occurred";

  res.status(statusCode).json({
    success: success !== undefined ? success : false,  // Ensure success has a valid value
    status_code: statusCode,
    message: cleanedMessage,
  });
};


export {
  BadRequest,
  Conflict,
  Forbidden,
  HttpError,
  InvalidInput,
  ResourceNotFound,
  ServerError,
  Unauthorized,
  errorHandler,
  routeNotFound,
};
