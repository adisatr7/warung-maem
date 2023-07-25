export type MakananType = {
  id: string
  namaMakanan: string
  harga: number
  deskripsi: string
  urlMakanan: string
  qty?: number
}

export type TransaksiType = {
  idTransaksi: string
  namaPembeli: string
  waktuPembelian: string
  totalBayar: number
  pembelian: MakananType[]
}

export type PenggunaType = {
  id_user: string
  nama_user: string
  password_login: string
  alamat: string
  no_telp: string
}