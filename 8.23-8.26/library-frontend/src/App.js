
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/client'
import LoginForm from './components/LoginForm'



  import {BOOK_ADDED,ME,ALL_BOOKS} from './queries'




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
const result2 = useQuery(ME)

  const client = useApolloClient()


const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }




  const [page, setPage] = useState('authors')



const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }  


let dataInStore2 = client.readQuery({ query: ALL_BOOKS ,variables:{genre:result2.data.me.favoriteGenre}})
      if (!includedIn(dataInStore2.allBooks, addedBook))
      client.writeQuery({
        query: ALL_BOOKS,
        data: addedBook.genres.includes(result2.data.me.favoriteGenre)?{allBooks:dataInStore2.allBooks.concat(addedBook)}:{allBooks:dataInStore2.allBooks},
      variables:{genre:result2.data.me.favoriteGenre}
      })


  }




useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      console.log("subscriptionData")


const addedBook = subscriptionData.data.bookAdded
notify(`${addedBook.title} added`)

updateCacheWith(addedBook)

    }
  })


const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  



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