
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { useQuery, useApolloClient } from '@apollo/client'
import LoginForm from './components/LoginForm'

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}


const App = () => {
  const [page, setPage] = useState('authors')



const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  const client = useApolloClient()
  
const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }


 useEffect(() => {
    const token = localStorage.getItem('phonenumbers-user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])

const logout = () => {
    setToken(null)
    //localStorage.clear()
    localStorage.removeItem('phonenumbers-user-token');
    client.resetStore()
  }

if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }



  return (
    <div>
      <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout} >logout</button>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
      </div>

      <Authors notify={notify}
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Recommendations
      show={page === 'recommendations'}
      />

      <NewBook notify={notify}
        show={page === 'add'}
      />

    </div>
  )
}

export default App