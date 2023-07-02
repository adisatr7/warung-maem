import { useEffect, useState } from "react"
import { PembelianType } from "../types"
import useRequireAuth from "../hooks/useRequireAuth"
import axios from "axios";


export default function Pembelian() {
  const [dataPembelian, setDataPembelian] = useState<PembelianType[]>([])


  //semua yg ditaruh di fungsi ini akan langsung ke-run
  useEffect(() => {
    // fetch untuk menarik data dari database
    const dataPembelian = async () => {
      axios.get(`http://localhost:5000/transaksi/`)
      .then(res=>setDataPembelian(res.data))
      .catch(error=>console.log(error));
    }
    dataPembelian();
},[]);

 
    
    await fetch(`http://127.0.0.1:5000/transaksi/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
  
  
  if(useRequireAuth())
    return (
      <div className="flex w-screen h-screen">
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
                {/* map untuk memunculkan data */}
              { dataPembelian.map((pembelian: PembelianType, index: number) => (
                <tr key={index}>
                  <td>{pembelian.id_transaksi}</td>
                  <td>{pembelian.nama_pembeli}</td>
                  <td>{pembelian.waktu_pembelian}</td>
                  <td>{pembelian.total_bayar}</td>
                  <td>
                    <button className="bg-blue-400 text-white text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:bg-blue-800">
                      <p>Ubah</p>
                    </button>
                  </td>
                  <td>
                    <button className="bg-red-400 text-white text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:bg-red-800">
                      <p>Hapus</p>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Buat tombol tambah pembelian */}
          <button className="bg-blue-400 text-white text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:bg-blue-800">
            <p>Pembelian</p>
          </button>
      </div>   
    )
  }