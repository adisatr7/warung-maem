export type MakananType = {
  primary_key?: number,
  nama_makanan: string,
  harga: number
  url_makanan: string,
  qty?: number
}

export type PenjualanType = {
  id_transaksi: string,
  nama_pembeli: string,
  waktu_pembelian: string,
  total_bayar: number
}