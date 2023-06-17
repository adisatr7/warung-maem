export default function useRequireAuth() {
  const isLoggedIn = sessionStorage.getItem("activeUser")
  
  if (!isLoggedIn)
    window.location.href = "/"

  return isLoggedIn
}
