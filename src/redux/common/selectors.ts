import { createSelector } from "reselect"
import { RootState } from "redux/injector-typings"
import { KEY_REDUCER_SAGA } from "./slice"
import { initialState } from "./reducers"

const rootSelector = (state: RootState) => state[KEY_REDUCER_SAGA] || initialState

export const cookieConsentSelector = () => createSelector(rootSelector, (item) => item.triggerCookieConsent)
export const triggerSoundSelector = () => createSelector(rootSelector, (item) => item.triggerSound)
export const triggerMenuSelector = () => createSelector(rootSelector, (item) => item.triggerMenu)
