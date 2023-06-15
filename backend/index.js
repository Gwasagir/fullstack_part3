require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

morgan.token('post', (req, res) => JSON.stringify(req.body));

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :post'));
app.use(express.static('build'))

const countEntries = entries => {
    const personcount = entries.reduce(function(sum){
        return sum + 1
    },0)
    return personcount
}

app.get('/', (request, response) => {
  response.send('<h1>Welcome to phonebook</h1>')
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }
    // if (checkDuplicates(body.name)) {
    //   return response.status(418).json({ 
    //     error: 'name must be unique' 
    //   })    }
    const person = new Person({
      name: body.name,
      number: body.number,
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })



// legacy event handlers here

  app.get('/info', (request, response) => {
    const entries = countEntries([1,2,3]) // DOESNT WORK
    const requestDate = Date(8.64e15).toString()
    response.send(
        '<p>Phonebook has info for '+entries+' people</p><p> '+
        requestDate + '</p>')
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


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})