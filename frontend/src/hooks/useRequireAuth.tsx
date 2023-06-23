/**
 * Mengecek apakah user sudah login atau belum
 * 
 * @returns User yang sudah login, jika ada. Jika tidak, paksa user ke halaman login
 */
export default function useRequireAuth() {
  const isLoggedIn = sessionStorage.getItem("activeUser")
  
  if (!isLoggedIn)
    window.location.href = "/"

  return isLoggedIn
}
