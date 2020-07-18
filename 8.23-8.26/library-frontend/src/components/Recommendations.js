import React, { useState ,Component}  from 'react'
import { useEffect } from 'react'

  import { ALL_BOOKS ,ME} from '../queries'
  import { gql, useQuery } from '@apollo/client';


const Recommendations = (props) => {



const result2 = useQuery(ME)



  const [genre, setThegenre] = useState('')

useEffect(() => {

setThegenre(result2.loading?'':result2.data.me.favoriteGenre)

}, [result2.data])





const result = useQuery(ALL_BOOKS, {
    //pollInterval: 2000 ,

    variables:{genre}

     })



useEffect(() => {

console.log(result.data)

}, [result.data])




  if (!props.show) {
    return null
  }


 if (result.loading)  {
    return <div>loading...</div>
}


 if (result2.loading)  {
    return <div>loading...</div>
}


  let books=result.data.allBooks


  return (
    <div>
      <h2>Recommendations on genre:{genre}</h2>
   <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations