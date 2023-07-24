import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const addContact = (event) => {
    event.preventDefault()
    if (!persons.every((obj) => obj.name !== newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newContact = {
      name: newName,
      number: newNumber
    }
    axios
      .post("http://localhost:3001/persons", newContact)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleInputChange = (setState) => (event) => {
    setState(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onInputChange={handleInputChange(setFilter)} />

      <h3>Add a new</h3>
      <PersonForm
        addContact={addContact}
        newName={newName}
        newNumber={newNumber}
        onInputName={handleInputChange(setNewName)}
        onInputNumber={handleInputChange(setNewNumber)}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App