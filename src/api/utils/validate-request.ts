import { ClassConstructor, plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const validateRequest = <T extends object>(
  request: any,
  requestDTO: ClassConstructor<T>,
  next: NextFunction
) => {
  const DTO: T = plainToClass(requestDTO, request);

  const validationErrors = validateSync(DTO);

  if (validationErrors.length > 0)
    return () => next(validationErrors.toString());
  return null;
};
