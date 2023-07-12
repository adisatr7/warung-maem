import { useEffect, useState } from "react"
import axios from "axios"
import Modal from "../components/Modal"
import useRequireAuth from "../hooks/useRequireAuth"
import { MakananType } from "../types"
import formatHarga from "../utils/formatHarga"

import ContentCard from "../layouts/ContentCard"
import MainLayout from "../layouts/MainLayout"
import { useAppDispatch, useAppSelector } from '../store'
import { setCart } from "../store/slices/cartSlice"
import { hideModal, showModal } from "../store/slices/modalSlice"



export default function Home() { 
  // Daftar menu makanan
  const [menu, setMenu] = useState<MakananType[]>([])

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
    try {
      // Ambil data dari API
      const response = await axios.get("http://127.0.0.1:5000/makanan")

      // Format data yang didapat dari API agar sesuai dengan tipe data MakananType
      const fetchedData: MakananType[] = []
      response.data.forEach((item: any) => {
        fetchedData.push({
          id: item.id_makanan,
          namaMakanan: item.nama_makanan,
          deskripsi: item.deskripsi,
          urlMakanan: item.url_makanan,
          harga: item.harga
        })

        // Simpan data yang sudah diformat ke state
        setMenu(fetchedData)
      })
    } 
    
    // Tampilkan error jika gagal mengambil data dari API
    catch (error) {
      alert(error)
    }
  }
  
  // Lakukan fetch saat pertama kali komponen dirender
  useEffect(() => {
    fetchMenu()
  }, [])


  /**
   * Handler tombol untuk menambahkan item ke keranjang
   */
  const handleAddItem = () => {

    // Periksa apakah user sudah memilih item
    if (selectedItem) {

      // Pilih item yang dipilih user dan tambahkan qty-nya
      const tempItem: MakananType = {...selectedItem}
      tempItem.qty = tempQty
      const tempCart: MakananType[] = [...cart]
      tempCart.push(tempItem)
      
      // Tambahkan item ke keranjang
      dispatch(setCart(tempCart))
      sessionStorage.setItem("cart", JSON.stringify(tempCart))
      
      // Resest nilai qty kembali ke '1'
      setTempQty(1)

      // Sembunyikan modal/popup
      dispatch(hideModal())
    }
  }


  // Jika user sudah login, tampilkan halaman home
  if(useRequireAuth())
    return (
      <MainLayout>
        <ContentCard pageTitle="Menu Makanan">

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
                    <img className="object-cover w-full h-full" src={item.urlMakanan}/>
                  </div>

                  {/* Info makanan */}
                  <div className="flex-[1] mx-[10px] my-[6px]">
                    <h1 className="text-lg font-semibold">{item.namaMakanan}</h1>
                    <p className="text-md">Rp{harga}</p>
                  </div>
                </div>
              )}
            )}
          </div>
        </ContentCard>

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
                  onClick={handleAddItem}
                  className="bg-red-600 hover:bg-red-500 text-white font-semibold py-[6px] px-[18px] rounded-md w-full">
                  Tambah
                </button>
              </form>
          </Modal>
        }

      </MainLayout>
    )
}
