import { useEffect, useState } from "react"
import axios from "axios"
import { PenggunaType } from "../types"
import ContentCard, {}  from "../layouts/ContentCard"
import MainLayout from "../layouts/MainLayout"
import useRequireAuth from "../hooks/useRequireAuth"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import EditIcon from "@mui/icons-material/Edit"
import { useAppDispatch, useAppSelector } from "../store"
import Modal from "../components/Modal"
import { hideModal, showModal } from "../store/slices/modalSlice"
import { API_URL } from "../../env"
import Form from "../components/Form"


export default function Pengguna() {
  const dispatch = useAppDispatch()
  const modalIsShowing = useAppSelector(state => state.modal.isShown)
  const [mode, setMode] = useState<"view" | "edit" | "delete">("view")

  // Utk menampung input dari form edit pengguna
  const [currentUserId, setCurrentUserId] = useState<string>("")
  const [editNamaUserInput, setEditNamaUserInput] = useState<string>("")
  const [editPasswordInput, setEditPasswordInput] = useState<string>("")
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)
  const [editConfirmPasswordInput, setEditConfirmPasswordInput] = useState<string>("")
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] = useState<boolean>(false)
  const [editAlamatInput, setEditAlamatInput] = useState<string>("")
  const [editNoTelpInput, setEditNoTelpInput] = useState<string>("")

  
  // Data semua pengguna yang terdaftar di database
  const [registeredUsers, setRegisteredUsers] = useState<PenggunaType[]>([])
  
  /**
   * Mengambil data pengguna dari database
   */
  const fetchPengguna = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/user")
      
      const fetchedData: PenggunaType[] = []
      response.data.forEach((item: any) => {
        fetchedData.push({
          id_user: item.id_user,
          nama_user: item.nama_user,
          password_login: item.password_login,
          alamat: item.alamat,
          no_telp: item.no_telp
        })
        
        setRegisteredUsers(fetchedData)
      })
    }
    
    catch (error) {
      alert(error)
    }
  }
  
  // Mengambil data pengguna ketika halaman dimuat
  useEffect(() => {
    fetchPengguna()
  }, [])

  
  /**
   * Mengubah data pengguna.
   * 
   * @param index Index (data di baris ke-X pada tabel) dari pengguna yang akan diubah
   */
  const handleEditUser = (index: number) => {

    // Ambil data pengguna yang akan diubah dari tabel
    const currentUser: PenggunaType = registeredUsers[index]    
    // Simpan data pengguna yang akan diubah ke state
    setMode("edit")
    setCurrentUserId(currentUser.id_user)
    setEditNamaUserInput(currentUser.nama_user)
    setEditPasswordInput(currentUser.password_login)
    setEditAlamatInput(currentUser.alamat)
    setEditNoTelpInput(currentUser.no_telp)

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

    // Validasi input
    if (editNamaUserInput.length < 3) {
      alert("Nama pengguna minimal 3 karakter")
      return
    }

    if (editPasswordInput.length < 8) {
      alert("Password minimal 8 karakter")
      return
    }
    
    if (editPasswordInput !== editConfirmPasswordInput) {
      alert("Password tidak sama")
      return
    }

    // Jika input valid, kirim data pengguna yang akan diubah ke API
    try {
      
      // Kirim data pengguna yang akan diubah ke API
      const response = await axios.put(`${API_URL}/user/${currentUserId}`, {
        nama_user: editNamaUserInput,
        password_login: editPasswordInput,
        alamat: editAlamatInput,
        no_telp: editNoTelpInput
      })

      // Ambil data pengguna yang sudah diubah dari API
      const updatedUser: PenggunaType = {
        id_user: response.data.id_user,
        nama_user: response.data.nama_user,
        password_login: response.data.password_login,
        alamat: response.data.alamat,
        no_telp: response.data.no_telp
      }

      // Ambil data pengguna yang sudah diubah dari state
      const updatedUsers = [...registeredUsers]
      const index = updatedUsers.findIndex((user: PenggunaType) => user.id_user === currentUserId)
      
      // Simpan data pengguna yang sudah diubah ke state
      updatedUsers[index] = updatedUser
      setRegisteredUsers(updatedUsers)
      
      // Sembunyikan modal popup
      dispatch(hideModal())

      // Tampilkan notifikasi
      alert("Data pengguna berhasil diubah")
    }
    
    // Tampilkan error jika gagal mengubah data pengguna
    catch (error) {
      alert(error)
    }
  }


  /**
   * Munculkan konfirmasi hapus pengguna.
   */
  const handleDeleteUser = (index: number) => {
    // Ambil data pengguna yang akan dihapus dari tabel
    const userToBeDeleted: PenggunaType = registeredUsers[index]
    
    // Simpan data pengguna yang akan dihapus ke state
    setMode("delete")
    setCurrentUserId(userToBeDeleted.id_user)
    setEditNamaUserInput(userToBeDeleted.nama_user)
    setEditPasswordInput(userToBeDeleted.password_login)
    setEditAlamatInput(userToBeDeleted.alamat)
    setEditNoTelpInput(userToBeDeleted.no_telp)

    // Tampilkan modal popup
    dispatch(showModal())
  }

  /**
   * Hapus pengguna dari database.
   */
  const handleConfirmDeleteUser = async () => {
    // Kirim data pengguna yang akan dihapus ke API
    await axios.delete(`${API_URL}/user/${currentUserId}`)

    // Jika berhasil, hapus data pengguna dari state
    .then(() => {
      // // Ambil data pengguna yang sudah dihapus dari API
      // const deletedUser: PenggunaType = {
      //   id_user: response.data.id_user,
      //   nama_user: response.data.nama_user,
      //   password_login: response.data.password_login,
      //   alamat: response.data.alamat,
      //   no_telp: response.data.no_telp
      // }
  
      // Ambil data pengguna yang sudah dihapus dari state
      const updatedUsers = [...registeredUsers]
      const index = updatedUsers.findIndex((user: PenggunaType) => user.id_user === currentUserId)
      
      // Simpan data pengguna yang sudah dihapus ke state
      updatedUsers.splice(index, 1)
      setRegisteredUsers(updatedUsers)
      
      // Sembunyikan modal popup
      dispatch(hideModal())
      
      // Tampilkan notifikasi
      alert("Data pengguna berhasil dihapus")
    })

    // Tampilkan error jika gagal menghapus data pengguna
    .catch(err => {
      alert(err)
    })
  }
  

  if(useRequireAuth())
    return (
      <MainLayout>
        <ContentCard pageTitle="Data Pengguna">
        
          {/* Container tabel daftar pengguna */}
          <div className="flex flex-row justify center my-[16px] border border-gray-200 rounded-lg pt-[12px]">

            {/* Tabel */}
            <table className="w-full table-auto">

              {/* Header tabel */}
              <thead className="text-left text-bold">
                <tr>
                  <th className="pl-[10px]">ID User</th>
                  <th>Nama User</th>
                  <th>Password</th>
                  <th>Alamat</th>
                  <th>Nomor telepon</th>
                </tr>
              </thead>

              {/* Isi tabel */}
              <tbody>
                { registeredUsers.map((pengguna: PenggunaType, index: number) => (
                    <tr key={pengguna.id_user}>
                      
                      <td className={`pl-[10px] ${bodyRowStyle(index)}`}>{pengguna.id_user || "-"}</td>
                      <td className={`${bodyRowStyle(index)}`}>{pengguna.nama_user || "-"}</td>
                      <td className={`${bodyRowStyle(index)}`}>{pengguna.password_login || "-"}</td>
                      <td className={`${bodyRowStyle(index)}`}>{pengguna.alamat || "-"}</td>
                      <td className={`${bodyRowStyle(index)}`}>{pengguna.no_telp || "-"}</td>
                      <td className={`flex flex-row gap-[6px] ${bodyRowStyle(index)}`}>

                        {/* Tombol edit */}
                        <button onClick={() => handleEditUser(index)} className="hover:text-gray-400 text-black rounded-md text-lg mt-[6px] py-[6px] hover:cursor-pointer">
                          <EditIcon/>
                        </button>

                        {/* Tombol hapus */}
                        <button onClick={() => handleDeleteUser(index)} className="hover:text-red-400 text-red-600 rounded-md text-lg mt-[6px] py-[6px] hover:cursor-pointer">
                          <DeleteForeverIcon/>
                        </button>
                      </td>
                      
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

        </ContentCard>

        {/* Modal popup edit pengguna */}
        { modalIsShowing && mode === "edit" &&
          <Modal title="Ubah Data Pengguna">
            <Form 
              label="ID Pengguna"
              value={currentUserId}
              setValue={setCurrentUserId}
              disabled/>
            
            <Form
              label="Nama Pengguna"
              value={editNamaUserInput}
              setValue={setEditNamaUserInput}/>
              
            <Form
              label="Password"
              value={editPasswordInput}
              setValue={setEditPasswordInput}
              isPassword={true}
              isVisible={passwordIsVisible}
              setIsVisible={setPasswordIsVisible}/>

            <Form
              label="Konfirmasi Password"
              value={editConfirmPasswordInput}
              setValue={setEditConfirmPasswordInput}
              isPassword={true}
              isVisible={confirmPasswordIsVisible}
              setIsVisible={setConfirmPasswordIsVisible}/>
              
            <Form
              label="Alamat"
              value={editAlamatInput}
              setValue={setEditAlamatInput}/>
              
            <Form
              label="Nomor Telepon"
              value={editNoTelpInput}
              setValue={setEditNoTelpInput}/>
              
            <div className="flex flex-row items-center justify-between gap-[6px] mt-[16px]">
              <button onClick={handleCancelAction} className="bg-gray-300 text-black text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:text-gray-500 flex flex-row px-[16px] justify-center items-center font-semibold">
                Batal
              </button>
              <button onClick={handleSubmitEdit} className="bg-red-700 text-white text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:bg-red-600 flex flex-row px-[16px] justify-center items-center font-semibold">
                Simpan
              </button>
            </div>
          </Modal>
        }
        
        {/* Modal popup hapus data pengguna */}
        { modalIsShowing && mode === "delete" &&
          <Modal title="Hapus Data Pengguna">
            <p className="text-lg font-semibold">Apakah Anda yakin ingin menghapus data pengguna {editNamaUserInput}?</p>
            <div className="flex flex-row items-center justify-between gap-[6px] mt-[16px]">
              <button onClick={handleCancelAction} className="bg-gray-300 text-black text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:text-gray-500 flex flex-row px-[16px] justify-center items-center font-semibold">
                Batal
              </button>
              <button onClick={handleConfirmDeleteUser} className="bg-red-700 text-white text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:bg-red-600 flex flex-row px-[16px] justify-center items-center font-semibold">
                Hapus
              </button>
            </div>
          </Modal>
        }

      </MainLayout>
    )
}

const bodyRowStyle = (index: number): string => {
  const rowColor = index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
  return `${rowColor}`
}
