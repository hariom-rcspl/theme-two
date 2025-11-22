import { createSlice } from "@reduxjs/toolkit";
import { getUserList } from "./userApi";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userLoading: true,
        userList: [],
        totalUsers: 0
    },
    reducers: {
        toggleUserLoading: (state: any, action) => {
            state.userLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserList.pending, (state) => {
            state.userLoading = true
        })
        builder.addCase(getUserList.fulfilled, (state, action) => {
            state.userLoading = false
            state.userList = action.payload.users
            state.totalUsers = action.payload.total
        })
        builder.addCase(getUserList.rejected, (state) => {
            state.userLoading = false
            state.userList = []
        })
    }
})

export const { toggleUserLoading } = userSlice.actions;
export default userSlice.reducer;