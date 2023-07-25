import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(allPersonData => {
        setPersons(allPersonData)
      })
  }
  useEffect(hook, [])

  const showSuccesBar = text => {
    setSuccessMessage(text)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const addContact = event => {
    event.preventDefault()

    const checkPerson = persons.find(person => newName === person.name)

    if (checkPerson !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updateContact(checkPerson)
      }
      return
    }

    const newContact = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newContact)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewNumber('')
        showSuccesBar(`Added ${addedPerson.name}`)
      })
  }

  const deleteContact = id => {
    const personToBeDeleted = persons.find(person => id === person.id).name
    if (!window.confirm(`Delete ${personToBeDeleted} ?`)) {
      return
    }
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => {
          if (person.id !== id) {
            return person
          }
        }))
      })
  }

  const updateContact = person => {
    personService
      .update(person.id, { ...person, number: newNumber })
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
        setNewName('')
        setNewNumber('')
        showSuccesBar(`Updated ${returnedPerson.name}`)
      })
  }

  const handleInputChange = setState => event => {
    setState(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />

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
      <Persons
        personsToShow={personsToShow}
        deleteContact={deleteContact}
      />
    </div>
  )
}

export default App