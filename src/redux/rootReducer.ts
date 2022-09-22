import { combineReducers } from "@reduxjs/toolkit"
import { InjectedReducersType } from "./injector-typings"
import commonSlice, { KEY_REDUCER_SAGA } from "./common/slice"

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
    return combineReducers({
        ...injectedReducers,
        [KEY_REDUCER_SAGA]: commonSlice,
    })
}
