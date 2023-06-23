import { Modal } from '../components/Modal';
import { useEffect, useState } from "react"
import { MakananType } from "../types"
import useRequireAuth from "../hooks/useRequireAuth"
import backgroundImage from "../assets/background-home.jpg"
import formatHarga from "../utils/formatHarga"

import { showModal, hideModal } from "../store/slices/modalSlice"
import { addToCart } from "../store/slices/cartSlice"
import { useAppDispatch, useAppSelector } from '../store'

import Navbar from "../components/Navbar"


export default function Home() { 
  // Daftar menu makanan
  const [menu, setMenu] = useState([])

  // State untuk menampung angka sementara saat memasukkan jumlah makanan ke keranjang belanja
  const [selectedItem, setSelectedItem] = useState<MakananType>()
  const [tempQty, setTempQty] = useState(1)

  // Redux state dan reducer untuk menampilkan modal
  const modalIsShowing = useAppSelector(state => state.modal.isShown)
  const cart = useAppSelector(state => state.cart.items)
  const dispatch = useAppDispatch()

  /**
   * Fetch daftar menu makanan dari API
   */
  const fetchMenu = async () => {
    const response = await fetch("http://127.0.0.1:5000/makanan")
    const data = await response.json()
    setMenu(data)
  }
  
  // Lakukan fetch saat pertama kali komponen dirender
  useEffect(() => {
    fetchMenu()
  }, [])
  

  /**
   * Simpan data belanjaan ke sessionStorage setiap ada perubahan di keranjang belanja secara otomatis
   */
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])


  // Jika user sudah login, tampilkan halaman home
  if(useRequireAuth())
    return (
      <div 
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="flex flex-col bg-cover bg-stone-200 h-screen w-screen items-center justify-center bg-blend-multiply">
        <Navbar/>
        
        {/* Isi halaman home */}
        <div className="flex flex-col bg-white mt-[36px] h-fit w-[1060px] rounded-xl px-[36px] py-[18px] justify-center drop-shadow-xl">
          
          {/* Header label */}
          <h1 className="text-2xl font-semibold">Menu makanan</h1>

          {/* Garis */}
          <div className="w-full h-[2px] bg-red-500 my-[8px]"/>

          {/* Daftar menu makanan */}
          <div className="flex flex-row flex-wrap justify-center my-[16px] gap-[28px]">
            { menu.map((item: MakananType, index: number) => {

              // Format harga menjadi ada titiknya
              const harga = formatHarga(item.harga)

              // Tampilkan item item berdasarkan data yang didapat dari API
              return (
                <div 
                  key={index} 
                  onClick={() => {
                    setSelectedItem(item)
                    dispatch(showModal())
                  }}
                  className="flex flex-col bg-white hover:bg-red-600 hover:text-white hover:cursor-pointer border border-stone-300 hover:border-0 hover:outline hover:outline-red-500 shadow-sm rounded-md h-[200px] w-[175px] overflow-clip">

                  {/* Gambar makanan */}
                  <div className="overflow-clip flex flex-[4]">
                    <img className="w-full h-full object-cover" src={item.url_makanan}/>
                  </div>

                  {/* Info makanan */}
                  <div className="flex-[1] mx-[10px] my-[6px]">
                    <h1 className="text-lg font-semibold">{item.nama_makanan}</h1>
                    <p className="text-md">Rp{harga}</p>
                  </div>
                </div>
              )}
            )}
          </div>
        </div>

        {/* Modal */}
        { modalIsShowing &&
          <Modal 
            title="Masukkan Jumlah"
            caption="Berapa banyak makanan yang ingin Anda beli?">
              <form
                className="flex flex-row gap-[14px] justify-between">
                <input
                  autoFocus
                  type="number"
                  value={tempQty}
                  onChange={(e) => {
                    const inputValue = Number(e.target.value)
                    if(inputValue < 1)
                      setTempQty(1)
                    else
                      setTempQty(inputValue)
                    }}
                    className="outline-none bg-gray-200 py-[6px] px-[10px] rounded-md w-full"/>
                <button
                  onClick={() => {
                    if (selectedItem) {
                      const tempItem = selectedItem
                      tempItem.qty = tempQty
                      dispatch(addToCart(tempItem))
                      setTempQty(1)
                      dispatch(hideModal())
                    }
                  }}
                  className="bg-red-600 hover:bg-red-500 text-white font-semibold py-[6px] px-[18px] rounded-md w-full">
                  Tambah
                </button>
              </form>
          </Modal>
        }

      </div>
    )
}