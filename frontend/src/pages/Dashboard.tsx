import StoreIcon from "@mui/icons-material/Store"
import AccountCircle from "@mui/icons-material/AccountCircle"
import { useEffect, useState } from "react"
import useRequireAuth from "../hooks/useRequireAuth"
import Table from "../components/Table"


export default function Dashboard() {
  // Cek apakah user sudah login atau belum
  useEffect(() => {
    useRequireAuth()
  }, [])

  // Store the state of the dropdown
  const [showDropDown, setShowDropdown] = useState(false)

  const renderDropdown = () => {

    // Style
    const dropDownTextStyle = "text-black text-xl px-[24px] py-[16px] hover:cursor-pointer hover:font-semibold"

    // Render the dropdown
    return (
      <div className="absolute right-[24px] top-[72px] bg-white shadow-lg rounded-xl w-[200px]">
        <h1 className={dropDownTextStyle}>Admin</h1>
        <div className="w-full h-[2px] bg-gray-500"/>
        <h2 className={dropDownTextStyle}>Logout</h2>
      </div>
    )
  }

  if(useRequireAuth())
    return (
      <div className="flex flex-row min-h-screen w-screen">

        {/* Sidebar */}
        <div className="bg-gray-900 flex-[1] h-screen p-[24px]">

          {/* Title */}
          <div className="flex-row flex justify-center items-stretch">
            <StoreIcon className="text-white text-5xl mx-[8px]"/>
            <h1 className="text-2xl text-white mb-[12px] font-extrabold">Warung Maem</h1>
          </div>

          {/* Nav Buttons */}
          <h2 className={sideBarButtonStyle}>Dashboard</h2>
          <h2 className={sideBarButtonStyle}>Data User</h2>
          <h2 className={sideBarButtonStyle}>Data Penjualan</h2>
        </div>

        {/* Main Container */}
        <div className="bg-gray-900 flex-[7]">

          {/* Top Bar */}
          <div className="h-[72px] w-full flex flex-row-reverse items-center justify-between px-[24px]">
            
            {/* Profile */}
            <AccountCircle className="text-white" onClick={() => setShowDropdown(!showDropDown)}/>
            { showDropDown && renderDropdown() }

          </div>

          {/* Content */}
          <div className="bg-red-600 flex flex-col flex-1 h-screen rounded-tl-xl">
            <h1 className="text-4xl text-white font-semibold font p-[30px]">Selamat datang, Admin!</h1>
            <Table/>
          </div>
        </div>
      </div>
    )
}

const sideBarButtonStyle = "text-xl text-white py-[3px] ml-[12px] hover:py-[4px] hover:font-semibold cursor-pointer"
