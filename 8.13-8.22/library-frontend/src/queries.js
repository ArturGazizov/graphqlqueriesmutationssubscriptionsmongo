import { gql  } from '@apollo/client'




export const ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}`



export const ALL_PERSONS = gql`
query {
  allAuthors {
    name
    born
    booksCount
  }
}`


export const ALL_BOOKS = gql`
query allBooks($genre:String){
  allBooks(genre:$genre) {
    title 
    author
    published 
    genres
  }
}`



export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    published
    id
    genres
  }
}
`






export const CREATE_AUTHOR = gql`
mutation createBook($name: String!, $born: Int) {
  addBook(
    name: $name,
    born: $born
  ) {
    name
    born
    id
  }
}
`




export const EDIT_BOOK = gql`
  mutation editBook($title: String!,$published: Int!)
  {
    editBook(title: $title, published: $published)  {
    title
    author
    published
    id
    genres
    }
  }
`












export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!,$born: Int!)
  {
    editAuthor(name: $name, born: $born)  {
      name
      born
      id
    }
  }
`



export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`









/*
query {
  bookCount
  authorCount
}



query {
  allBooks { 
    title 
    author
    published 
    genres
  }
}



query {
  allAuthors {
    name
    booksCount
  }
}



query {
  allBooks(author: "Robert Martin") {
    title
  }
}


query {
  allBooks(genre: "refactoring") {
    title
    author
  }
}






query {
  allBooks(author: "Robert Martin", genre: "refactoring") {
    title
    author
  }
}


query {
  allBooks{
    title
    author
  }
}

query {
  me {
    username
  }
}


mutation {
  addBook(
    title: "Pimeyden tango",
    author: "Reijo Mäki",
    published: 1997,
    genres: ["crime"]
  ) {
    title,
    author
  }
}

mutation {
  addAuthor(
    name: "Reijo Mäki",
    born: 1000
  ) {
    title,
    author
  }
}









# Write your query or mutation here
mutation {
  createUser(
    username: "Pimeyden tango",
   favoritegenre: "Reijo Mäki",
  ) {
    username,
    favoritegenre
  }
}




mutation {
  login(
    password: "secred",
    username: "Pimeyden tango",
  ) {
    value
  }
}


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBpbWV5ZGVuIHRhbmdvIiwiaWQiOiI1ZjExZDAwZDIwNTk1YzQ4NzNjNjdhOTEiLCJpYXQiOjE1OTUwMDMxNDl9.VyYFwvRvHLUustc6eRfxyAvNW0_sGcdaO01WPNIiNXY"
   

   {"Authorization":"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBpbWV5ZGVuIHRhbmdvIiwiaWQiOiI1ZjExZDAwZDIwNTk1YzQ4NzNjNjdhOTEiLCJpYXQiOjE1OTUwMDMxNDl9.VyYFwvRvHLUustc6eRfxyAvNW0_sGcdaO01WPNIiNXY"}












*/