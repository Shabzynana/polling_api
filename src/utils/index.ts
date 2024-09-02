import * as bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";

export const getIsInvalidMessage = (fieldLabel: string) =>
  `${fieldLabel} is invalid`;

export const Limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
  keyGenerator: (req) => req.ip,
});

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}


