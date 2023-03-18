import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: number;
  full_name?: string | any;
  password?: string;
  email?: string | any;
  role?: string | any;
  token?: string | any;
  team?: string;
  status?: string;
  data?: any;
}

export interface AuthState {
  isAuth: boolean;
  user: User | null;
}

const savedUserString = localStorage.getItem('user');

let savedUser: User | null = null;
if (savedUserString !== undefined && savedUserString !== null) {
  try {
    savedUser = JSON.parse(savedUserString);
  } catch (e) {
    console.error('Error parsing saved user data:', e);
  }
}

const initialState: AuthState = {
  isAuth: !!savedUser,
  user: savedUser,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isAuth = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;