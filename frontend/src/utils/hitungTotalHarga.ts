import { MakananType } from "../types"
import formatHarga from "./formatHarga"


/**
 * Menghitung total harga dari semua makanan di keranjang belanja
 */
export default function hitungTotalHarga(cart: Array<MakananType>): string {
  let totalHarga = 0

  cart.forEach((item: MakananType) => {
    const qty = item.qty || 1
    totalHarga += item.harga * qty
  })
  return formatHarga(totalHarga)
}