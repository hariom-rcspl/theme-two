import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleUserLoading } from "./userSlice";

export const getUserList: any = createAsyncThunk(
    "get-userlist",
    async ({ limit, skip }: { limit: number; skip: number }, { fulfillWithValue, rejectWithValue, dispatch }: any) => {
        try {
            dispatch(toggleUserLoading(true));

            const response = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);

            dispatch(toggleUserLoading(false));
            return fulfillWithValue({
                users: response.data.users,
                total: response.data.total,
                limit: response.data.limit,
                skip: response.data.skip,
            });

        } catch (error) {
            dispatch(toggleUserLoading(false));
            return rejectWithValue([]);
        }
    }
);
