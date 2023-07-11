import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useRequireAuth from "../hooks/useRequireAuth"
import { MakananType } from "../types"

import { useAppDispatch, useAppSelector } from "../store"
import { setCart } from "../store/slices/cartSlice"
import MainLayout from "../layouts/MainLayout"
import ContentCard from "../layouts/ContentCard"
import QtyInput from "../components/QtyInput"
import formatHarga from "../utils/formatHarga"


export default function Checkout() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cart: MakananType[] = useAppSelector(state => state.cart.items)


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


  if(useRequireAuth())
    return (
      <MainLayout>
        <ContentCard pageTitle="Checkout">
          
          { cart.length <= 0
              ? <p className="w-full text-lg text-center py-[40px] text-gray-500">
                  Belum ada barang di keranjang. <span onClick={() => navigate("/home")} className="font-bold hover:underline hover:cursor-pointer hover:text-red-700">Klik disini</span> untuk kembali ke halaman utama.
                </p>
              : (
                cart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-300 py-[20px]">
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
              )
          }
          
        </ContentCard>
      </MainLayout>   
    )
}