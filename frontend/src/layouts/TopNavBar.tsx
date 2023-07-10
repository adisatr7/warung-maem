import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { MakananType } from "../types"
import { useAppDispatch, useAppSelector } from "../store"
import { clearCart, setCart } from "../store/slices/cartSlice"
import formatHarga from "../utils/formatHarga"
import hitungTotalHarga from "../utils/hitungTotalHarga"

import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import SearchIcon from "@mui/icons-material/Search"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import { darkenBackground, showSideBar } from "../store/slices/sideBarSlice"


export default function TopNavbar() {
  const navigate = useNavigate()
  const [openedDropdown, setOpenedDropdown] = useState("")

  const cart: MakananType[] = useAppSelector(state => state.cart.items)
  const dispatch = useAppDispatch()

  
  /**
   * Meng-handle tombol logout di navbar saat di-klik
   */
  const handleLogout = () => {
    sessionStorage.removeItem("activeUser")
    navigate("/")
  }

  
  /**
   * Meng-handle tombol untuk menampilkan SideBar
   */
  const handleShowSideBar = () => {
    dispatch(showSideBar())
    setTimeout(() => {
      dispatch(darkenBackground())
    }, 100)
  }
  

  return (
      /* Background */
      <div
        className="bg-gradient-to-t from-stone-900 to-stone-800 flex flex-row h-[64px] w-screen px-[24px] bg-cover justify-between shadow-md fixed top-0 z-10">

      {/* Tombol Hamburger untuk menunjukkan SideBar */}
      <button
        onClick={handleShowSideBar}
        className="flex items-center h-full bg-gradient-to-bl">
        <MenuIcon fontSize="medium" className="text-stone-300 hover:text-white"/>
      </button>

      {/* Search Bar (di tengah) */}
      <div className="flex flex-row items-center bg-gray-200 px-[12px] my-[10px] rounded-md w-[550px]">
        <SearchIcon
          fontSize="medium"
          className="text-gray-500 hover:cursor-pointer"/>
        <input 
          type="text" 
          placeholder="Cari makanan" 
          className="bg-transparent focus:outline-none text-lg px-[12px] py-[6px] rounded-lg w-full"/>
      </div>

      {/* Item-item mepet di sebelah kanan */}
      <div className="flex flex-row items-center gap-[24px]">

        {/* Cart */}
        <ShoppingCartIcon
          fontSize="medium"
          onClick={() => setOpenedDropdown(openedDropdown === "cart" ? "" : "cart")}
          className={`${iconStyle} ${openedDropdown == "cart" ? "text-white" : "text-stone-200"}`}/>

        {/* Cart Dropdown */}
        { openedDropdown === "cart" && (
          <div className="absolute flex flex-col pt-[16px] gap-[12px] right-[12px] top-[64px] bg-white bg-opacity-40 backdrop-blur-xl shadow-lg rounded-xl w-[350px] h-fit max-h-[500px]">
            
            {/* Header */}
            <div className="flex flex-row justify-between items-end px-[18px]">
              <h2 className="text-xl font-semibold ">Keranjang belanja</h2>
              {
                // Jika keranjang belanja tidak kosong, tampilkan tombol hapus semua item:
                cart.length > 0 && (
                  <button
                    onClick={() => dispatch(clearCart())}>
                    <p className="font-semibold underline text-stone-700 hover:text-red-700">Kosongkan</p>
                  </button>
                )
              }
            </div>

            {/* Garis pembatas */}
            <div className="h-[1px] w-full bg-gray-500"/>

            {/* Isi keranjang belanja */}
            <div className="px-[18px] overflow-auto">
              {
                // Jika keranjang belanja tidak kosong, tampilkan item-item berikut:
                cart.length > 0 && cart.map((item: MakananType, index: number) => (
                  <div key={index} className="flex flex-row items-center gap-[12px] py-[12px]">
                    {/* Gambar makana */}
                    <img className="w-[64px] h-[64px] rounded-lg object-cover" src={item.url_makanan}/>
                    <div className="flex flex-col gap-[4px]">
                      {/* Nama makanan */}
                      <p className="text-lg font-semibold">{item.nama_makanan}</p>
                      {/* Harga (subtotal) */}
                      <p className="text-sm">Rp {formatHarga(item.harga)} (x{item.qty})</p>
                    </div>
                  </div>
                ))
              }
              {
                // Jika keranjang belanja kosong, tampilkan pesan berikut:
                cart.length === 0 && 
                <p className="py-[38px] text-lg">Keranjang belanja Anda kosong!</p> 
              }
            </div>
            {
              // Jika keranjang belanja tidak kosong, tampilkan total harga:
              cart.length > 0 && (
                <div className="h-fit w-full border-t border-t-gray-500 py-[8px] flex flex-row items-center justify-center">
                  {/* Total harga */}
                  <div className="flex flex-row w-fit items-center justify-between gap-[6px]">
                    <p className="text-lg">Total:</p>
                    <p className="text-lg font-semibold">Rp {hitungTotalHarga(cart)}</p>
                  </div>

                  {/* Garis vertikal */}
                  <div className="h-[40px] w-[1px] bg-gray-500 mx-[16px]"/>

                  {/* Tombol checkout */}
                  <Link 
                    to="/checkout"
                    className="gap-[12px] text-lg flex flex-row justify-center font-semibold text-center hover:text-red-700 underline">
                    <p>Bayar sekarang</p>
                  </Link>
                </div>      
              )}
          </div>
        )}

        {/* Profile */}
        <AccountCircleIcon 
          fontSize="medium"
          onClick={() => setOpenedDropdown(openedDropdown === "profile" ? "" : "profile")}
          className={`${iconStyle} ${openedDropdown == "profile"? "text-stone-300" : "text-white"}`}/>

        {/* Profile Dropdown */}
        { openedDropdown === "profile" && (
          <button
            onClick={handleLogout}
            className="absolute flex flex-row items-center pl-[18px] pr-[64px] py-[16px] gap-[12px] right-[12px] top-[64px] bg-white bg-opacity-40 backdrop-blur-xl shadow-lg rounded-xl w-fit hover:cursor-pointer hover:font-semibold text-black hover:text-red-700">
            <LogoutIcon
              fontSize="medium"
              className=""/>
            <h2
              className="text-lg">
              Logout
            </h2>
          </button>
        )}
      </div>
    </div>
  )
}

const iconStyle = "hover:cursor-pointer hover:text-white"