import { useEffect } from "react"
import { CircularProgress } from "@mui/material"


export default function App() {
  // Mencatat apakah user sudah login atau belum
  const isLoggedIn = sessionStorage.getItem("activeUser")

  useEffect(() => {

    // Jika user belum login, redirect ke halaman login
    if(!isLoggedIn)
      setTimeout(() => {
        window.location.href = "/login"
      }, 500)
    
    // Jika user sudah login, redirect ke halaman utama
    else
      setTimeout(() => {
        window.location.href = "/home"
      }, 1000)
  })

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <CircularProgress color="error"/>
      <h1 className="text-xl mt-[18px]">Mengecek status login...</h1>
    </div>
  )
}
