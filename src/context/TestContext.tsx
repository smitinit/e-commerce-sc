import { createContext, Dispatch, SetStateAction } from "react";

type TestContextType = {
  name: string;
  age: number | null;
  setValues: Dispatch<
    SetStateAction<{
      name: string;
      age: number;
    }>
  >;
};

export const TestContext = createContext<TestContextType>({
  name: "",
  age: null,
  setValues: () => {},
});
