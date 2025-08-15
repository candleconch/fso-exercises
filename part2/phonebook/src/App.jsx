import { useState } from 'react'

const App = () => {
   const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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
      <h2>Phonebook</h2>
      <div>filter shown with
        <input value={filter} onChange={(e) => setFilter(e.target.value)}/>
      </div>
      <h2>add a new</h2>
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
      {shown.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App