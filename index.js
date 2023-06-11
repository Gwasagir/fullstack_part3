const express = require('express')
const app = express()

app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]


app.get('/', (request, response) => {
    response.send('<h2>You can find phonebook entires from /api/persons</h2>')
  })
  
app.get('/api/persons', (request, response) => {
    response.json(notes)
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)