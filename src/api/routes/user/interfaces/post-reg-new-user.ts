import { Role } from "src/api/types/roles";

export interface PostRegNewUser {
  password: string;
  name: string;
  role?: Role[];
}
