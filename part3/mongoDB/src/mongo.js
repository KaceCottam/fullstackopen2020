const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_PASS = process.env.MONGODB_PASS
const URL = `mongodb+srv://kaceac1:${MONGODB_PASS}@cluster0-eanc8.mongodb.net/peron-api?retryWrites=true&w=majority`

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  const name = process.argv[2]
  const number = process.argv[3]
  console.log(process.argv)

  const person = new Person({ name, number })

  person.save().then(_ => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })

} else {
  console.log('phonebook:')
  Person
    .find({})
    .then(persons => persons.forEach(p => {
      console.log(`${p.name} ${p.number}`)
      mongoose.connection.close()
    }))
}
