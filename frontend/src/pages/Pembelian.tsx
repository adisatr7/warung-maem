import { useEffect, useState } from "react"
import { PembelianType } from "../types"
import useRequireAuth from "../hooks/useRequireAuth"


export default function Pembelian() {
  const [dataPembelian, setDataPembelian] = useState<PembelianType[]>([])

  // fetch untuk menarik data dari database
  const fetchPembelian = async () => {
    
    await fetch(`http://127.0.0.1:5000/transaksi/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    .then(res => res.json())

    .then(data => {
      setDataPembelian(data)
    })
  }

  //semua yg ditaruh di fungsi ini akan langsung ke-run
  useEffect(() => {
    fetchPembelian()
  }, [])
  
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