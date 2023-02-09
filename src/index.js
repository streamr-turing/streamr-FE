import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import './_index.scss'
import App from './Components/App/App'
import UserProvider from './Providers/UserContext'

const client = new ApolloClient({
  uri: 'https://4ba90cf0-b11c-46cd-a0df-d5628d4b675e.mock.pstmn.io/graphql/show-details',
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <UserProvider>
        <App />
      </UserProvider>
    </ApolloProvider>
  </BrowserRouter>
)
