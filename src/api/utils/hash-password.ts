import { hash } from "bcrypt";

export const hashPassword = async (pass: string) => await hash(pass, 3);
