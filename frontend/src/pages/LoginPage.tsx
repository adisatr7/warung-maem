import { useEffect, useState } from "react"
import TopLoadingBar from "../components/TopLoadingBar"


export default function LoginPage() {
  // State yang menentukan apakah loading bar harus muncul atau tidak
  const [isLoading, setIsLoading] = useState(false)

  // State yang menampung inputan user
  // (kiri) input = ambil data
  // (kanan) set = mengatur/mengubah data
  // 
  const [inputId, setInputId] = useState("")
  const [inputPassword, setInputPassword] = useState("")


  /**
   * Handler ketika user menekan tombol "Masuk"
   */
  const submitHandler = async() => {

    // Munculkan animasi loading
    setIsLoading(true)

    // Fetch data dari backend
    await fetch(`http://127.0.0.1:5000/user/${inputId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    // Ubah data yang didapat menjadi json
    .then(res => res.json())

    // Setelah data berhasil diubah menjadi json, lakukan pengecekan password
    .then(data => {

      // Jika password benar, simpan data user ke sessionStorage dan redirect user ke halaman utama
      if(data.password_login === inputPassword) {        
        sessionStorage.setItem("activeUser", JSON.stringify(true))
        window.location.href = "/"
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
      <div className="flex flex-col h-fit w-fit bg-white bg-opacity-20 backdrop-blur-sm border border-gray-500 rounded-xl overflow-clip ml-[20%] p-[18px]">
        
        {/* Header frame */}
        {/* <div className="px-[24px] pt-[16px] pb-[14px]">
          <h1 className="text-xl text-white">Masuk</h1>
        </div> */}

        {/* Input container */}
        <div className="flex flex-col">
          <input type="text" placeholder="ID Pengguna" onChange={e => setInputId(e.target.value)} className={inputStyle}/>
          <input type="password" placeholder="Kata sandi" onChange={e => setInputPassword(e.target.value)} className={inputStyle}/>
        </div>

        {/* Submit button */}
        <button onClick={() => submitHandler()} className="bg-red-700 text-white text-lg mt-[18px] py-[6px] rounded-full hover:cursor-pointer hover:bg-red-800">Masuk</button>

      </div>
    </div>
  )
}

const inputStyle = "border-2 border-gray-400 rounded-full p-[6px] my-[6px] px-[18px] focus:border-red-700 focus:outline-none"

"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"