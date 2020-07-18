

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

//Author.find(conditions).then((r)=>console.log(r))

//const newauthor = new Author({'name':"book.author"})
//newauthor.save().then(Author.find().then((r)=>console.log(r)))


//Author.remove({}).then(()=>Book.remove({}).then(()=>{}))
/*
Author.find({}).then((r)=>console.log(r))
Book.find({}).then((r)=>console.log(r))
*/
/*

Book.aggregate([
   { $group: { _id: "$author", count: { $sum: 1 } } }
]).then(r=>console.log(r))

*/

/*
Book.aggregate([
   { $group: { _id: "$author", count: { $sum: 1 } } }
]).then(r=>console.log(r.map(it=>{return {...Author.findOne({_id:it._id}),authorCount:it.authorCount}})))

*/


Book.aggregate([
   { $group: { _id: "$author", count: { $sum: 1 } } }
]).then(r=>console.log(r))

Author.findOne({_id:"5f12495fb2b82252722b803b"}).then((t)=>console.log(t))
console.log('')
console.log('')

let promises=
Book.aggregate([
   { $group: { _id: "$author", count: { $sum: 1 } } }
]).then(r=>r.map((it)=>Author.findOne({_id:it._id}).then((c)=> ({name:c.name,_id:c._id,booksCount:it.count})
)))

promises.then((f)=>Promise.all(f).then(function(results) {
    console.log(results)
}))

console.log(promises)

/*
Promise.all(promises).then(function(results) {
    console.log(results)
})
*/
