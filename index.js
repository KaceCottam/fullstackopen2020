const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

const generateId = () => persons.length > 0
  ? Math.max(...persons.map(i => i.id)) + 1
  : 1

app.get('/', (req, res) => {
  res.send('')
})

app.get('/api/persons', (req, res) => {
  console.log(`GET /api/persons 200`)
  res.json(persons)
})

app.get('/info', (req, res) => {
  const numberPeople = persons.length
  const now = new Date()
  res.send(`<p>Phonebook has info for ${numberPeople} people.</p>`
         + `<p>${now}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    console.log(`GET /api/persons/${id} 200`)
    res.json(person)
  }
  else {
    console.log(`GET /api/persons/${id} 404 "id not found"`)
    res.status(404).json({ error: 'id not found' })
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    console.log(`DELETE /api/persons/${id} 204`)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
  } else {
    console.log(`DELETE /api/persons/${id} 404 "id not found"`)
    res.status(404).json({ error: 'id not found' })
  }
})

app.post(`/api/persons/`, (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    console.log(`POST /api/persons/ 404 "content missing"`)
    return res.status(404).json({ error: 'content missing' })
  }
  if (persons.find(p => p.name === body.name)) {
    console.log(`POST /api/persons/ 204 "name must be unique"`)
    return res.status(404).json({ error: 'name must be unique' })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  console.log(`POST /api/persons/ 200`)
  persons = persons.concat(person)

  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
