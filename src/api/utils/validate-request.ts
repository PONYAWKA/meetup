import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export const validateRequest = async <T extends object>(
  request: any,
  requestDTO: ClassConstructor<T>
) => {
  const DTO: T = plainToClass(requestDTO, request);

  const validationErrors = await validate(DTO);

  if (validationErrors.length > 0)
    return validationErrors.reduce(
      (acc, cur) => Object.assign(acc, { [cur.property]: cur.constraints }),
      {}
    );
  return null;
};
