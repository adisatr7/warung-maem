import { useEffect, useState } from "react"
import { PembelianType } from "../types"

export default function Pembelian() {
    const [dataPembelian, setDataPembelian] = useState([])

    //fetch untuk menarik data dari database
    const fetchPembelian = async () => {
        const response = await fetch("http://127.0.0.1:5000/transaksi")
        const data = await response.json()
        setDataPembelian(data)
    }

    //semua yg ditaruh di fungsi ini akan langsung ke-run
    useEffect(() => {
        fetchPembelian()
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
                    {dataPembelian.map((pembelian: PembelianType) => (
                        <tr key={pembelian.id_transaksi}>
                        <td>{pembelian.id_transaksi}</td>
                        <td>{pembelian.nama_pembeli}</td>
                        <td>{pembelian.waktu_pembelian}</td>
                        <td>{pembelian.total_bayar}</td>
                        <td><button
                        className="bg-green-400 text-white text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:bg-green-800">Edit</button></td>
                        <td><button
                        className="bg-red-400 text-white text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:bg-red-800">Hapus</button></td>
                        </tr>
                    ))}    
                </tbody>
            </table>

            //buat tombol tambah pembelian
            <button className="bg-blue-400 text-white text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:bg-blue-800">
                <"http://localhost:5000/tambah">Tambah Pembelian</>
        </div>   
        );
    };