export type MakananType = {
  id: string
  namaMakanan: string
  harga: number
  deskripsi: string
  urlMakanan: string
  qty?: number
}

export type TransaksiType = {
  id_transaksi: string
  nama_pembeli: string
  waktu_pembelian: string
  total_bayar: number
}
