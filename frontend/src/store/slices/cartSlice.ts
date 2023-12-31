import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { MakananType } from "../../types"

export interface CartStateType {
  items: Array<MakananType>
}

const initialState: CartStateType = {
  items: sessionStorage.getItem("cart")
    ? JSON.parse(sessionStorage.getItem("cart") || "")
    : [],
}

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    /**
     * Menambahkan makanan ke keranjang belanja
     */
    setCart: (state, action: PayloadAction<MakananType[]>) => {
      state.items = action.payload
    },

    /**
     * Mengosongkan keranjang belanja
     */
    clearCart: (state) => {
      state.items = []
      sessionStorage.setItem("cart", JSON.stringify(state.items))
    },
  },
})

export default cartSlice.reducer
export const { setCart, clearCart } = cartSlice.actions
