import { ReactNode, useEffect } from "react"
import TopNavbar from "./TopNavBar"
import backgroundImage from "../assets/background-home.jpg"
import SideBar from "./SideBar"
import { useAppDispatch, useAppSelector } from "../store"
import { hideSideBar, lightenBackground } from "../store/slices/sideBarSlice"


type MainLayoutProps = {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const sideBarIsShown = useAppSelector(state => state.sideBar.isShown)
  const backgroundIsDark = useAppSelector(state => state.sideBar.isBackgroundDarkened)
  const dispatch = useAppDispatch()

  // Utk animasi sidebar dan efek gelap saat sidebar muncul
  useEffect(() => {
    setTimeout(() => {
      dispatch(lightenBackground())

      setTimeout(() => {
        dispatch(hideSideBar())
      }, 300)
    }, 100)
  }, [])

  
  return (
    <div 
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="fixed flex flex-col items-center w-screen h-screen overflow-y-scroll bg-cover bg-stone-200 bg-blend-multiply">
      
      <TopNavbar/>
      <SideBar/>
      
      { sideBarIsShown && 
        <div
          onClick={() => {
            dispatch(lightenBackground())
            
            setTimeout(() => {
              dispatch(hideSideBar())
            }, 300)
          }}
          className={`flex flex-row fixed items-center justify-center w-screen h-screen z-10 bg-black transition-all duration-300 ease-in-out ${backgroundIsDark ? "bg-opacity-60 backdrop-blur-md" : "bg-opacity-0 backdrop-blur-0"}`}/>
      }

      {/* Utk nampung apapun yg dijepit di dalem <>...</> */}
      <div className="pt-[100px] pb-[60px]">
        {children}
      </div>

    </div>
  )
}