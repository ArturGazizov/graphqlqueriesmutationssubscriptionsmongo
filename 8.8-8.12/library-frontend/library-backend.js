const { ApolloServer, gql } = require('apollo-server')

const { v1  } = require('uuid'); // For version 5


let editables = [{titled:'q',publisheded:11}]



let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    published: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    published: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    published: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]





let antibooks = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]



let antiantibooks = [
  {
    name: 'Clean Code',
    published: 2008,
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Agile software development',
    published: 2002,
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Refactoring, edition 2',
    published: 2018,
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Refactoring to patterns',
    published: 2008,
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
  },  
  {
    name: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Crime and punishment',
    published: 1866,
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'The Demon ',
    published: 1872,
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
  },
]


const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String,author:String): [Book!]!
    allAntibooks(genre: String,author:String): [Antibook!]!
    allAntiantibooks: [Antiantibook!]!
    allAuthors: [Author!]!
    allEditables: [Editable!]!
  }

  type Book {
    title: String
    published: Int
    author: String
    id: String!
    genres: [String]
}

  type Antibook {
    title: String
    published: Int
    author: String
    id: String!
    genres: [String]
}

type Antiantibook {
    name: String
    published: Int
    id: String!
}


  type Author {
    name: String!
    id: String!
    published: Int
    booksCount: Int
}



  type Editable {
    titled: String!
    publisheded: Int
}



type Mutation {
  addBook(
    title: String
    published: Int
    author: String
    genres: [String]
  ): Book

  editBook(
    title: String
    published: Int
  ): Book


    editAntibook(
    title: String
    published: Int
  ): Antibook


      editAntiantibook(
    name: String
    published: Int
  ): Antiantibook

  editEditable(
    titled: String
    publisheded: Int
  ): Editable

  editAuthor(
    name: String!
    published: Int
  ): Author
}
`


/*

editAuthor(
    name: String!
    setpublishedTo: Int!
  ): Author
}
*/

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {let thebooks=args.author? books.filter(b=>b.author==args.author) : books;return args.genre? thebooks.filter(b=>b.genres.includes(args.genre)) : thebooks},
    allAntibooks: (root, args) => {let thebooks=args.author? antibooks.filter(b=>b.author==args.author) : antibooks;return args.genre? thebooks.filter(b=>b.genres.includes(args.genre)) : thebooks},
    allAntiantibooks:() =>antiantibooks,
    allAuthors: () => authors,
    allEditables: () => editables,
  },
  Author: {    

    booksCount: (root) => 
{      
        return           books.filter(p=>p.author==root.name).length         }  }

,
Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: v1()}
      books = books.concat(book)
      if (!(authors.find(f=>f.name==book.author)))
        authors = authors.concat({'name':book.author, id: v1()})
      return book
    }

    
,
  editAuthor: (root, args) => {
    const person = authors.find(p => p.name === args.name)
    if (!person) {
      return null
    }


    const updatedPerson = { ...person, published: args.published }
    //const updatedPerson = { ...person, published: args.setpublishedTo }
    authors = authors.map(p => p.name === args.name ? updatedPerson : p)
    return updatedPerson
  }  

,
  editBook: (root, args) => {
    const b = books.find(p => p.title === args.title)
    if (!b) {
      return null
    }


    const updatedb = { ...b, published: args.published }
    //const updatedPerson = { ...person, published: args.setpublishedTo }
    books = books.map(p => p.title === args.title ? updatedb : p)
    return updatedb
  }  
,
  editAntibook: (root, args) => {
    const b = antibooks.find(p => p.title === args.title)
    if (!b) {
      return null
    }


    const updatedb = { ...b, published: args.published }
    //const updatedPerson = { ...person, published: args.setpublishedTo }
    antibooks = antibooks.map(p => p.title === args.title ? updatedb : p)
    return updatedb
  }
  ,
 editAntiantibook: (root, args) => {
    const b = antiantibooks.find(p => p.name === args.name)
    if (!b) {
      return null
    }


    const updatedb = { ...b, published: args.published }
    //const updatedPerson = { ...person, published: args.setpublishedTo }
    antiantibooks = antiantibooks.map(p => p.name === args.name ? updatedb : p)
    return updatedb
  }
  ,


editEditable: (root, args) => {
    const b = editables.find(p => p.titled === args.titled)
    if (!b) {
      return null
    }


    const updatedb = { ...b, publisheded: args.publisheded }
    //const updatedPerson = { ...person, published: args.setpublishedTo }
    editables = editables.map(p => p.titled === args.titled ? updatedb : p)
    return updatedb
  }  



  }



}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})