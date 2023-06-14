const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('post', (req, res) => JSON.stringify(req.body));

app.use(cors())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :post'));
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const countEntries = entries => {
    const personcount = entries.reduce(function(sum){
        return sum + 1
    },0)
    return personcount
}

app.get('/', (request, response) => {
  response.send('<h1>Welcome to phonebook</h1>')
})

app.get('/info', (request, response) => {
    const entries = countEntries(persons)
    const requestDate = Date(8.64e15).toString()
    response.send(
        '<p>Phonebook has info for '+entries+' people</p><p> '+
        requestDate + '</p>')
  })
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = persons.find(note => note.id === id)
  
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = persons.filter(note => note.id !== id)
  
    response.status(204).end()
  })

const generateId = () => {
    return Math.floor(Math.random() * 100000) + 1; 
  }

const checkDuplicates = name => {
  for (var x = 0; x < persons.length; x++) {
    if (JSON.stringify(persons[x].name)===JSON.stringify(name)){
      return true
    }
  return false
  }
}


app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log("HTML POST const request.body => ",body)
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }

    if (checkDuplicates(body.name)) {
      return response.status(418).json({ 
        error: 'name must be unique' 
      })    }

    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})