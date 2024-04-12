import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import { dataReducer } from "./slices/dataSlice"

const rootReducer = combineReducers({
  data: dataReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useDataState = () => useAppSelector((state) => state.data)
