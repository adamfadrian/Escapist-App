import { configureStore } from "@reduxjs/toolkit"

import { authSlice } from "./features/userSlice"

export default configureStore({ 
reducer: {
    auth: authSlice.reducer,
}
})
