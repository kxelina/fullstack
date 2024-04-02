import { useState } from 'react'

const Name = (props) => {
  return (
    <div>{props.name}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if (persons.some((person => person.name == newName)))
    {window.alert(`${newName} is already added to phonebook`)}
    else {
    setNewName('')
    setPersons([...persons, {name:newName}])
    }
  }

  const handleName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person, i) => 
          <Name key={i} name={person.name} />
        )}
    </div>
  )

}

export default App