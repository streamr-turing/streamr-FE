import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { RecModalContext } from '../../Providers/RecModalContext'
import { UserContext } from '../../Providers/UserContext'

import './_MainLayout.scss'

import NavBar from '../NavBar/NavBar'
import Header from '../Header/Header'
import RecModal from '../RecModal/RecModal'

const MainLayout = () => {

  const  { currentModal } = useContext(RecModalContext)
  const { currentUser } = useContext(UserContext)

  return (

    <div className='main-layout'>
      {!currentUser &&
        <Navigate to="/login" />
      }
      {currentUser &&
        <>
          <NavBar />
          <div className='header-page-section'>
            <Header />
            <Outlet />
            {currentModal.openModal && <RecModal />}
          </div>
        </>
      }
    </div>
  )
}

export default MainLayout