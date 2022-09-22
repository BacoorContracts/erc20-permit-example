import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import { createInjectorsEnhancer } from "redux-injectors"
import { createWrapper } from "next-redux-wrapper"
import { createReducer } from "./rootReducer"
import rootSaga from "./rootSaga"

export function configureAppStore() {
    const reduxSagaMonitorOptions = {}
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
    const { run: runSaga } = sagaMiddleware

    // Create the store with saga middleware
    const middlewares = [sagaMiddleware]

    const enhancers = [
        createInjectorsEnhancer({
            createReducer,
            runSaga,
        }),
    ]

    const store = configureStore({
        reducer: createReducer(),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(sagaMiddleware, ...middlewares),
        devTools: process.env.NODE_ENV !== "production",
        enhancers,
    })

    runSaga(rootSaga)
    return store
}

const configStore = configureAppStore()

export type RootState = ReturnType<typeof configStore.getState>

export const wrapperStore = createWrapper(configureAppStore, { debug: false })
