import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { useState } from "react"


type FormInputPropsType = {
  label: string,
  value: string,
  setValue?: (value: string) => void,
  isPassword?: boolean
  isVisible?: boolean
  setIsVisible?: (value: boolean) => void
  disabled?: boolean
}


export default function Form ({ label, value, setValue=()=>{}, isPassword=false, isVisible=false, setIsVisible, disabled=false }: FormInputPropsType) {

  // Utk menentukan apakah kolom inputan sedang diklik; utk keperluan styling
  const [isFocused, setIsFocused] = useState<boolean>(false)

  // Render komponen form-nya
  return (
    
    /* Container inputan */
    <div className="flex flex-col justify-start w-full}">

      {/* Text label */}
      <p className="w-fit">{label}</p>
      
      <div className={`flex flex-row items-center border rounded-md px-[12px] py-[4px] gap-[8px] ${isFocused ? "border-red-500" : "border-gray-300"} ${disabled && "bg-gray-200"}`}>

        {/* Kolom inputan */}
        <input
          type={isPassword && !isVisible ? "password" : "text"}
          value={value}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={e => setValue(e.target.value)}
          className={`w-full focus:outline-none ${disabled && "text-gray-600"} ${disabled && "hover:cursor-not-allowed"}`}/>

        {/* Tombol hide/show password */}
        { setIsVisible && (isVisible
          ? <VisibilityOffIcon onClick={() => setIsVisible(false)} className="text-black hover:cursor-pointer hover:text-gray-500"/>
          : <VisibilityIcon onClick={() => setIsVisible(true)} className="text-black hover:cursor-pointer hover:text-gray-500"/>
        )}
      </div>

      { disabled &&
        <p className="mt-[4px] text-sm text-left text-gray-400">
          {label} tidak dapat diganti.
        </p>
      }

    </div>
  )
}