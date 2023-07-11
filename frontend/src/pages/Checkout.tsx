import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import useRequireAuth from "../hooks/useRequireAuth"
import { MakananType } from "../types"

import { useAppDispatch, useAppSelector } from "../store"
import { setCart } from "../store/slices/cartSlice"
import MainLayout from "../layouts/MainLayout"
import ContentCard from "../layouts/ContentCard"
import QtyInput from "../components/QtyInput"
import formatHarga from "../utils/formatHarga"
import { redButtonStyle, textInputStyle } from "../styles"


export default function Checkout() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cart: MakananType[] = useAppSelector(state => state.cart.items)

  const [namaInput, setNamaInput] = useState<string>("")
  const [uangInput, setUangInput] = useState<number>(0)
  const [kembalian, setKembalian] = useState<number>(0)


  /**
  * Ambil data keranjang belanja dari sessionStorage dan simpan ke Redux store
  */
  const fetchCart = () => {
    const tempString = sessionStorage.getItem("cart")
    const tempList: MakananType[] = JSON.parse(tempString!)
    
    dispatch(setCart(tempList))
  }

  /**
  * Ambil data keranjang belanja dari sessionStorage setiap kali halaman dimuat
  */
  useEffect(() => {
    fetchCart()
  }, [])


  /**
   * Menghitung total harga dari semua item di keranjang belanja
   */
  const calculateTotalPrice = (): number => {
    return cart.reduce((total, item) => total + (item.harga * item.qty!), 0)
  }

  /**
   * Menghitung kembalian
   */
  const calculateKembalian = () => {
    const totalPrice: number = calculateTotalPrice()

    const kembalian: number = uangInput - totalPrice > 0 
      ? (totalPrice - uangInput) * -1
      : 0

    setKembalian(kembalian)
  }

  /**
   * Secara otomatis menghitung kembalian setiap kali input uang berubah
   */
  useEffect(() => {
    calculateKembalian()
  }, [uangInput])


  /**
   * Meng-handle tombol Bayar saat di-klik
   */
  const handleCheckout = async () => {

    // Cek apakah atas nama pembeli sudah diisi
    if(namaInput === "")
      return alert("Mohon masukkan nama pembeli!")

    // Cek apakah uang bayar cukup
    if(uangInput < calculateTotalPrice())
      return alert("Uang yang dibayarkan kurang!")

    // Ambil tanggal dan waktu saat ini dan ubah ke format MySQL datetime
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ')

    // Kirim data transaksi ke server
    await axios.post("http://127.0.0.1:5000/transaksi", {
      nama_pembeli: namaInput,
      waktu_pembelian: date,
      total_bayar: calculateTotalPrice()
    })

      // Jika berhasil, ambil id transaksi terbaru
      .then(res => {
        const idTransaksi = res.data.data.id_transaksi
    
        // Kirim data pembelian ke server
        cart.forEach(async (item: MakananType) => {
          await axios.post("http://127.0.0.1:5000/pembelian", {
            id_transaksi: idTransaksi,
            id_makanan: item.id,
            kuantitas: item.qty || 1
          }).catch(err => {
            return alert(JSON.stringify(err.response.data))
          })
        })
    
        // Hapus data keranjang belanja dari sessionStorage dan Redux store
        sessionStorage.removeItem("cart")
        dispatch(setCart([]))
    
        // Redirect ke halaman Riwayat Transaksi
        alert(`Transaksi atas nama ${namaInput} berhasil disimpan ke Database!`)
        navigate("/transaksi")
      })
    
    
      .catch(err => alert(JSON.stringify(err.response.data)))

  }


  if(useRequireAuth())
    return (
      <MainLayout>
        <ContentCard pageTitle="Checkout">
          {/* Jika keranjang belanja ada isinya */}
          { cart.length > 0 && (

            // Input atas nama pembeli
            <div className="py-[12px] flex flex-row w-fit h-fit items-center gap-[12px]">
              <label className="font-semibold">Atas Nama</label>
              <input 
                type="text" 
                placeholder="Masukkan nama pembeli" 
                value={namaInput} 
                onChange={(e) => setNamaInput(e.target.value)}
                className={`${textInputStyle}`}/>
            </div>
          )

          }
          { cart.length > 0 &&

            // Render semua item di keranjang belanja
            cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-t border-gray-300 py-[12px]">
                <div className="flex items-center">
                  <img src={item.urlMakanan} alt={item.namaMakanan} className="w-[100px] h-[100px] object-cover rounded-md" />
                  <div className="ml-[20px]">
                    <h3 className="text-lg font-bold">{item.namaMakanan}</h3>
                    <p className="text-sm text-gray-500">{item.deskripsi}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-lg font-bold">Rp {formatHarga(item.harga)}</p>
                  <QtyInput cartIndex={index}/>
                </div>
              </div>
            ))
          }
          { // Total harga
            cart.length > 0 && (
              <div className="border-t flex flex-col gap-[4px] py-[12px]">
                <div className="flex items-center justify-end gap-[12px] border-gray-300">
                  <p className="text-lg">Total:</p>
                  <p className="text-lg font-bold w-[100px]">Rp {formatHarga(calculateTotalPrice())}</p>
                </div>
                
                <div className="flex items-center justify-end gap-[12px] border-gray-300">
                  <p className="text-lg">Jumlah bayar:</p>
                  <input 
                    onChange={(e) => setUangInput(parseInt(e.target.value))}
                    className={`${textInputStyle} w-[100px]`}/>
                </div>
                { uangInput > 0 && (
                    <div className="flex items-center justify-end gap-[12px] border-gray-300">
                      <p className="text-lg">Kembalian:</p>
                      <p className="text-lg font-bold w-[100px]">Rp {formatHarga(kembalian)}</p>
                    </div>
                )}
                <div className="flex flex-row w-full justify-end">
                  <button
                    onClick={handleCheckout} 
                    className={`${redButtonStyle} w-fit`}>Bayar Sekarang</button>
                </div>
              </div>
            )
          }

          {/* Jika keranjang belanja kosong */}
          { 
            cart.length <= 0 && (
              <p className="w-full text-lg text-center py-[40px] text-gray-500">
                Belum ada barang di keranjang. <span onClick={() => navigate("/home")} className="font-bold hover:underline hover:cursor-pointer hover:text-red-700">Klik disini</span> untuk kembali ke halaman utama.
              </p>
            )
          }
        </ContentCard>
      </MainLayout>   
    )
}