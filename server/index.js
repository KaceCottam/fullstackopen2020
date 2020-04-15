require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const Person = require('./models/person')

morgan.token('data', (req, _) => req.body !== undefined
  ? JSON.stringify(req.body)
  : '')

const app = express()
app.use(express.static(path.resolve(__dirname, '../react-ui/build')))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] -' +
  ' :response-time ms :data'))
app.use(cors())

app.get('/persons/', (_, res) => {
  Person
    .find({})
    .then(persons => persons.map(p => p.toJSON()))
    .then(persons => res.json(persons))
})

app.get('/persons/:id', (req, res) => {
  Person
   .findById(req.params.id)
   .then(person => person.toJSON())
   .then(person => res.json(person))
})

app.get('/info/', (_, res) => {
  res.send(`<p>Phonebook has info for ${Person.length} people.</p>` +
    `<p>${new Date()}</p>`)
})

app.post('/persons/', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(404).json({ error: 'Missing content!' })
  }

  const person = new Person({ name, number })

  person
    .save()
    .then(person => person.toJSON())
    .then(person => res.status(201).json(person))
})

app.delete('/persons/:id', (req, res) => {
  const id = req.params.id

  Person
    .findByIdAndDelete(id)
    .then(_ => res.status(204).end())
})

app.put('/persons/:id', (req, res) => {
  const id = req.params.id
  const { name, number } = req.body

  Person
    .findByIdAndUpdate(id, { name, number })
    .then(person => person.toJSON())
    .then(person => res.status(201).json(person))
})

const PORT = Number(process.env.PORT) + 1 || 4000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`)
})
