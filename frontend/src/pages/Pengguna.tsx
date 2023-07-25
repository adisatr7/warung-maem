import { useEffect, useState } from "react"
import axios from "axios"
import { PenggunaType } from "../types"
import ContentCard, {}  from "../layouts/ContentCard"
import MainLayout from "../layouts/MainLayout"
import useRequireAuth from "../hooks/useRequireAuth"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import EditIcon from "@mui/icons-material/Edit"


export default function Pengguna() {
  const [pengguna, setPengguna] = useState<PenggunaType[]>([])
  
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
        
        setPengguna(fetchedData)
      })
    }
    
    catch (error) {
      alert(error)
    }
  }
  
  useEffect(() => {
    fetchPengguna()
  }, [])
  
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
                { pengguna.map((pengguna: PenggunaType, index: number) => (
                    <tr key={pengguna.id_user}>
                      <td className={`pl-[10px] ${bodyRowStyle(index)}`}>{pengguna.id_user}</td>
                      <td className={bodyRowStyle(index)}>{pengguna.nama_user}</td>
                      <td className={bodyRowStyle(index)}>{pengguna.password_login}</td>
                      <td className={bodyRowStyle(index)}>{pengguna.alamat}</td>
                      <td className={bodyRowStyle(index)}>{pengguna.no_telp}</td>
                      <td className={`flex flex-row gap-[6px] ${bodyRowStyle(index)}`}>

                        {/* Tombol edit */}
                        <button className="hover:text-gray-400 text-black rounded-md text-lg mt-[6px] py-[6px] hover:cursor-pointer">
                          <EditIcon/>
                        </button>

                        {/* Tombol hapus */}
                        <button className="hover:text-red-400 text-red-600 rounded-md text-lg mt-[6px] py-[6px] hover:cursor-pointer">
                          <DeleteForeverIcon/>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

        </ContentCard>
      </MainLayout>
    )
}

const bodyRowStyle = (index: number): string => {
  const rowColor = index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
  return `${rowColor}`
}