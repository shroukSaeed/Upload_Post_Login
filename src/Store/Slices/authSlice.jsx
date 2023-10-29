import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // isAuth:false,
    isAuth: localStorage.getItem('user_data'),
    userId: localStorage.getItem('user_data'),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuth = true;
            state.userId = action.payload
            localStorage.setItem('user_data', action.payload)
        },
        logout: (state) => {
            state.isAuth = false;
            state.userId = null;
            localStorage.removeItem('user_data');
        }
    }
})

const authReducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;
export default authReducer;
