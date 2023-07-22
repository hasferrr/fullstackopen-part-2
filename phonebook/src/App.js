import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    if (!persons.every((obj) => obj.name !== newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }))
    setNewName('')
    setNewNumber('')
  }

  const handleInputChange = (event) => (setState) => {
    setState(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input
          value={filter}
          onChange={(event) => handleInputChange(event)(setFilter)}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addContact}>
        <div>
          name:
          <input
            value={newName}
            onChange={(event) => handleInputChange(event)(setNewName)}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={(event) => handleInputChange(event)(setNewNumber)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person) =>
          <div key={person.id}>{person.name} {person.number}</div>
        )}
      </div>
    </div>
  )
}

export default App