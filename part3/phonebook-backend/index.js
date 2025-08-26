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

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        console.log(persons)
        res.json(persons);
    })
    .catch(err => next(err))

})

app.get('/info', (req, res, next) => {
  Person.find({})
  .then(persons => 
    res.send(
      `<p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date(Date.now()).toString()}</p>` 
    )
  )
  .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then(person => {
      res.json(person)
      }
    )
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.json(result);
    })
    .catch(err => next(err));
})

app.post('/api/persons', (req, res, next) => {
  const content = req.body;
  Person({
    name: content.name,
    number: content.number
  })
  .save()
  .then(savedPerson => {
    res.json(savedPerson)
  })
  .catch(err => {
    console.log('something went wrong:', err);
    next(err);
    
  })
})
app.put('/api/persons/:id', (req, res, next) => {
    const {name, number} = req.body;
    Person.findById(req.params.id)
    .then(person => {
      if (!person) {
        return res.json(404).end();
      }
      person.name = name;
      person.number = number;

      return person.save().then(updatedPerson => {
        res.json(updatedPerson);
      })
    })
    .catch(err => next(err));
  })

  const unknownEndpoint = (req,res) => {
    return res.status(404).send({error: 'unkown endpoint'})
  }

  app.use(unknownEndpoint);

  const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if (error.name === 'CastError'){
      return res.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({error: error.message})
    }
    
    next(error);
  }
  
  app.use(errorHandler);

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
//})
const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})
