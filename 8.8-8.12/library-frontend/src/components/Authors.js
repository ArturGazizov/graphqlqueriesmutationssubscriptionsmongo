  import React, { useState ,Component} from 'react'

  import { ALL_BOOKS,ALL_PERSONS,EDIT_AUTHOR } from '../queries'
  import { gql, useQuery,useMutation } from '@apollo/client';



import Select from 'react-select'





const Authors = (props) => {

const [name, setAuthor] = useState('')
const [born, setBorn] = useState('')

const [ editAuthor ] = useMutation(EDIT_AUTHOR)



const submit = async (event) => {
    event.preventDefault()
    /*
    editAuthor({ variables: { name
      , "setBornTo":parseInt(born) } 
    }, 
      {    refetchQueries: [ { query: ALL_BOOKS } ,{ query: ALL_PERSONS}]  })
*/

console.log(typeof(parseInt(born)))
editAuthor({ variables: { "published":parseInt(born),'name':name
    }}, {    refetchQueries: [ { query: ALL_BOOKS } ,{ query: ALL_PERSONS}]  })

    setAuthor('')
    setBorn('')
  }

const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000  })

  if (!props.show) {
    return null
  }


 if (result.loading)  {
    return <div>loading...</div>
  }




  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          
            
            {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.published}</td>
              <td>{a.booksCount}</td>
            </tr>
          )}
        </tbody>
      </table>

author<Select onChange={(event)=>setAuthor(event.value)} options={result.data.allAuthors.map((p)=>{return{value:p.name,label:p.name}})} />
<form onSubmit={submit}>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        <button type='submit'>change birth date</button>
</form>






    </div>
  )
}

export default Authors
