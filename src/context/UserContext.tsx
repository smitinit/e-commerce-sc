import { createContext } from "react";
import { UserCredentials } from "../providers/user-provider";

export interface UserContextType {
  user: UserCredentials | null;
  register: (username: string, email: string, token: string) => void;
  login: (email: string, token: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
