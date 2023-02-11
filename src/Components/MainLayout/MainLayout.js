import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { RecModalContext } from '../../Providers/RecModalContext'

import './_MainLayout.scss'

import NavBar from '../NavBar/NavBar'
import Header from '../Header/Header'
import RecModal from '../RecModal/RecModal'

const MainLayout = () => {

  const  { currentModal } = useContext(RecModalContext)

  return (

    <div className='main-layout'>
      <NavBar />
      <div className='header-page-section'>
      <Header />
      <Outlet />
      {currentModal.openModal && <RecModal />}
      </div>
    </div>
  )
}

export default MainLayout