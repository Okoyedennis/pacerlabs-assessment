import Cookies from "js-cookie";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type AuthState = {
  isAuth: boolean;
  username: string;
};

type InitialState = {
  value: AuthState;
};

const initialState = {
  value: {
    isAuth: false,
    username: "",
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogOut: () => {
      window.localStorage.removeItem("username");
      Cookies.remove("loggedin");
      return initialState;
    },
    userLogIn: (_, action: PayloadAction<string>) => {
      window.localStorage.setItem("username", action.payload);
      Cookies.set("loggedin", "true");
      return {
        value: {
          isAuth: true,
          username: action.payload,
        },
      };
    },
  },
});

export const { userLogIn, userLogOut } = auth.actions;
export default auth.reducer;
