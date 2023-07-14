import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../env";
import { redButtonStyleFull } from "../styles";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [inputNama, setNama] = useState("");
  const [inputId, setId] = useState("");
  const [inputTelp, setTelp] = useState("");
  const [inputAlamat, setAlamat] = useState("");
  const [inputPassword, setPassword] = useState("");
  const [inputConfirmPw, setConfirmPw] = useState("");

  
  /**
   * Handler ketika user menekan tombol "Masuk"
   */
  const registerHandler = async() => {

    // Masukkan data dari form register ke database
    await axios.post(`${API_URL}/user`, {
      id_user: inputId,
      nama_user: inputNama,
      password_login: inputPassword,
      alamat: inputAlamat,
      no_telp: inputTelp,
    })

    // Jika berhasil, redirect user ke halaman login
    .then((res) => {
      alert("Berhasil membuat akun!")
      navigate("/login")
    })

    // Jika terjadi error, tampilkan error
    .catch((err: any) => {
      console.log(err)
      alert(err)
    })
  }  

  return (
    <div 
    style={{ backgroundImage: "url(https://img.freepik.com/free-photo/healthy-breakfast-black-wooden-background-top-view-free-space-your-text_24972-410.jpg?w=1060)" }}
    className="bg-black bg-cover bg-no-repeat justify-center items-center flex flex-row bg-gray-900 w-screen h-screen">
      <div className="flex flex-col flex-1 mx-[400px] ml-[100px]">
        <h1 className="text-white font-bold text-3xl">Buat Akun</h1>
        <input
          type="text"
          placeholder="ID User"
          onChange={(e) => setId(e.target.value)}
          className={inputStyle}
        />
        <input
          type="text"
          placeholder="Nama lengkap"
          onChange={(e) => setNama(e.target.value)}
          className={inputStyle}
        />
        <input
          type="number"
          placeholder="No.telp"
          onChange={(e) => setTelp(e.target.value)}
          className={inputStyle}
        />
        <input
          type="text"
          placeholder="Alamat"
          onChange={(e) => setAlamat(e.target.value)}
          className={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className={inputStyle}
        />
        <input
          type="password"
          placeholder="Konfirmasi Password"
          onChange={(e) => setConfirmPw(e.target.value)}
          className={inputStyle}
        />
        <button 
          onClick={() => registerHandler()}
          className={`${redButtonStyleFull}`}>Buat Akun</button>
    
      </div>
      <div className="flex-1"/>
    </div>
  );
}

const inputStyle =
  "border-2 border-gray-400 rounded-full p-[8px] my-[6px] px-[35px] focus:border-red-700 focus:outline-none";
