import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App.tsx"
import Dashboard from "./pages/Dashboard.tsx"
import ErrorPage from "./pages/ErrorPage.tsx"
import LoginPage from "./pages/LoginPage.tsx"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>,
    errorElement: <ErrorPage/>
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
