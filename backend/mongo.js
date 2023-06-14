
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://nikokeurulainen:${password}@phonecluster.scckjev.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

// We define the documents schema / shape before storing it
const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

// event handler to save the object. Result of the save is in result parameter
if (person.name) {person.save().then(result => {
    console.log("entry saved")
    mongoose.connection.close()
    })}
    // if no name is given, list all Person objects from the database
else {Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
  })}