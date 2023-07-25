import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store"
import { hideSideBar, lightenBackground } from "../store/slices/sideBarSlice"
import CloseIcon from "@mui/icons-material/Close"


export default function SideBar() {
  const isShown = useAppSelector(state => state.sideBar.isShown)
  const backgroundIsDark = useAppSelector(state => state.sideBar.isBackgroundDarkened)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  /**
   * Handler untuk menutup sidebar
   */
  const handleCloseSideBar = () => {
    dispatch(lightenBackground())

    setTimeout(() => {
      dispatch(hideSideBar())
    }, 300)
  }

  
  /**
   * Handler untuk berpindah ke halaman Beranda
   */
  const handleGoToHome = () => {
    navigate("/home")
  }
  
  
  /**
   * Handler untuk berpindah ke halaman Pengguna
   */
  const handleGoToUser = () => {
    navigate("/pengguna")
  }
  
  /**
   * Handler untuk berpindah ke halaman Transaksi
   */
  const handleGoToTransaction = () => {
    navigate("/transaksi")
  }

  
  return (
    <div className={`flex flex-col h-screen w-fit  z-20 ${isShown && backgroundIsDark ? "translate-x-0" : "-translate-x-full" } left-0 bg-gradient-to-bl from-red-600 to-red-800 px-[22px] py-[18px] fixed transition-transform duration-500 text-white`}>

      <div className="flex flex-row items-center gap-[20px] mb-[12px]">
        {/* Logo */}
        <p className="text-3xl font-bold">
          Warung Maem
        </p>

        {/* Close button */}
        <button onClick={handleCloseSideBar}>
          <CloseIcon fontSize="medium" className="text-stone-300 hover:text-white"/>
        </button>
      </div>

      <button onClick={handleGoToHome} className={textStyle}>Beranda</button>
      <button onClick={handleGoToTransaction} className={textStyle}>Data Transaksi</button>
      <button onClick={handleGoToUser} className={textStyle}>Data Pengguna</button>
      {/* <button className={textStyle}></button> */}

    </div>
  )
}

const textStyle = "text-xl text-left rounded-md py-[4px] px-[8px] hover:bg-white hover:bg-opacity-[15%]"