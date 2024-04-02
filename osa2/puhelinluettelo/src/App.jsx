import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'040-1231244'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if (persons.some((person => person.name === newName)))
    {window.alert(`${newName} is already added to phonebook`)}
    else {
    setNewName('')
    setNewNumber('')
    setPersons([...persons, {name:newName, number:newNumber}])
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
  
  const Component = ({ person }) => {
    console.log(person)
  return (
    <p>{person.name} {person.number}</p>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={search} onChange={handleSearch} /> 
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNewPerson}>
        <div>name: <input value={newName} onChange={handleName}/> </div>
        <div>number: <input value={newNumber} onChange={handleNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
        {personsToShow.map((person) => 
          <div key={person.name}>
            <Component person={person}/>
          </div>
        )}
    </div>
  )

}

export default App