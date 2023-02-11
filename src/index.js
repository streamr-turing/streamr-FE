import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import './_index.scss'
import App from './Components/App/App'
import UserProvider from './Providers/UserContext'
import RecModalProvider from './Providers/RecModalContext'

const client = new ApolloClient({
  uri: 'https://streamr-be.herokuapp.com/graphql',
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <RecModalProvider>
      <UserProvider>
        <App />
      </UserProvider>
      </RecModalProvider>
    </ApolloProvider>
  </BrowserRouter>
)
