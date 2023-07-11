import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import TopLoadingBar from "../components/TopLoadingBar"
import { redButtonStyleFull } from "../styles"
import { API_URL } from "../../env.ts"


export default function LoginPage() {
  const navigate = useNavigate()

  // State yang menentukan apakah loading bar harus muncul atau tidak
  const [isLoading, setIsLoading] = useState(false)

  // State yang menampung inputan user
  // (kiri) input = ambil data
  // (kanan) set = mengatur/mengubah data
  const [inputId, setInputId] = useState("")
  const [inputPassword, setInputPassword] = useState("")


  /**
   * Handler ketika user menekan tombol "Masuk"
   */
  const submitHandler = async() => {

    // Munculkan animasi loading
    setIsLoading(true)

    // Fetch data dari backend
    await axios.get(`${API_URL}/user/${inputId}`)
    
    // Jika data berhasil diambil, ubah data menjadi json
    .then(res => res.data)

    // Setelah data berhasil diubah menjadi json, lakukan pengecekan password
    .then(data => {

      // Jika password benar, simpan data user ke sessionStorage dan redirect user ke halaman utama
      if(data.password_login === inputPassword) {        
        sessionStorage.setItem("activeUser", JSON.stringify(true))
        navigate("/")
      }

      // Jika username atau password salah, tampilkan pesan error
      else {
        console.log(data)
        alert("Gagal: Username atau password salah!")
      }
    })
    
    // Jika terjadi error, tampilkan error
    .catch(err => {
      console.log(err)
      alert(err)
    })

    // Matikan loading bar
    setIsLoading(false)
  }


  // Cek apakah user sudah login atau belum
  useEffect(() => {
    const activeUser = sessionStorage.getItem("activeUser")

    // Jika user sudah login, redirect ke halaman utama
    if(activeUser) {
      window.location.href = "/"
    }
  }, [isLoading])


  // Render halaman login
  return (
    <div 
      style={{ backgroundImage: "url(https://img.freepik.com/free-photo/healthy-breakfast-black-wooden-background-top-view-free-space-your-text_24972-410.jpg?w=1060)" }} 
      className={`flex flex-col h-screen w-screen bg-black bg-cover bg-no-repeat justify-center ${isLoading && "cursor-wait"}`}>

      {/* Loading bar - Muncul ketika user menekan tombol "Masuk" */}
      <TopLoadingBar isLoading={isLoading}/>

      {/* Login form */}
      <form className="flex flex-col h-fit w-fit bg-white bg-opacity-20 backdrop-blur-sm border border-gray-500 rounded-xl overflow-clip ml-[20%] p-[18px] gap-[12px]">
        
        {/* Header frame */}
        <div className="px-[4px] py-[10px] font-semibold text-2xl text-white">
          <h1 className="">Selamat datang!</h1>
        </div>

        {/* Input */}
        <input type="text" placeholder="ID Pengguna" onChange={e => setInputId(e.target.value)} className={inputStyle}/>
        <input type="password" placeholder="Kata sandi" onChange={e => setInputPassword(e.target.value)} className={inputStyle}/>

        {/* Submit button | TODO: Implement enter key */}
        <button 
          onClick={() => submitHandler()}
          className={`${redButtonStyleFull}`}>Masuk</button>
        
        {/* Register prompt */}
        <p className="text-stone-300 mt-[4px]">Karyawan baru? <Link to="/register" className="font-semibold underline hover:text-red-600">Klik disini</Link> untuk melakukan registrasi.</p>

      </form>
    </div>
  )
}

const inputStyle = "border-2 border-gray-400 rounded-full p-[6px] px-[18px] focus:border-red-600 focus:outline-none"
