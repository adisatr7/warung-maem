import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import { cartSlice } from "./slices/cartSlice"
import { modalSlice } from "./slices/modalSlice"
import { sideBarSlice } from "./slices/sideBarSlice"


export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    modal: modalSlice.reducer,
    sideBar: sideBarSlice.reducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector