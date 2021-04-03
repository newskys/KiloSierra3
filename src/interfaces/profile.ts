import { UserRole, UserStatus } from "./status";

export interface Profile {
  userId: string
  email: string
  userStatus: UserStatus
  role: UserRole
}
