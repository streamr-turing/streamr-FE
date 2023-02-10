import { Outlet } from 'react-router-dom'

import './_MainLayout.scss'

import NavBar from '../NavBar/NavBar'
import Header from '../Header/Header'
import RecModal from '../RecModal/RecModal'

const MainLayout = () => {

  return (

    <div className='main-layout'>
      <NavBar />
      <div className='header-page-section'>
      <Header />
      <Outlet />
      {openModal && <RecModal />}
      </div>
    </div>
  )
}

export default MainLayout