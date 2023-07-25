import { MakananType } from "../types"

/**
 * Menghitung total harga dari semua makanan di keranjang belanja
 */
export default function hitungTotalHarga(cart: MakananType[]): number {

  let totalHarga: number = 0

  cart.forEach((item: MakananType) => {
    const qty = item.qty || 1
    totalHarga += item.harga * qty
  })
  return totalHarga
}
