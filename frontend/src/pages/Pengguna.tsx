import { useEffect, useState } from "react"
import axios from "axios"
import { PenggunaType } from "../types"
import ContentCard, {}  from "../layouts/ContentCard"
import MainLayout from "../layouts/MainLayout"
import useRequireAuth from "../hooks/useRequireAuth"

export default function Pengguna() {
    const [pengguna, setPengguna] = useState<PenggunaType[]>([])

    const fetchPengguna = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/pengguna")

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
        // <MainLayout>
            {/* <ContentCard pageTitle="Data Pengguna"> */}

                {/* Daftar data pengguna */}
                <div className="flex flex-row flex-wrap justify center my-[16px] gap-[28px]">
                    { pengguna.map((item: PenggunaType, index: string) => {
                        
                        return (
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id User</th>
                                            <th>Nama User</th>
                                            <th>Password</th>
                                            <th>Alamat</th>
                                            <th>Nomor telepon</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pengguna.map((pengguna: PenggunaType) => (
                                          <tr key={pengguna.id_user}>
                                            <td>{pengguna.id_user}</td>
                                            <td>{pengguna.nama_user}</td>
                                            <td>{pengguna.password_login}</td>
                                            <td>{pengguna.alamat}</td>
                                            <td>{pengguna.no_telp}</td>
                                            <td><button className="bg-green-400 text-white text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:bg-green-800">Edit</button>
                                                <button className="bg-red-400 text-white text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:bg-red-800">Hapus</button></td>
                                          </tr>
                    )}
                                    </tbody>
                                </table>
                            </div>
                    )}
                </div>
            {/* </ContentCard> */}
        )
        {/* </MainLayout> */}
    )
}