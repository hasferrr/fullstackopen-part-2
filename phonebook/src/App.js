import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ])
  const [newName, setNewName] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    if (!persons.every((obj) => obj.name !== newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({
      name: newName
    }))
  }

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setNewName(newValue)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App