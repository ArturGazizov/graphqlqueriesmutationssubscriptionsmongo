import React, { useState ,Component}  from 'react'
import { useEffect } from 'react'

  import { ALL_BOOKS ,ME} from '../queries'
  import { gql, useQuery } from '@apollo/client';


const Books = (props) => {



const result2 = useQuery(ME)



  const [thefilter, setThefilter] = useState('')

useEffect(() => {

setThefilter(result2.loading?'':result2.data.me.favoriteGenre)

}, [result2.data])

const result = useQuery(ALL_BOOKS, {
    //pollInterval: 2000  
  })

  if (!props.show) {
    return null
  }


 if (result.loading)  {
    return <div>loading...</div>
}


 if (result2.loading)  {
    return <div>loading...</div>
}



let genres=[]
  result.data.allBooks.map(a=>{genres=genres.concat(a.genres)})
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
genres=genres.filter( onlyUnique );


  let books=result.data.allBooks


  return (
    <div>
      <h2>booksw</h2>

genres <button styles={{'color':'red'}} onClick={()=>setThefilter('')}>all</button> {genres.map((g)=><button onClick={()=>setThefilter(g)}>{g}</button>)}

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
          {thefilter.length?books.filter((it)=>it.genres.includes(thefilter)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ):books.map(a =>
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

export default Books