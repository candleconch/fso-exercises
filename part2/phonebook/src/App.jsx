import { useEffect, useState } from 'react'
import SearchFilter from './components/SearchFilter'
import Form from './components/Form'
import Phonebook from './components/Phonebook'
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const baseUrl = 'http://localhost:3001/persons'

  useEffect(() => {
    console.log('effect activated');
    personService
      .getEntries(baseUrl)
      .then(data => {
        console.log('fulfilled');
        setPersons(data)
      })
      .catch(reason => {
        console.log(reason)})
    },[])

  const handleChange = (value) => {
    if (value === 'name'){
      return e => setNewName(e.target.value);
    } else if (value === 'number') {
      return e => setNewNumber(e.target.value);
    } else if (value === 'filter') {
      return e => setFilter(e.target.value);
    }
  }
  const handleSubmit =(e) => {
    e.preventDefault();
    if (newName.trim().length === 0 || newNumber.trim().length === 0) {
      return;
    }

      const sameNameExists = (person) => {
        return person.name === newName
      }
    if (persons.find(sameNameExists)){
      console.log('already added, updating...')
      
      const updateHuh = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (!updateHuh) {
        setNewName('');
        setNewNumber('');
        return;
      }
      const person = persons.find(sameNameExists)
      
      personService
      .updateEntry(person.id, person,newNumber)
      .then(response => {
        console.log(response)
        
        setPersons(persons.map(p => p.id === person.id ? response : p))
      })
      return;
    }

    personService
    .makeEntry(newName, newNumber)
    .then(response => setPersons(persons.concat(response)))
    
    setNewName('');
    setNewNumber('');
  }
  const deletePerson = (id) => {
    const deleteHuh = window.confirm('Delete this entry?')
    if (!deleteHuh) return;

    personService
    .deleteEntry(id)
    .then(response => {
      const filtered = persons.filter(p => p.id !== response.id)
      setPersons(filtered);
    })
    }
    
  
  const shown = persons.filter(p => {
    if (filter.trim().length > 0) {
      return p.name.toLowerCase().includes(filter)
    }
    return p;
  })
  return (
    <div>
      <h1>Phonebook</h1>
      <SearchFilter filter={filter} onChange={handleChange('filter')}/>
      <h2>add a new</h2>
      <Form
        onSubmit={handleSubmit}
        nameValue = {newName}
        handleNameChange={handleChange('name')}
        numberValue= {newNumber}
        handleNumberChange={handleChange('number')}
        />
      <h2>Numbers</h2>
      <Phonebook shown={shown} deletePerson={deletePerson}/>
    </div>
  )
}

export default App