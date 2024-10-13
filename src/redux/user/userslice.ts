/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../Interface/User/User';

// Define the shape of the user state
export interface UserState {
  currentUser:IUser| null; // You can replace 'any' with a specific user type
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true; 
    },
    signInSuccess: (state, action:any) => { // Replace 'any' with the specific user type
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      console.log("User data:", state.currentUser);
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<any>) => { // Replace 'any' with the specific user type
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading =false;
      state.currentUser=null;
      state.error=null;
      localStorage.removeItem('user');
    },
    signOutUserSuccess: (state) => {
      
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  signInStart,
  signInFailure,
  signInSuccess,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
