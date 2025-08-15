import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const handleSubmit =(e) => {
    if (newName.trim().length === 0) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setPersons(persons.concat({name: newName}));
    setNewName('');
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)}
          value={newName}/>
          <p>debug: {newName}</p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App