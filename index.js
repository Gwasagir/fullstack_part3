const express = require('express')
const app = express()

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

app.get('/info', (request, response) => {
    const entries = countEntries(persons)
    console.log(request)
    const requestDate = response.Date
    console.log(requestDate)
    response.send(
        '<p>Phonebook has info for '+entries+' people</p><p> '+
        requestDate + '</p>')
  })
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)