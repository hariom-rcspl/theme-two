import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isAuthLoadingToggle } from "./authSlice";

export const login: any = createAsyncThunk(
    "login",
    async (data: any, { rejectWithValue, fulfillWithValue, dispatch }: any) => {
        try {
            dispatch(isAuthLoadingToggle(true));
            const response = await axios({
                method: "POST",
                url: `/api/auth/login`,
                data: data,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                dispatch(isAuthLoadingToggle(false));
                return fulfillWithValue(response?.data);
            } else {
                dispatch(isAuthLoadingToggle(false));
                return rejectWithValue(response?.data);
            }
        } catch (err) {
            dispatch(isAuthLoadingToggle(false));
            return rejectWithValue();
        }
    }
);