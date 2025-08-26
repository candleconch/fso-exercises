require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
//const cors = require('cors');
const app = express();

//app.use(cors())
app.use(express.static('dist'))
app.use(express.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
//app.use(morgan('tiny'));

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        console.log(persons)
        res.json(persons);
    })

})

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
     <p>${new Date(Date.now()).toString()}</p>` 
  )
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  Person.findById(id)
    .then(person => {
      res.json(person)
      }
    )
    .catch(err => {
      res.StatusMessage = err;
      res.status(404).end();
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;

    persons = persons.filter(p => p.id !== id)
    res.status(204).end();
})

app.post('/api/persons', (req, res) => {
  const content = req.body;
  Person({
    name: content.name,
    number: content.number
  })
  .save()
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    console.log('something went wrong:', err);
    
  })
  //const id = Math.floor(Math.random() * 100000).toString();
  //content.id = id;
  //if (!persons.find(p => p.id === id)
  //&& content.name.trim().length > 0
  //&& content.number.trim().length > 0){
    //persons = persons.concat(content)
    //res.json(content);
  //} else {
      //res.status(400);
      //return res.json({"error": "name must be unique"})
  //}
})
const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})
