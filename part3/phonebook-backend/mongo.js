const mongoose = require('mongoose')
const name = process.argv[3];
const number = process.argv[4];
const password = process.argv[2];
const uri = `mongodb+srv://candleconch:${password}@cluster0.x4k7oev.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;
//let persons = [
    //{ 
      //"name": "Arto Hellas", 
      //"number": "040-123456"
    //},
    //{ 
      //"name": "Ada Lovelace", 
      //"number": "39-44-5323523"
    //},
    //{ 
      //"name": "Dan Abramov", 
      //"number": "12-43-234345"
    //},
    //{ 
      //"name": "Mary Poppendieck", 
      //"number": "39-23-6423122"
    //}
//];

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name,
    number
});

mongoose.connect(uri);

if (!process.argv[3] || !process.argv[4]){

    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
            console.log(person.name, person.number)
            
        })
        mongoose.connection.close();
    })
} else {

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
        
    })
}

