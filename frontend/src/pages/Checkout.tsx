import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useRequireAuth from "../hooks/useRequireAuth"
import { MakananType } from "../types"

import { useAppDispatch, useAppSelector } from "../store"
import { setCart } from "../store/slices/cartSlice"
import MainLayout from "../layouts/MainLayout"
import ContentCard from "../layouts/ContentCard"


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
          
          { cart.length > 0
              ? <p>Sudah ada barang</p>
              : <p className="w-full text-lg text-center py-[40px] text-gray-500">
                  Belum ada barang di keranjang. <span onClick={() => navigate("/home")} className="font-bold hover:underline hover:cursor-pointer hover:text-red-700">Klik disini</span> untuk kembali ke halaman utama.
                </p>
          }
          
        </ContentCard>
      </MainLayout>   
    )
}