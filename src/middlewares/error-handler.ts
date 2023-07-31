import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  let errorMessage = "Something went wrong";

  if (statusCode === 400) {
    errorMessage = "Bad request.";
  } else if (statusCode === 404) {
    errorMessage = "resource not found.";
  }

  res.status(statusCode).json({ error: errorMessage });
};
