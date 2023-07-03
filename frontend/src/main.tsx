import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App.tsx"
import Home from "./pages/Home.tsx"
import ErrorPage from "./pages/ErrorPage.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import Register from "./pages/Register.tsx"
import Transaksi from "./pages/Transaksi.tsx"
import { Provider } from "react-redux"
import { store } from "./store"



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/home",
    element: <Home/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/register",
    element: <Register/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/transaksi",
    element: <Transaksi/>,
    errorElement: <ErrorPage/>
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
