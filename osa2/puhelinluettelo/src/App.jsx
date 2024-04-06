import { useState, useEffect } from 'react'
import personService from './services/persons'

  const Person = (props) => {
    console.log(props.person)
  return (
    <p>{props.person.name} {props.person.number}</p>
    )
  }

  const Filter = (props) => {
    return (
      <div>
        filter shown with <input value={props.search} onChange={props.handleSearch} /> 
      </div>
    )
  }

  const PersonForm = (props) => {
    return (
      <form onSubmit={props.addNewPerson}>
        <div>name: <input value={props.newName} onChange={props.handleName}/> </div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
    )
  }

  const Persons = (props) => {
    const {personsToShow, handleDelete} = props
    return (
      <div>
      {personsToShow.map((person) => 
        <div key={person.id}>
          <Person person={person}/>
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      )} 
      </div>
    )
  }

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(persons => {
      setPersons(persons)
    })
    },[])

  const addNewPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    
    const personObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString()
    }

    const duplicate = persons.find(person => person.name === newName)
    if (duplicate) {
     if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`))
      
      {const updatedPerson = { ...duplicate, number: newNumber }
      personService
      .update(updatedPerson.id, updatedPerson)
      .then(() => {updatedPerson
        console.log(updatedPerson)
        setPersons(persons.map(person => person.id === updatedPerson.id? updatedPerson: person))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error(error)
      })}
    } else {
    personService
    .create(personObject)
    .then(returnedPersons => {
      console.log(returnedPersons)
      setPersons(persons.concat(returnedPersons))
      setNewName('')
      setNewNumber('')
    })
    }
  }

  const handleName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
  
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`)
    if (confirmDelete) {
      personService
        .deleteperson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  const personsToShow = search
  ? persons.filter(person => person.name.includes(search)) 
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      < Filter search={search} handleSearch={handleSearch}/> 
      <h3>add a new</h3>
      < PersonForm addNewPerson={addNewPerson} newName={newName} 
      handleName={handleName} newNumber={newNumber} handleNumber={handleNumber}/> 
      <h3>Numbers</h3>
        < Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )

}

export default App