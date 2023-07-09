import { Link } from "react-router-dom"
import backgroundImage from "../assets/background-error.jpg"
import Navbar from "../components/Navbar"
import useRequireAuth from "../hooks/useRequireAuth"
import { useState } from "react"
import { MakananType } from "../types"

export default async function Checkout() {
    const [, setInputNama] = useState<string>("")
    const [tambahData, setTambahData] = useState<boolean>()

    const cart: Array<MakananType> = sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")!) : []

    const axios = require('axios');

    const res = await axios({
        method: 'post',
        url: 'http://localhost:5000/transaksi',
        data: {
            title: 'Making PUT request with axios'
            status: 'published'
        }
    })

// buat function handleTransaction()
    const handleTransaction = async () => {
        const data = {
            nama: inputNama,
            cart: cart
        }
        const response = await fetch("http://localhost:5000/transaksi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

// buat kode untuk navigasi ke halaman data transaksi
        if(response.ok) {
            alert("Transaksi berhasil!")
            window.location.href = "/transaksi"
        }
    }


if(useRequireAuth())
    return (
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="flex flex-col h-screen w-screen justify-center items-center bg-cover bg-no-repeat">
            
        <Navbar/>

        {/* Isi halaman home */}
        <div className="flex flex-col bg-cover bg-stone-200 h-screen w-screen items-center justify-center bg-blend-multiply">       

        {/* Isi halaman home */}
        <div className="flex flex-col bg-white mt-[36px] h-fit w-[1060px] rounded-xl px-[36px] py-[18px] justify-center drop-shadow-xl">
        
        {/* Header label */}
        <h1 className="text-3xl font-semibold text-black text-center">CHECKOUT</h1>

        {/* Garis */}
        <div className="w-full h-[2px] bg-red-500 my-[8px]"/>

        {/* Card checkout */}
        <div className="rounded-xl pt-5 pl-20 pr-40 pb-5">

            {/* Buat nama pelanggan yang bisa ditammbahkan sendiri */}
            <div>
                <p
                  className="text-black font-medium text-lg mt-3">
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
                            {cart.map((makanan) => (
                                <tr key={makanan.id}>
                                    {/* <td>{makanan.nama}</td>
                                    <td>{makanan.kuantitas}</td>
                                    <td>{makanan.harga}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                        <p className="border-dotted border-t-2 border-gray-600">Total</p>
                        <p>Bayar</p>
                        <p>Kembalian</p>
                        <br></br>

                    {/* Buat tombol input pesanan */}
                    <Link to="/transaksi" className="hover:cursor-pointer">
                        <button className= "bg-green-400 text-white text-lg mt-[6px] py-[6px] rounded-full w-[150px] text-center hover:cursor-pointer hover:bg-green-800"
                            onClick={() => setTambahData(true)}>
                            <p>Input</p>
                        </button>
                    </Link>

                    {
                        tambahData ? (
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
      </div>

        
    )
}