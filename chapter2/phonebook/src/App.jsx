import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ( {person } ) => {
  return(
  <>
    
  </>
  )
}

const Filter = ( {changeHandler} ) => {
return(
<div>
  Filter shown with <input onChange={changeHandler}/>
</div>
)
}

const PersonForm = ( { submitHandler, nameChangeHandler, numberChangeHandler } ) => {
  return(
    <form onSubmit={submitHandler}>
        <div>
          name: <input onChange={nameChangeHandler}/>
        </div>
        <div>
          number: <input onChange={numberChangeHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ( {personsToShow} ) => {
  return(
    
    personsToShow.map(person => 
      <p key={person.name}>

      {person.name} {person.number}

      </p>
    )

  )
}

const App = () => {

  const [persons, setPersons] = useState([])

  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    console.log({persons})
    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    }else{
      setPersons(persons.concat({name: newName, number: newNumber, id: persons.length+1}))
      setNewName('')
      setNewNumber('')
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
        <Persons personsToShow={personsToShow}/>
 
    </div>
  )
}

export default App