export default function formatHarga (harga: number): string {
  return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}