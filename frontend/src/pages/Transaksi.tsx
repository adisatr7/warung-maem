import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../env"
import useRequireAuth from "../hooks/useRequireAuth"
import ContentCard from "../layouts/ContentCard"
import MainLayout from "../layouts/MainLayout"
import { useAppDispatch, useAppSelector } from "../store"
import { hideModal, showModal } from "../store/slices/modalSlice"
import { MakananType, TransaksiType } from "../types"
import formatHarga from "../utils/formatHarga"
import Form from '../components/Form'
import Modal from '../components/Modal'


export default function Transaksi() {
  const dispatch = useAppDispatch()
  const modalIsShowing = useAppSelector(state => state.modal.isShown)
  const [transactionList, setTransactionList] = useState<TransaksiType[]>([])

  const [currentTransaction, setCurrentTransaction] = useState<TransaksiType>()
  const [currentCustName, setCustName] = useState<string>("")

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
        setTransactionList(tempList)
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


  /**
   * Handle delete transaksi.
   * 
   * @param idTransaksi ID transaksi yang akan dihapus
   */
  const handleDeleteTransaction = async(idTransaksi: string) => {
    await axios.delete(`${API_URL}/transaksi/${idTransaksi}`)
      .then(() => {
        alert("Transaksi berhasil dihapus!")
        fetchTransaksi()
      })
      .catch(err => {
        alert(err)
      })
  }


  /**
   * Handle edit transaksi.
   * 
   * @param index Index transaksi yang akan diubah.
   */
  const handleEditTransaction = (index: number) => {
    
    // Simpan data pengguna yang akan diubah ke state
    setCurrentTransaction(transactionList[index])
    setCustName(transactionList[index].namaPembeli)

    // Tampilkan modal popup
    dispatch(showModal())
  }

  /**
   * Batalkan tindakan dan sembunyikan modal popup.
   */
  const handleCancelAction = () => {
    dispatch(hideModal())
  }
  
  /**
   * Kirim data pengguna yang sudah diubah ke API.
   */
  const handleSubmitEdit = async () => {
    try {
      
      // Kirim data pengguna yang akan diubah ke API
      const response = await axios.put(`${API_URL}/transaksi/${currentTransaction?.idTransaksi}`, {
        idTransaksi: currentTransaction?.idTransaksi,
        namaPembeli: currentCustName,
        waktuPembelian: currentTransaction?.waktuPembelian,
        totalBayar: currentTransaction?.totalBayar,
        pembelian: currentTransaction?.pembelian
      })

      // Ambil data pengguna yang sudah diubah dari API
      const updatedTransaction: TransaksiType = {
        idTransaksi: response.data.id_transaksi,
        namaPembeli: response.data.nama_pembeli,
        waktuPembelian: response.data.waktu_pembelian,
        totalBayar: response.data.total_bayar,
        pembelian: response.data.pembelian
      }

      // Ambil data pengguna yang sudah diubah dari state
      const updatedList = [...transactionList]
      const index = updatedList.findIndex(item => item.idTransaksi === updatedTransaction.idTransaksi)
      
      // Simpan data pengguna yang sudah diubah ke state
      updatedList[index] = updatedTransaction
      setTransactionList(updatedList)
      
      // Sembunyikan modal popup
      dispatch(hideModal())

      // Tampilkan notifikasi
      alert("Data transaksi berhasil diubah")
    }
    
    // Tampilkan error jika gagal mengubah data pengguna
    catch (error) {
      alert(error)
    }
  }


  if(useRequireAuth())
    return (
      <MainLayout>
        <ContentCard pageTitle="Riwayat Transaksi">

          {
            transactionList.length > 0 ? (
              transactionList.map((transaksi: TransaksiType, indexTransaksi: number) => (
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

                    <DeleteIcon onClick={() => handleDeleteTransaction(transaksi.idTransaksi)} className="text-red-400 hover:cursor-pointer hover:text-red-800"/>
                    <EditIcon onClick={() => handleEditTransaction(indexTransaksi)} className="text-blue-400 hover:cursor-pointer hover:text-blue-800"/>
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

        {/* Modal popup edit pengguna */}
        { modalIsShowing && (
          <Modal title="Ubah Data Pengguna">
            <Form 
              label="ID Transaksi"
              value={currentTransaction?.idTransaksi || ""}
              disabled/>
            
            <Form
              label="Nama Pembeli"
              value={currentCustName}
              setValue={setCustName}/>
              
            <div className="flex flex-row items-center justify-between gap-[6px] mt-[16px]">
              <button onClick={handleCancelAction} className="bg-gray-300 text-black text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:text-gray-500 flex flex-row px-[16px] justify-center items-center font-semibold">
                Batal
              </button>
              <button onClick={handleSubmitEdit} className="bg-red-700 text-white text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:bg-red-600 flex flex-row px-[16px] justify-center items-center font-semibold">
                Simpan
              </button>
            </div>
          </Modal>
        )}

      </MainLayout> 
    )
}

const infoSectionContainer = "flex flex-col w-full h-fit"
const grayInfoText = "text-stone-400 text-sm"
const grayFoodText = "text-stone-500 text-sm"
const blackText = ""