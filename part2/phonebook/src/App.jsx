import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const handleSubmit =(e) => {
      e.preventDefault();
    if (newName.trim().length === 0) {
      return;
    }
    const names = persons.map(p => p.name)
    console.log(names)
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
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div>name:  
            <input onChange={(e) => setNewName(e.target.value)}
          value={newName}/>
          </div>
          <div>number: 
            <input onChange={(e) => setNewNumber(e.target.value)} value={newNumber}/>
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App