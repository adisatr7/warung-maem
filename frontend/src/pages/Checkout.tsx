import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import backgroundImage from "../assets/background-home.jpg"
import Navbar from "../components/Navbar"
import useRequireAuth from "../hooks/useRequireAuth"
import { MakananType } from "../types"

import { useAppDispatch, useAppSelector } from "../store"
import { setCart } from "../store/slices/cartSlice"


export default function Checkout() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart.items)

  const [inputNama, setInputNama] = useState<string>("")
  const [tambahData, setTambahData] = useState<boolean>()


  /**
   * Ambil data keranjang belanja dari sessionStorage dan simpan ke Redux store
   */
  const fetchCart = () => {
    const tempString = sessionStorage.getItem("cart")
    const tempList: MakananType[] = JSON.parse(tempString!)
    
    dispatch(setCart(tempList))
  }

  /**
   * Ambil data keranjang belanja dari sessionStorage setiap kali halaman di-refresh
   */
  useEffect(() => {
    fetchCart()
  }, [])
  
  
  /**
   * Kirim data transaksi ke backend
   */
  const handleTransaction = async () => {
    const data = {
      nama: inputNama,
      cart: cart
    }
    const response = await fetch("http://127.0.0.1:5000/transaksi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  
    // buat kode untuk navigasi ke halaman data transaksi
    if(response.ok) {
      alert("Transaksi berhasil!")
      navigate("/transaksi")
    }
  }


  /**
   * Simpan data belanjaan ke sessionStorage setiap ada perubahan di keranjang belanja secara otomatis
   */
  useEffect(() => {
    const tempString = sessionStorage.getItem("cart")
    const tempList: Makanan[] = JSON.parse(tempString!)

    dispatch(setCart(tempList))
  }, [])


  if(useRequireAuth())
    return (
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="flex flex-col items-center justify-center w-screen h-screen bg-no-repeat bg-cover">
      
        <Navbar/>
        
          {/* Isi halaman home */}
          <div className="flex flex-col bg-white mt-[36px] h-fit w-[1060px] rounded-xl px-[36px] py-[18px] justify-center drop-shadow-xl">
          
            {/* Header label */}
            <h1 className="text-3xl font-semibold text-center text-black">CHECKOUT</h1>
            
            {/* Garis */}
            <div className="w-full h-[2px] bg-red-500 my-[8px]"/>
            
            {/* Card checkout */}
            <div className="pt-5 pb-5 pl-20 pr-40 rounded-xl">
            
              {/* Buat nama pelanggan yang bisa ditammbahkan sendiri */}
              <div>
                <p className="mt-3 text-lg font-medium text-black">
                  Nama Pelanggan
                </p>
                <input onChange={(e) => setInputNama(e.target.value)} className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 pl-2" type="text" placeholder="Masukkan Nama"/>
                <br></br>
                <table className="w-full">
                  <thead className="text-left">
                    <tr>
                      <th className="w-[120px]">Item</th>
                      <th className="w-[120px]">Jumlah</th>
                      <th className="w-[120px]">Harga</th>
                    </tr>
                  </thead>
                <tbody>
                  
                  {/* masukkan item makanan dari keranjang belanja */}
                  { cart.map((makanan) => (
                  <tr key={makanan.id}>
                    {/* <td>{makanan.nama}</td>
                    <td>{makanan.kuantitas}</td>
                    <td>{makanan.harga}</td> */}
                  </tr>
                  ))}
                
                  </tbody>
                </table>
              
              <p className="border-t-2 border-gray-600 border-dotted">Total</p>
              <p>Bayar</p>
              <p>Kembalian</p>
              <br></br>
        
              {/* Buat tombol input pesanan */}
              <Link to="/transaksi" className="hover:cursor-pointer">
                <button 
                  onClick={() => setTambahData(true)}
                  className= "bg-green-400 text-white text-lg mt-[6px] py-[6px] rounded-full w-[150px] text-center hover:cursor-pointer hover:bg-green-800">
                  Input
                </button>
              </Link>
    
              { tambahData ?
                (
                  <div>
                    <p>Transaksi berhasil ditambahkan</p>
                  </div>
                ) : (
                  <div>
                    <p>Transaksi gagal ditambahkan</p>
                  </div>
                )
              }       
            </div>
          </div>
        </div>
    </div>   
  )
}