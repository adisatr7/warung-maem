import { useAppDispatch, useAppSelector } from "../store"
import { setCart } from "../store/slices/cartSlice"
import { MakananType } from "../types"


type QtyInputProps = {
  cartIndex: number
}

export default function QtyInput({ cartIndex: index }: QtyInputProps) {
  const dispatch = useAppDispatch()
  const cart: MakananType[] = useAppSelector(state => state.cart.items)

  
  /**
   * Meng-handle tombol untuk mengurangi item dari keranjang belanja
   * 
   * @param index Index dari item yang akan dihapus dari keranjang belanja
   */
  const handleDecreaseQty = (index: number) => {
    const tempList: MakananType[] = [...cart]
    const selectedItem: MakananType = {...tempList[index]}

    // Jika qty dari item yg dipilih adalah undefined,  set qty ke 1
    if (selectedItem.qty === undefined)
      selectedItem.qty = 1

    selectedItem.qty! -= 1
    tempList[index] = selectedItem

    // Jika qty dari item yg dipilih adalah 0, hapus item dari keranjang belanja
    if (selectedItem.qty! <= 0)
      tempList.splice(index, 1)

    dispatch(setCart(tempList))
    sessionStorage.setItem("cart", JSON.stringify(tempList))
  }


  /**
   * Meng-handle tombol untuk mengurangi qty dari item di keranjang belanja
   * 
   * @param cartIndex Index dari item yang akan dihapus dari keranjang belanja
   */
  const handleIncreaseQty = (cartIndex: number) => {
    const tempList: MakananType[] = [...cart]
    const selectedItem: MakananType = {...tempList[cartIndex]}

    // Jika qty dari item yg dipilih adalah undefined,  set qty ke 1
    if (selectedItem.qty === undefined)
      selectedItem.qty = 1

    selectedItem.qty! += 1
    tempList[cartIndex] = selectedItem
    
    dispatch(setCart(tempList))
    sessionStorage.setItem("cart", JSON.stringify(tempList))
  }


  return (
    <div className="flex items-center ml-[20px]">
      
      {/* Tombol [-] */}
      <button 
        onClick={() => handleDecreaseQty(index)} 
        className={buttonStyle}>-</button>
      
      {/* Label qty */}
      <p className="mx-[10px]">{cart[index].qty}</p>

      {/* Tombol [+] */}
      <button 
        onClick={() => handleIncreaseQty(index)}
        className={buttonStyle}>+</button>
    </div>
  )
}

const buttonStyle = "bg-red-600 text-white w-[30px] h-[30px] rounded-md flex items-center justify-center hover:bg-red-500 hover:cursor-pointer"