import { Outlet } from "react-router-dom"

import NavBar from '../NavBar/NavBar'
import Header from '../Header/Header'

const MainLayout = () => {

  return (
    <>
      <NavBar />
      <Header />
      <h1>Main Layout</h1>
      <Outlet />
    </>
  )
}

export default MainLayout