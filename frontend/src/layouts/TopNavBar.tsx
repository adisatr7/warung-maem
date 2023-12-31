import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { MakananType } from "../types"
import { useAppDispatch, useAppSelector } from "../store"
import { clearCart } from "../store/slices/cartSlice"
import formatHarga from "../utils/formatHarga"
import hitungTotalHarga from "../utils/hitungTotalHarga"

import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import SearchIcon from "@mui/icons-material/Search"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import { darkenBackground, showSideBar } from "../store/slices/sideBarSlice"
import QtyInput from "../components/QtyInput"


export default function TopNavbar() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cart: MakananType[] = useAppSelector(state => state.cart.items)

  const [openedDropdown, setOpenedDropdown] = useState("")
  
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
    <div className="bg-gradient-to-t from-stone-900 to-stone-800 flex flex-row h-[64px] w-screen px-[24px] bg-cover justify-between shadow-md fixed top-0 z-10">

      {/* Tombol Hamburger untuk menunjukkan SideBar */}
      <button
        onClick={handleShowSideBar}
        className="flex items-center h-full bg-gradient-to-bl">
        <MenuIcon fontSize="medium" className="text-stone-400 hover:text-white"/>
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
        <div className="relative">
          <ShoppingCartIcon
            fontSize="medium"
            onClick={() => setOpenedDropdown(openedDropdown === "cart" ? "" : "cart")}
            className={`${iconStyle} ${openedDropdown == "cart" ? "text-stone-100" : "text-stone-400"}`}/>

          {/* Jika keranjang belanja ada isinya, tampilkan badge jumlah belanjaan */}
          { cart.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-[20px] h-[20px] flex justify-center items-center">
                <p className="text-xs text-white">{cart.length}</p>
              </div>
            )
          }
        </div>

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
            <div className="overflow-auto">
              {
                // Jika keranjang belanja tidak kosong, tampilkan item-item berikut:
                cart.length > 0 && cart.map((item: MakananType, index: number) => (
                  <div 
                    key={index} 
                    className="flex flex-row items-center gap-[12px] mx-[9px] px-[9px] py-[12px] hover:bg-white hover:bg-opacity-30 rounded-md">
                      
                    {/* Gambar makana */}
                    <img className="w-[64px] h-[64px] rounded-lg object-cover"  src={item.urlMakanan}/>
                    
                    <div className="flex flex-col gap-[4px] w-full">
                      {/* Nama makanan */}
                      <p className="text-lg font-semibold">{item.namaMakanan}</p>
                      {/* Harga (subtotal) */}
                      <p className="text-sm">Rp {formatHarga(item.harga)} (x{item.qty})</p>
                    </div>

                    {/* Delete item */}
                    <QtyInput cartIndex={index}/>
                  </div>
                ))
              }
              {
                // Jika keranjang belanja kosong, tampilkan pesan berikut:
                cart.length === 0 && 
                <p className="my-[38px] mx-[18px] text-lg">Keranjang belanja Anda kosong!</p> 
              }
            </div>
            {
              // Jika keranjang belanja tidak kosong, tampilkan total harga:
              cart.length > 0 && (
                <div className="h-fit w-full border-t border-t-gray-500 py-[8px] flex flex-row items-center justify-center">
                  {/* Total harga */}
                  <div className="flex flex-row w-fit items-center justify-between gap-[6px]">
                    <p className="text-lg">Total:</p>
                    <p className="text-lg font-semibold">Rp {formatHarga(hitungTotalHarga(cart))}</p>
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
              )
            }
          </div>
        )}

        {/* Profile */}
        <AccountCircleIcon 
          fontSize="medium"
          onClick={() => setOpenedDropdown(openedDropdown === "profile" ? "" : "profile")}
          className={`${iconStyle} ${openedDropdown == "profile" ? "text-stone-100" : "text-stone-400"}`}/>

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