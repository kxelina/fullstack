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
    const {personsToShow} = props
    return (
      <div>
      {personsToShow.map((person) => 
        <div key={person.id}>
          <Person person={person}/>
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
      id: persons.length + 1
    }

    if (persons.some((person => person.name === newName)))
    {window.alert(`${newName} is already added to phonebook`)}
    else {
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
        < Persons personsToShow={personsToShow}/>
    </div>
  )

}

export default App