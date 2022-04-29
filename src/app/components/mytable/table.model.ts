import { User } from "src/app/core/models/User";

export interface UserSearchResult {
  user: User[];
  total: number;
}
