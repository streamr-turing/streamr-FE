import { Outlet } from 'react-router-dom'
import { useState } from 'react'

import './_MainLayout.scss'

import NavBar from '../NavBar/NavBar'
import Header from '../Header/Header'

const MainLayout = () => {

  // const [clicked, setClicked] = useState('home')



  return (
    <div className='main-layout'>
      <NavBar 
        // username={username}
        // avatarUrl={avatarUrl} 
        // setClicked={setClicked} 
        // clicked={clicked} 
      />
      <div className='header-page-section'>
      <Header />
      <Outlet />
      </div>
    </div>
  )
}

export default MainLayout