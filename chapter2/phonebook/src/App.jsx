import { useState, useEffect } from 'react'
import phonebookServices from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])


  useEffect(() => {
    phonebookServices.getAll()
    .then(serverPersons => setPersons(serverPersons))
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDeletion = (id) => {

    const person = persons.find(p => p.id === id)

    if(window.confirm(`Do you really want to delete ${person.name} from the phonebook?`)){

      phonebookServices.remove(id)
      .then(id => {
        const updatedPersons = persons.filter(p => p.id ==! id)
        setPersons(updatedPersons)
      })
      .catch(error => {
        alert(`The person ${person.name} has been previously removed from the phonebook.`)
        const updatedPersons = persons.filter(p => p.id ==! id)
        setPersons(updatedPersons)
      })
    }
  }

  const addName = (event) => {

    event.preventDefault()

    const newPerson = {name: newName, number: newNumber}

    if(persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, do you want to update the number?`)){
        const id = persons.find(p => p.name === newName).id
        phonebookServices.update(id, newPerson)
        .then(returnedPerson => {
          const updatedPersons = persons.map(p => p.name === returnedPerson.name ? returnedPerson : p)
          setPersons(updatedPersons)
        })
      }
    }
    else{
      phonebookServices.create(newPerson)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
      }
      )
      .then(() => {
        setNewName('')
        setNewNumber('')
      })
    }

  }

const handleFilterChange = (event) => {
  setNewFilter(event.target.value)
}

const personsToShow = persons.filter(person => person.name.toLowerCase().startsWith(filter))


  return (
    <div>
      <h2>Phonebook</h2>
        <Filter changeHandler={handleFilterChange}/>
      <h3>Add New</h3>
        <PersonForm submitHandler={addName} nameChangeHandler={handleNameChange} numberChangeHandler={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} deleteHandler={handleDeletion}/>
 
    </div>
  )
}

export default App