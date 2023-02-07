import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../Providers/UserContext'

import LoginPage from '../LoginPage/LoginPage'
import MainLayout from '../MainLayout/MainLayout'
import HomePage from '../HomePage/HomePage'
import WatchlistPage from '../WatchlistPage/WatchlistPage'
import DetailsPage from '../DetailsPage/DetailsPage'

function App() {
  const { currentUser } = useContext(UserContext)

  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<MainLayout />} >
          <Route path='/' element={<HomePage />} />
          <Route path='/watchlist' element={<WatchlistPage />} />
          <Route path='/show/:id' element={<DetailsPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
