import { Role } from "src/api/types/roles";

export const getUserRole = (role?: Role[]) =>
  role?.length && role?.length > 0 ? role : [Role.User];
