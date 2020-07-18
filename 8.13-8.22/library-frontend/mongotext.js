

const Author = require('./models/authors')
const Book = require('./models/books')
const User = require('./models/user')

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

let conditions=new Object()

genre=null
author ='mer'

if (author){conditions.author=author}
if (genre){conditions.genres={  $eq:genre  }}

Author.find(conditions).then((r)=>console.log(r))

//const newauthor = new Author({'name':"book.author"})
//newauthor.save().then(Author.find().then((r)=>console.log(r)))

Author.deleteMany({})
Book.deleteMany({})
//Book.deleteOne({title: 'Pimeyden tango'});Book.deleteOne({});Book.deleteOne({});Book.deleteOne({});Book.deleteOne({});Book.deleteOne({});Book.deleteOne({});
//Author.deleteOne({});Author.deleteOne({});Author.deleteOne({});Author.deleteOne({});Author.deleteOne({});Author.deleteOne({});Author.deleteOne({});

/**/
Author.remove({}).then(()=>Book.remove({}).then(()=>{

Author.find({}).then((r)=>console.log(r))
Book.find({}).then((r)=>console.log(r))

}))




Author.find({}).then((r)=>console.log(r))
Book.find({}).then((r)=>console.log(r))


Book.remove({})
Author.remove()
Book.remove()
Author.deleteMany()
Book.deleteMany()

Author.find().remove({})
Book.find().remove({})
Author.find().deleteMany({})
Book.find().deleteMany({})

Author.find({}).remove({})
Book.find({}).remove({})
Author.find({}).deleteMany({})
Book.findOne({username:'Pimeyden tango'}).then((r)=>r.favoriteGenre)


