import { Route, Routes } from 'react-router-dom'

import LoginPage from '../LoginPage/LoginPage'
import MainLayout from '../MainLayout/MainLayout'
import HomePage from '../HomePage/HomePage'
import WatchListPage from '../WatchlistPage/WatchlistPage'
import DetailsPage from '../DetailsPage/DetailsPage'
import PageNotFound from '../PageNotFound/PageNotFound'
import SearchPage from '../SearchPage/SearchPage'
import NoSearchResults from '../NoSearchResults/NoSearchResults'
import Error from '../Error/Error'

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<MainLayout />} >
          <Route path='/' element={<HomePage />} />
          <Route path='/watchlist' element={<WatchListPage />} />
          <Route path='/show/:showId' element={<DetailsPage />} />
          <Route path='/search/:keyPhrase' element={<SearchPage />} />
          <Route path='/search/' element={<NoSearchResults />} />
          <Route path='/error' element={<Error />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
