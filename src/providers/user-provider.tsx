import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export interface UserCredentials {
  username: string;
  email: string;
  token: string;
  isLoggedIn: boolean;
}

export function UserProvider({ children }: { children: ReactNode }) {
  // initial user state -> fetch from localStorage -> or null
  const [user, setUser] = useState<UserCredentials | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // mutate on every changes like register , edit , login , logout
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // register function
  const register = async (username: string, email: string, token: string) => {
    // create a new user
    const newUserData = { username, email, token, isLoggedIn: true };

    // get existing user to check for existing email validation
    const existingUser = JSON.parse(localStorage.getItem("user")!);

    // look up for email
    if (existingUser && newUserData.email === existingUser.email) {
      throw Error("Email already exists!, try with a new one.");
    }

    // dummy timeout
    await new Promise((res) => setTimeout(res, 1000));

    // set the new user
    setUser(newUserData);
  };

  // similar login function
  const login = async (email: string, token: string) => {
    // get the stored user
    const stored = localStorage.getItem("user");
    // return if no user found
    if (!stored)
      throw new Error("No user registered!, Start by creating an account.");
    const existingUser: UserCredentials = JSON.parse(stored);

    // check for email eq()
    if (existingUser.email !== email) {
      throw new Error("Email not found!");
    }
    // similar check for password aka. token eq()
    if (existingUser.token !== token) {
      throw new Error("Password is incorrect!");
    }

    // dummy timeout
    await new Promise((res) => setTimeout(res, 1000));

    // login with new user <toggle isLoggedIn property to true>
    setUser({ ...existingUser, isLoggedIn: true });
  };

  // user edit function
  const edit = async (username: string, email: string, token: string) => {
    // get the user from localstorage
    const stored = localStorage.getItem("user");
    if (!stored) {
      throw new Error("No user found to update.");
    }

    // extract the user
    const existingUser: UserCredentials = JSON.parse(stored);

    // dummy timeout
    await new Promise((res) => setTimeout(res, 1000));

    // update the user files with the new fileds provided by the user
    const updatedUser: UserCredentials = {
      ...existingUser,
      username,
      email,
      token,
    };

    // set the updated user
    setUser(updatedUser);
  };

  // simple logout
  const logout = () => {
    if (user) {
      // just change the isLoggedIn to false
      setUser({ ...user, isLoggedIn: false });
    } else return;
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register, edit }}>
      {children}
    </UserContext.Provider>
  );
}
