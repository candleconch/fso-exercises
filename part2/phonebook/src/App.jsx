import { useEffect, useState } from 'react'
import axios from 'axios';
import SearchFilter from './components/SearchFilter'
import Form from './components/Form'
import Phonebook from './components/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  
  const hook = () => {
    console.log('effect activated');
    axios
      .get('/persons')
      .then(response => {
        console.log('fulfilled');
        setPersons(response.data)
      })
      .catch(reason => {
        debugger;
        console.log(reason)})
  }

  useEffect(hook, []);

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
    if (newName.trim().length === 0) {
      return;
    }
    const names = persons.map(p => p.name)
    if (names.includes(newName)){
      alert(`${newName} is already added to phonebook`)
      setNewName('');
      setNewNumber('');
      return;
    }
    setPersons(persons.concat({name: newName, number: newNumber}));
    setNewName('');
    setNewNumber('');
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
      <Phonebook persons={shown}/>
    </div>
  )
}

export default App