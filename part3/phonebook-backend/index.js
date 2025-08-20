const express = require('express')
const app = express();
app.use(express.json());

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hi there</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons);

})

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
     <p>${new Date(Date.now()).toString()}</p>` 
  )
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.statusMessage = 'Requested entry not found'
    res.status(404).end();
  }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;

    persons = persons.filter(p => p.id !== id)
    res.status(204).end();
})

app.post('/api/persons', (req, res) => {
  const content = req.body;
  const id = Math.floor(Math.random() * 100000).toString();
  content.id = id;
  if (!persons.find(p => p.id === id)
  && content.name.trim().length > 0
  && content.number.trim().length > 0){
    persons = persons.concat(content)
    res.json(content);
  } else {
      res.status(400);
      return res.json({"error": "name must be unique"})
  }
})
const PORT = 3001;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})
