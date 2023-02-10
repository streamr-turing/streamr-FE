import { Route, Routes } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../../Providers/UserContext'
import { RecModalContext } from '../../Providers/RecModalContext'

import LoginPage from '../LoginPage/LoginPage'
import MainLayout from '../MainLayout/MainLayout'
import HomePage from '../HomePage/HomePage'
import WatchlistPage from '../WatchlistPage/WatchlistPage'
import DetailsPage from '../DetailsPage/DetailsPage'
import PageNotFound from '../PageNotFound/PageNotFound'

function App() {
  const { currentUser, addToWatchList, removeFromWatchList } = useContext(UserContext)
  // const [openModal, setOpenModal] = useState(false)
  const  { openModal, changeModalState } = useContext(RecModalContext)

  const handleClick = (clickType) => {

    if (clickType === "add") {
      console.log("Added!")
      addToWatchList({
        tmbdId: 1,
        name: 'Finding Nemo'
      })
    }
    else if (clickType === 'delete'){
      console.log('Deleted!')
      removeFromWatchList(1)
    }
  }


  return (
    <>
      {/* <button onClick={() => handleClick("add")}>ADD</button>
      <button onClick={() => handleClick("delete")}>DELETE</button> */}
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<MainLayout />} >
          <Route path='/' element={<HomePage />} />
          <Route path='/watchlist' element={<WatchlistPage />} />
          <Route path='/show/:id' element={<DetailsPage />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
