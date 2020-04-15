const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

let persons = []

const generateId = () => persons.length === 0
  ? 0
  : Math.max(...persons.map(({id}) => id))

app.get('/persons/', (_, res) => {
  return res.json(persons)
})

app.post('/persons/', (req, res) => {
  const person = { ...req.body, id: generateId() }
  const existingPerson = persons.find(({ name }) => name === person.name)

  if (existingPerson) {
    return res
      .status(320)
      .json({ error: "A person with that name already exists!" })
  } else {
    persons = persons.concat(person)
    res.json(person)
  }
})

app.put('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = req.body

  persons = persons.map(p => p.id === id ? person : p)
  res.status(201).json(person)
})

const PORT = Number(process.env.PORT) + 1 || 4001
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`)
})
