const { ApolloServer, UserInputError,gql,GraphQLObjectType,GraphQLString } = require('apollo-server')
var graphql = require('graphql');



const jwt = require('jsonwebtoken')


const Author = require('./models/authors')
const Book = require('./models/books')
const User = require('./models/user')


const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const makeobject = value => {
  return value
};



const anobject = new graphql.GraphQLObjectType({
  name: "anobject",
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of the person.',
    },
    _id :{
      type: GraphQLString,
      description: 'The id of the person.',
    }
  })
});


const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url =
  'mongodb+srv://missismama:'+process.env.password+'@cluster0-wcm2d.gcp.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })






const { v1  } = require('uuid'); // For version 5


let editables = [{titled:'q',publisheded:11}]






const typeDefs = gql`

scalar anobject


type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String,author:String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Book {
    title: String
    published: Int
    author: anobject
    id: String!
    genres: [String]
}



  type Author {
    name: String!
    id: String!
    born: Int
    booksCount: Int
}






type Mutation {
  addBook(
    title: String
    published: Int
    author: String
    genres: [String]
  ): Book

  addAuthor(
    name: String
    born: Int
  ): Book

  editBook(
    title: String
    published: Int
  ): Book


  editAuthor(
    name: String!
    born: Int
  ): Author



createUser(
    username: String!
    favoriteGenre: String!
  ): User
login(
    username: String!
    password: String!
  ): Token


}


`


const resolvers = {
   anobject: anobject,
  Query: {
bookCount: () => Book.collection.countDocuments(),
me: (root, args, context) => {

/*context.currentUser.id=context.currentUser._id
delete context.currentUser._id or delete context.currentUser._id*/
//not needed, do not change anything

  return context.currentUser},


//allBooks: (root, args) => {let thebooks=args.author? books.filter(b=>b.author==args.author) : books;return args.genre? thebooks.filter(b=>b.genres.includes(args.genre)) : thebooks},


allBooks: (root, args) => {
      // filters missing
let conditions=new Object()


if (args.author)
if (args.author.match(/^[0-9a-fA-F]{24}$/))
conditions.author=args.author
if (args.genre){conditions.genres={  $eq:args.genre  }}

      return Book.find(conditions).populate('author')
    },




authorCount: () => Author.collection.countDocuments(),
allAuthors: () => {
      return Author.find({})
    },
  }
,
User:
{

  id: (root)=>{return root._id}
}
,
  Author: {    

    booksCount: (root) => 
{      



        return           Book.find({author:root._id}).count()        }  }

,
Mutation: {

  createUser: (root, args) => {
    const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

    return user.save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
  },

  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })

    if ( !user || args.password !== 'secred' ) {
      throw new UserInputError("wrong credentials")
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    return { value: jwt.sign(userForToken, JWT_SECRET) }
  },

    addBook: async (root, args, context) => { 

const currentUser = context.currentUser

    if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }
     
const book = new Book({ title:args.title,published:args.published,genres:args.genres  })


      try {
         

         let thecount= await Author.find({'name':args.author}).count()
        if (!(thecount))
            {
              const newauthor = new Author({'name':args.author})
            await newauthor.save()



            book.author=newauthor
            
          }else
          {book.author=await Author.findOne({'name':args.author})}
            await book.save()

      } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
      }

      return book
    },
    addAuthor: async (root, args, context) => { 


const currentUser = context.currentUser

    if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }

      const author = new Author({ ...args })


      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },




editAuthor: async (root, args, context) => {

const currentUser = context.currentUser

    if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }

      const author = await Author.findOne({ name: args.name })
      author.born = args.born

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
editBook: async (root, args, context) => {

const currentUser = context.currentUser

    if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }

      const book = await Book.findOne({ title: args.title })
      book.published=args.published
      book.author=args.author
      book.genres=args.genres


      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },


  



  }



}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {   
   const auth = req ? req.headers.authorization : null    
   if (auth && auth.toLowerCase().startsWith('bearer ')) 
    {      const decodedToken = jwt.verify(        auth.substring(7), JWT_SECRET      )      
      const currentUser = await User.findById(decodedToken.id)      
      return { currentUser }    }  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})