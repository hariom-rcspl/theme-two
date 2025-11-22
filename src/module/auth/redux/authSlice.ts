import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authLoading: false,
        token: "",
        role: "",
        privileges: {},
        email: "",
        latitude: "",
        longitude: "",
        profileImage: "",
        name: "",
    },
    reducers: {
        isAuthLoadingToggle: (state: any, action) => {
            state.authLoading = action.payload;
        },
        defaultLogout: (state) => {
            state.token = "";
            state.role = "";
            state.email = "";
            state.name = "";
            state.profileImage = "";
        },
        localLogin: (state, action) => {
            state.token = "sometokenfrombackend"
            state.role = "admin"
            state.email = action.payload.email
            state.name = "User Name"
        },
    },
});

export const {
    isAuthLoadingToggle,
    defaultLogout,
    localLogin
} = authSlice.actions;
export default authSlice.reducer;