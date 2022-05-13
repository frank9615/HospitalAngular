import { Role } from "./Role";

export interface User {
  id: number;
  username: string;
  password?: string;
  name: string;
  surname: string;
  role: Role;
  token?: string;
}
