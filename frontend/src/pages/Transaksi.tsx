import { useEffect, useState } from "react"
import { MakananType, TransaksiType } from "../types"
import useRequireAuth from "../hooks/useRequireAuth"
import axios, {AxiosResponse} from "axios"
import Navbar from "../components/Navbar"
import { Link, NavLink } from "react-router-dom"


export default function Pembelian() {
  const [dataTransaksi, setDataTransaksi] = useState<TransaksiType[]>([])
  const [inputNama, setInputNama] = useState<string>("")
  const [inputKuantitas, setKuantitas] = useState<number[]>([])
  const [inputValue, setValue] = useState<number>(1)
  const [inputNamaMakanan, setNamaMakanan] = useState<MakananType[]>([])
  const [openPopup, setOpenPopup] = useState<boolean>()
  const [tambahData, setTambahData] = useState<boolean>()

  
  const hapusData = (index: number) => {
    alert ("Hapus data?")
  }
  
  const kolom = "border-2 border-gray-500 outline-none rounded-lg w-[410px] ml-10"
  const baris = "py-[2px] border-r-2 border-gray-300"


  // fetch untuk menarik data dari database
  const fetchDataTransaksi = async () => {
    await axios.get(`http://127.0.0.1:5000/transaksi`)
    .then(hasil=> {
      setDataTransaksi(hasil.data)
    })
    .catch(error => console.log(error))
  }

  const fetchMakanan = async (id_makanan: number) => {
    await axios.get(`http://127.0.0.1:5000/makanan/${id_makanan}`)
    .then(hasil=> {
      setNamaMakanan(hasil.data)
    })
    .catch(error => console.log(error))
  }

  //menampilkan data transaksi untuk diubah atau diedit
  const updateDataTransaksi = async (id: number) => {
    await axios.put(`http://127.0.0.1:5000/transaksi/${id}`, {
      nama_pembeli: inputNama,
      kuantitas: inputKuantitas,
    })
    .then(hasil => {
      alert("Data berhasil diubah")
      fetchDataTransaksi()
    })
  }
  
  //menampilkan form atau popup untuk menambah data

  //menghapus data transaksi

  //semua yg ditaruh di fungsi ini akan langsung ke-run
  useEffect(() => {
    fetchDataTransaksi()
  }, [])
  

  if(useRequireAuth())
    return (
      <div
        className="flex flex-col bg-cover bg-stone-200 h-screen w-screen items-center justify-center bg-blend-multiply">

        <Navbar/>
        
        {/* Isi halaman home */}
        <div className="flex flex-col bg-white mt-[36px] h-fit w-[1060px] rounded-xl px-[36px] py-[18px] justify-center drop-shadow-xl">
          
        {/* Header label */}
        <h1 className="text-2xl font-semibold">Data Transaksi</h1>

        {/* Garis */}
        <div className="w-full h-[2px] bg-red-500 my-[8px]"/>

        {/* Card data pembelian */}
        <div className="bg-gray-200 rounded-xl pt-5 pl-20 pr-40 pb-5">
          { dataTransaksi.map((transaksi: TransaksiType, index: number) => (
            <div>
              <p className="text-red-500 font-bold text-xl">Nama: Jean</p>
                <br></br>
                <table className="w-full">
                  <thead className="text-left">
                  <tr>
                    <th>Makanan: Martabak</th>
                    <th>Harga: 25.000</th>
                    <th>Jumlah: 2</th>
                  </tr>
                  </thead>
                </table>
                <p className="font-bold text-right mt-3 text-lg">Total: 50.000</p>
              <br></br>
              <p className="w-full h-[1px] bg-gray-500 "></p>
            </div>
          ))
          }
          </div>
            

        {/* Buat tombol tambah pembelian */}
        <Link to="/home" className="hover:cursor-pointer">
          <button className= "bg-green-400 text-white text-lg mt-[6px] py-[6px] rounded-full w-[150px] text-center hover:cursor-pointer hover:bg-green-800"
            onClick={() => setTambahData(true)}>
            <p>Tambah Data</p>
          </button>
        </Link>

        </div>
          {
            openPopup && (
              <div className="justify-center items-center w-screen h-screen absolute flex bg-black bg-opacity-20 backdrop-blur-sm duration-300 transition-all" onClick={() => setOpenPopup(false)}>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col bg-white shadow-lg rounded-xl w-[500px] h-fit z-10">
                  <h3
                    className="text-2xl font-bold text-center text-red-500 mt-[20px] border-b-4">
                    Ubah Data
                  </h3>
                    <p
                      className="pl-7 m-3">
                      Nama:                    
                    </p>
                    <input onChange={(e) => setInputNama(e.target.value)} className={`${kolom}`}/>
                    <p
                      className="pl-7 m-3">
                      Makanan
                    </p>
                    <input className={`${kolom}`}/>
                    <p
                      className="pl-7 m-3">
                      Kuantitas
                    </p>
                    <input className={`${kolom}`}/>
                    <p
                      className="pl-7 m-3">
                      Harga
                    </p>
                    <input className={`${kolom}`}/>
                    <p
                      className="pl-7 ml-3 mb-3 mt-3">
                      Total
                    </p>
                    <input className={`${kolom}`}/>
                      <div className="w-full h-fit flex justify-center">
                        <button className="bg-blue-400 text-white text-lg mt-[15px] mb-[20px] py-[6px] rounded-full w-[150px] text-center hover:cursor-pointer hover:bg-blue-800">
                          <p>Ubah</p>
                        </button>

                      </div>
                </div>
              </div>
            )
          }

          {
            tambahData && (
              <div className="justify-center items-center w-screen h-screen absolute flex bg-black bg-opacity-20 backdrop-blur-sm duration-300 transition-all" onClick={() => setTambahData(false)}>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col bg-white shadow-lg rounded-xl w-[500px] h-fit z-10">
                  <h3
                    className="text-2xl font-bold text-center text-black mt-[20px] border-b-4">
                    Tambahkan Data
                  </h3>
                    <p
                      className="pl-7 m-3">
                      Nama:                    
                    </p>
                    <input className={`${kolom}`}/>
                    <p
                      className="pl-7 m-3">
                      Makanan
                    </p>
                    <input className={`${kolom}`}/>
                    <p
                      className="pl-7 m-3">
                      Kuantitas
                    </p>
                    <input className={`${kolom}`}/>
                    <p
                      className="pl-7 m-3">
                      Harga
                    </p>
                    <input className={`${kolom}`}/>
                    <p
                      className="pl-7 ml-3 mb-3 mt-3">
                      Total
                    </p>
                    <input className={`${kolom}`}/>
                      <div className="w-full h-fit flex justify-center">
                        <button className="bg-green-400 text-white text-lg mt-[15px] mb-[20px] py-[6px] rounded-full w-[150px] text-center hover:cursor-pointer hover:bg-green-800">
                          <p>Tambahkan</p>
                        </button>

                      </div>
                </div>
              </div>
            )
          }
      </div> 
    )
}