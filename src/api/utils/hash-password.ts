import { compareSync, hash } from "bcrypt";

export const hashPassword = async (pass: string) => await hash(pass, 3);

export const comparePassword = (passA: string, passB: string) =>
  compareSync(passA, passB);
