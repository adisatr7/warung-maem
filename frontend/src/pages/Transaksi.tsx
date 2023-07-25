import { useEffect, useState } from "react"
import axios from "axios"
import useRequireAuth from "../hooks/useRequireAuth"
import MainLayout from "../layouts/MainLayout"
import { MakananType, TransaksiType } from "../types"
import ContentCard from "../layouts/ContentCard"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../../env"
import formatHarga from "../utils/formatHarga"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Transaksi() {
  const navigate = useNavigate()

  const [transaksi, setTransaksi] = useState<TransaksiType[]>([])

  const deleteHandler = async(idTransaksi: string) => {
    await axios.delete(`${API_URL}/transaksi/${idTransaksi}`)
      .then(res => {
        alert("Transaksi berhasil dihapus!")
        fetchTransaksi()
      })
      .catch(err => {
        alert(err)
      })
  }

  /**
   * Fetch data transaksi dari API
   */
  const fetchTransaksi = async () => {

    // Fetch data transaksi
    await axios.get(`${API_URL}/transaksi`)
      .then(res => {

        // Buat list transaksi sementara
        const tempList: TransaksiType[] = []

        // Loop data transaksi dari response API
        res.data.forEach((item: any) => {
          const tempObj: TransaksiType = {
            idTransaksi: item.id_transaksi,
            namaPembeli: item.nama_pembeli,
            waktuPembelian: item.waktu_pembelian,
            pembelian: item.pembelian,
            totalBayar: item.total_bayar
          }

          tempObj.waktuPembelian = new Date(item.waktu_pembelian).toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hourCycle: "h23",
            timeZone: "Asia/Jakarta",
          })

          // Push object transaksi ke list sementara tadi
          tempList.push(tempObj)  
        })

        // Set state transaksi dengan data dari list
        setTransaksi(tempList)
      })

      // Untuk berjaga-jaga, jika terjadi error
      .catch(err => {
        alert(err)
      })
  }

  /**
   * Fetch data transaksi ketika component pertama kali dimount
   */
  useEffect(() => {
    fetchTransaksi()
  }, [])


  if(useRequireAuth())
    return (
      <MainLayout>
        <ContentCard pageTitle="Riwayat Transaksi">

          {
            transaksi.length > 0 ? (
              transaksi.map((transaksi: TransaksiType, indexTransaksi: number) => (
                <div 
                  key={indexTransaksi} 
                  className="flex flex-col items-center justify-between w-full p-[18px] bg-stone-100 my-[12px] rounded-lg border-b border-gray-200 h-fit">
                  
                  {/* Info section */}
                  <div className="flex flex-row border-t border-b border-gray-300 py-[10px] w-full">
                    
                    {/* Tgl Transaksi */}
                    {/* Tanggal Transaksi */}
                    <div className={infoSectionContainer}>
                      <p className={grayInfoText}>Tanggal Transaksi</p>
                      <p className={blackText}>{transaksi.waktuPembelian.split(" pukul ")[0]}</p>
                    </div>

                    {/* Jam */}
                    <div className={infoSectionContainer}>
                      <p className={grayInfoText}>Jam</p>
                      <p className={blackText}>{transaksi.waktuPembelian.split(" pukul ")[1]}</p>
                    </div>

                    <div className={infoSectionContainer}>
                      <p className={grayInfoText}>Atas Nama</p>
                      <p className={blackText}>{transaksi.namaPembeli}</p>
                    </div>

                    {/* Nomor Transaksi */}
                    <div className={infoSectionContainer}>
                      <p className={grayInfoText}>Nomor Transaksi</p>
                      <p className={blackText}>{transaksi.idTransaksi}</p>
                    </div>

                    <DeleteIcon onClick={() => deleteHandler(transaksi.idTransaksi)} className="hover:cursor-pointer text-red-400 hover:text-red-800"/>
                    <EditIcon onClick={() => navigate(`/checkout/${transaksi.idTransaksi}`)} className="hover:cursor-pointer text-blue-400 hover:text-blue-800"/>
                  </div>

                  {/* Daftar barang-barang yang dibeli dan harganya masing-masing */}
                  <div className="flex flex-col items-center justify-center w-full h-fit mt-[10px]">
                    {
                      transaksi.pembelian.map((makanan: MakananType, indexMakanan: number) => (
                        <div
                          key={indexMakanan}
                          className="flex flex-row w-full transition-all duration-200 rounded-lg h-fit my-[4px] border border-stone-300 overflow-clip p-[10px] gap-[14px] items-center">

                          {/* Gambar makanan */}
                          <img src={makanan.urlMakanan} className="bg-gray-500 object-cover rounded-lg w-[72px] h-[64px]"/>

                          {/* Info tentang makanannya */}
                          <div className="flex flex-col w-full h-fit">
                            <p className={blackText}>{makanan.namaMakanan}</p>
                            <p className={grayFoodText}>{makanan.deskripsi}</p>
                            <p className={grayFoodText}>Qty: {makanan.qty}</p>
                          </div>

                          {/* Harga */}
                          <div className="flex flex-row w-fit gap-[4px] mr-[6px] text-end">
                            <p className="">Rp</p> 
                            <p>{formatHarga(makanan.harga * makanan.qty!)}</p>
                          </div>
                        </div>
                      ))
                    }
                  </div>

                  {/* Total harga */}
                  <div className="flex flex-row justify-end items-center w-full h-fit gap-[6px] px-[8px] pt-[12px]">
                    <p className="font-semibold text-stone-400">Total:</p>
                    <p className={blackText}>Rp {formatHarga(transaksi.totalBayar)}</p>
                  </div>

                </div>
              ))
            ) : (
              <>
              </>
            )
          }

        </ContentCard>
      </MainLayout> 
    )
}

const infoSectionContainer = "flex flex-col w-full h-fit"
const grayInfoText = "text-stone-400 text-sm"
const grayFoodText = "text-stone-500 text-sm"
const blackText = ""