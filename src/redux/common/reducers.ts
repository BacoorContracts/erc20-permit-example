import { PayloadAction } from "@reduxjs/toolkit"
import { CommonState } from "./types"

export const initialState = {
    triggerSound: false,
    triggerCookieConsent: false,
    triggerMenu: false,
} as CommonState

export const setSound = (state: Partial<CommonState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.triggerSound = payload
}
export const setCookieConsent = (state: Partial<CommonState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.triggerCookieConsent = payload
}
export const setMenu = (state: Partial<CommonState>, action: PayloadAction<boolean>) => {
    console.log(state, action)
    const { payload } = action
    state.triggerMenu = payload
}
