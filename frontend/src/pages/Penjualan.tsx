import { useEffect, useState } from "react"
import { PenjualanType } from "../types"

export default function Penjualan() {
    const [dataPenjualan, setDataPenjualan] = useState([])

    //fetch untuk menarik data dari database
    const fetchPenjualan = async () => {
        const response = await fetch("http://127.0.0.1:5000/transaksi")
        const data = await response.json()
        setDataPenjualan(data)
    }

    //semua yg ditaruh di fungsi ini akan langsung ke-run
    useEffect(() => {
        fetchPenjualan()
    }
    , [])
    
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>ID Transaksi</th>
                    <th>Nama</th>
                    <th>Waktu Pembelian</th>
                    <th>Total</th>
                    <th>Ubah</th>
                    <th>Hapus</th>
                </tr>
                </thead>
                <tbody>
                {dataPenjualan.map((penjualan: PenjualanType) => (
                    <tr key={penjualan.id_transaksi}>
                    <td>{penjualan.id_transaksi}</td>
                    <td>{penjualan.nama_pembeli}</td>
                    <td>{penjualan.waktu_pembelian}</td>
                    <td>{penjualan.total_bayar}</td>
                    <td><button
                    className="bg-green-400 text-white text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:bg-green-800">Edit</button></td>
                    <td><button
                    className="bg-red-400 text-white text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:bg-red-800">Hapus</button></td>
                    </tr>
                ))}    
                </tbody>
            </table>
            <p><"http://localhost:5000/tambah">Tambah Data</p>
        </div>   
    )
}