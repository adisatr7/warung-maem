import { useEffect, useState } from "react"
import axios from "axios"
import useRequireAuth from "../hooks/useRequireAuth"
import MainLayout from "../layouts/MainLayout"
import { MakananType } from "../types"
import ContentCard from "../layouts/ContentCard"
import { useAppDispatch, useAppSelector } from "../store"
import { useNavigate } from "react-router-dom"
import { setCart } from "../store/slices/cartSlice"


export default function Transaksi() {



  if(useRequireAuth())
    return (
      <MainLayout>
        <ContentCard pageTitle="Riwayat Transaksi">


        </ContentCard>
      </MainLayout> 
    )
}