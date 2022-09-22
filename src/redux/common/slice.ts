import { createSlice } from "@reduxjs/toolkit"
import { initialState, setCookieConsent, setSound, setMenu } from "./reducers"

export const KEY_REDUCER_SAGA = "commonReducer"

const commonSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onSetCookieConsent: setCookieConsent,
        onSetSound: setSound,
        onSetMenu: setMenu,
    },
})

export const { onSetCookieConsent, onSetSound, onSetMenu } = commonSlice.actions
export default commonSlice.reducer
