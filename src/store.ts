import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  uid: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  uid: null, // Default to logged out
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state,action: PayloadAction<{ token: string; uid: string }>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = null;
      state.uid = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
