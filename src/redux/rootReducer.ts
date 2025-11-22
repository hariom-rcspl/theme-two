import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "@/module/auth/redux/authSlice"

const rootReducer: any = combineReducers({
    auth: authSlice
})

export default rootReducer
