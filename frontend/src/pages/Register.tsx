import { useState } from "react";

export default function Register() {
  const [inputNama, setNama] = useState("");
  const [inputTelp, setTelp] = useState("");
  const [inputAlamat, setAlamat] = useState("");
  const [inputPassword, setPassword] = useState("");
  const [inputConfirmPw, setConfirmPw] = useState("");

  const submitHandler = () => {};

  return (
    <div className="items-center flex flex-col bg-gray-900 w-screen h-screen">
      <h1 className="text-white font-bold mt-10 text-3xl">Buat Akun</h1>
      <div className="flex flex-col mt-8 w-[300px]">
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
          onClick={() => submitHandler()}
          className="bg-red-700 text-white text-lg mt-[18px] py-[6px] rounded-full hover:cursor-pointer hover:bg-red-800"
        >
          Buat Akun
        </button>
      </div>
    </div>
  );
}

const inputStyle =
  "border-2 border-gray-400 rounded-full p-[8px] my-[6px] px-[35px] focus:border-red-700 focus:outline-none";
