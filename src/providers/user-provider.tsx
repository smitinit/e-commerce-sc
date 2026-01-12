import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export interface UserCredentials {
  username: string;
  email: string;
  token: string;
  isLoggedIn: boolean;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserCredentials | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const register = async (username: string, email: string, token: string) => {
    const newUserData = { username, email, token, isLoggedIn: true };
    const existingUser = JSON.parse(localStorage.getItem("user")!);

    if (existingUser && newUserData.email === existingUser.email) {
      throw Error("Email already exists!, try with a new one.");
    }

    await new Promise((res) => setTimeout(res, 2000));

    setUser(newUserData);
  };

  const login = async (email: string, token: string) => {
    const stored = localStorage.getItem("user");
    if (!stored)
      throw new Error("No user registered!, Start by creating an account.");
    const existingUser: UserCredentials = JSON.parse(stored);

    if (existingUser.email !== email) {
      throw new Error("Email not found!");
    }

    if (existingUser.token !== token) {
      throw new Error("Password is incorrect!");
    }

    await new Promise((res) => setTimeout(res, 2000));
    setUser({ ...existingUser, isLoggedIn: true });
  };

  const logout = () => {
    if (user) {
      setUser({ ...user, isLoggedIn: false });
    } else return;
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}
