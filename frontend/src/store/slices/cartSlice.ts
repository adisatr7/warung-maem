import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { MakananType } from "../../types"


export interface CartStateType {
  items: Array<MakananType>
}

const initialState: CartStateType = {
  items: sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart") || "") : []
}

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {

    /**
     * Menambahkan makanan ke keranjang belanja 
     */
    addToCart: (state, action: PayloadAction<MakananType>) => {
      const item = action.payload
      state.items.push({
        primary_key: item.primary_key,
        nama_makanan: item.nama_makanan,
        harga: item.harga,
        qty: item.qty || 1,
        url_makanan: item.url_makanan,
      })
      sessionStorage.setItem("cart", JSON.stringify(state.items))
    },

    /**
     * Mengubah jumlah makanan di keranjang belanja
     */
    changeQty: (state, action: PayloadAction<MakananType>) => {
      const item = action.payload

      state.items.find((cartItem: MakananType) => {
        if(cartItem.primary_key === item.primary_key)
          cartItem.qty = item.qty
      })
      sessionStorage.setItem("cart", JSON.stringify(state.items))
    },

    /**
     * Menghapus makanan dari keranjang belanja
     */
    removeFromCart: (state, action: PayloadAction<MakananType>) => {
      const item = action.payload
      state.items = state.items.filter((cartItem: MakananType) => {
        cartItem.primary_key !== item.primary_key}
      )
      sessionStorage.setItem("cart", JSON.stringify(state.items))
    },

    /**
     * Mengosongkan keranjang belanja
     */
    clearCart: (state) => {
      state.items = []
      sessionStorage.setItem("cart", JSON.stringify(state.items))
    }
  }
})

export default cartSlice.reducer
export const { addToCart, changeQty, removeFromCart, clearCart } = cartSlice.actions