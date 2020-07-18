import React, { useState } from 'react'



  import { ME,CREATE_BOOK,ALL_PERSONS,ALL_BOOKS ,EDIT_BOOK,EDIT_ANTIANTIBOOK,EDIT_ANTIBOOK,EDIT_AUTHOR} from '../queries'
  import { gql, useMutation ,useQuery} from '@apollo/client';

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])


const result2 = useQuery(ME)

  const [ createBook ] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      props.notify(error.message)
    }

    ,
    update: (store, response) => {

      console.log('-->', response.data.addBook)

      let dataInStore = store.readQuery({ query: ALL_BOOKS ,variables:{genre:result2.data.me.favoriteGenre}})
      
      store.writeQuery({
        query: ALL_BOOKS,
        data: {...dataInStore,allBooks:dataInStore.allBooks.concat(response.data.addBook)}
      })




let dataInStore2 = store.readQuery({ query: ALL_BOOKS ,variables:{genre:result2.data.me.favoriteGenre}})
      
      store.writeQuery({
        query: ALL_BOOKS,
        data: response.data.addBook.genres.includes(result2.data.me.favoriteGenre)?{allBooks:dataInStore2.allBooks.concat(response.data.addBook)}:{allBooks:dataInStore2.allBooks},
      variables:{genre:result2.data.me.favoriteGenre}
      })
      
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('add book...')

    try{
    createBook({  variables: { title, author, published:parseInt(published), genres } }
      , {    refetchQueries: [ { query: ALL_BOOKS } ,{ query: ALL_PERSONS}]  })

} catch (error) {
       {
        console.log(error)
      }
      }

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook