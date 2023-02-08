import { Outlet } from 'react-router-dom'
import { useState } from 'react'

import './_MainLayout.scss'

import NavBar from '../NavBar/NavBar'
import Header from '../Header/Header'

const MainLayout = () => {

  // const [clicked, setClicked] = useState('home')



  return (
    <>
      <NavBar 
        // username={username}
        // avatarUrl={avatarUrl} 
        // setClicked={setClicked} 
        // clicked={clicked} 
      />
      <Header />
      <h1>Main Layout</h1>
      <Outlet />
    </>
  )
}

export default MainLayout