const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

morgan.token('data', (req, _) => req.body !== {}
  ? JSON.stringify(req.body) : '')

const PORT = Number(process.env.PORT) + 1 || 4000

const app = express()
app.use(express.static(path.resolve(__dirname, '../react-ui/build')))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] -' +
  ' :response-time ms :data'))
app.use(cors())

let persons = []

const verifyId = (req, res, next) => {
  if(req.body.id && persons.find(p => p.id === req.body.id)) {
    return res.status(400).json({ error: "ID already exists!" })
  }

  return next()
}

app.use(verifyId)

const generateId = () => {
  const id = Math.floor(Math.random() * 1000000)
  if (persons.find(p => p.id === id)) {
    return generateId()
  }
  return id;
}


app.get('/persons/', (_, res) => {
  return res.json(persons)
})

app.get('/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  const person = persons.find(p => p.id === id)

  if (!person) {
    return res.status(404).json({ error: "Person not found!" })
  }

  return res.json(person)
})

app.get('/info/', (_, res) => {
  return res.send(`<p>Phonebook has info for ${persons.length} people.</p>
    <p>${new Date()}</p>`)
})

app.post('/persons/', (req, res) => {
  const { name, number, id } = req.body

  if (!name || !number) {
    return res.status(404).json({ error: 'Missing content!' })
  }

  if (persons.find(p => p.name === name)) {
    return res.status(400).json(
      { error: 'A person with that name already exists!' })
  }

  const person = { name: name, number: number, id: id || generateId() }

  persons = persons.concat(person)
  return res.status(201).json(person)
})

app.delete('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  return res.status(204).end()
})

app.put('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = req.body

  persons = persons.map(p => p.id === id ? person : p)
  res.status(201).json(person)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`)
})
