import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        isLoggedIn: !!localStorage.getItem('token'),
    },
    reducers: {
        login: (state, { payload }) => {
            localStorage.setItem('token', payload.access_token);
            localStorage.setItem('email', payload.email);

            state.email = localStorage.getItem('email');
            state.token = localStorage.getItem('token');

            state.isLoggedIn = !!localStorage.getItem('token');
        },
        emailVerify: (state, { payload }) => {
            state.isEmailVerified = !!payload.email_verified_at;
        },
        logout: (state) => {
            state.email = null;
            state.token = null;
            state.isLoggedIn = false;

            localStorage.removeItem('token');
            localStorage.removeItem('email');
        },
    }
});

export const { login, logout, emailVerify } = authSlice.actions;

export default authSlice.reducer;