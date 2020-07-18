import { gql  } from '@apollo/client'


export const ALL_PERSONS = gql`
query {
  allAuthors {
    name
    published
    booksCount
  }
}`


export const ALL_BOOKS = gql`
query {
  allBooks {
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






export const EDIT_ANTIBOOK = gql`
  mutation editAntibook($title: String!,$published: Int!)
  {
    editAntibook(title: $title, published: $published)  {
    title
    author
    published
    id
    genres
    }
  }
`



export const EDIT_ANTIANTIBOOK = gql`
  mutation editAntiantibook($name: String!,$published: Int!)
  {
    editAntiantibook(name: $name, published: $published)  {
    name
    id
    published
    }
  }
`







export const EDIT_EDITABLE = gql`
  mutation editEditable($titled: String!,$publisheded: String!)
  {
    editEditable(title: $titled, publisheded: 1234)  {
    titled
    publisheded
    }
  }
`



export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!,$published: Int!)
  {
    editAuthor(name: $name, published: $published)  {
      name
      published
      id
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
    bookCount
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








*/
