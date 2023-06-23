import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom"
import backgroundImage from "../assets/background-error.jpg"
import { useEffect } from "react"


export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  // Secara otomatis redirect ke halaman utama setelah 3 detik
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/"
    }, 3000)
  }, [])

  if(isRouteErrorResponse(error)) {
    return (
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="flex flex-col h-screen w-screen justify-center items-center bg-cover bg-no-repeat">

        {/* Card container */}
        <div className="bg-white bg-opacity-40 backdrop-blur-lg border border-gray-300 flex flex-col h-fit w-fit rounded-lg shadow-lg">

          {/* Header */}
          <div className="px-[24px] py-[16px]">
            <h1 className="text-3xl text-white font-bold">Error {error.status} - {error.statusText}</h1>
          </div>

          {/* Garis pembatas */}
          <div className="w-full h-[2px] bg-gray-300"/>

          {/* Caption */}
          <div className="px-[24px] py-[16px] text-lg text-white">
            <p>Sepertinya halaman yang Anda cari tidak ditemukan.</p>
            <p>Klik <Link className="font-semibold text-red-600 hover:text-red-500 hover:underline" to={"/"}>disini</Link> untuk kembali ke halaman awal.
            </p>
          </div>

        </div>
      </div>
    )
  }

}