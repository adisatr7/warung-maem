import { ReactNode } from "react"


export type MakananType = {
  kuantitas: ReactNode
  id: string,
  nama: ReactNode
  primary_key?: number,
  nama_makanan: string,
  harga: number
  url_makanan: string,
  qty?: number
}

export type TransaksiType = {
  id_transaksi: string,
  nama_pembeli: string,
  waktu_pembelian: string,
  total_bayar: number
}