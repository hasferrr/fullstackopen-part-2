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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [color, setColor] = useState('green')

  const hook = () => {
    personService
      .getAll()
      .then(allPersonData => {
        setPersons(allPersonData)
      })
  }
  useEffect(hook, [])

  const showNotification = (text, color = 'green') => {
    setNotificationMessage(text)
    setColor(color)
    setTimeout(() => {
      setNotificationMessage(null)
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
        showNotification(`Added ${addedPerson.name}`)
      })
      .catch(error => {
        showNotification(error.response.data.error, 'red')
      })
  }

  const deleteContact = id => {
    const personToBeDeleted = persons.find(person => id === person.id)
    if (!window.confirm(`Delete ${personToBeDeleted.name} ?`)) {
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
      .catch(error => {
        showNotification(
          `Information of ${personToBeDeleted.name} has already been removed from the server`,
          'red'
        )
        setPersons(persons.filter(p => p.id !== personToBeDeleted.id))
      })
  }

  const updateContact = personToBeUpdated => {
    personService
      .update(personToBeUpdated.id, { ...personToBeUpdated, number: newNumber })
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id === personToBeUpdated.id ? returnedPerson : p))
        setNewName('')
        setNewNumber('')
        showNotification(`Updated ${returnedPerson.name}`)
      })
      .catch(error => {
        if (error.response.data.type.number !== undefined) {
          showNotification(error.response.data.error, 'red')
        } else {
          showNotification(
            `Information of ${personToBeUpdated.name} has already been removed from the server`,
            'red'
          )
          setPersons(persons.filter(p => p.id !== personToBeUpdated.id))
        }
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
      <Notification message={notificationMessage} color={color} />

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