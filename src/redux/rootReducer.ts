import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "@/module/auth/redux/authSlice"
import userSlice from "@/module/users/redux/userSlice"

const rootReducer: any = combineReducers({
    auth: authSlice,
    user: userSlice
})

export default rootReducer
