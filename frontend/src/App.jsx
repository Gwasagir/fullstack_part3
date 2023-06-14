import { useState, useEffect } from 'react'
import GetNumbers from './components/GetNumbers'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'
import dbService from './services/phonebook'
import DeleteNumber from "./components/DeleteNumber"
import Notifications from './components/Notifications'

const App = () => {
  // Hooks
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [deletedId, setDeletedId] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [addMessage, setAddMessage] = useState(null)

  // Event handlers
  const handleAddName = (event) => setNewName(event.target.value)
  const handleAddNum = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilterValue(event.target.value)
  const handleDelete = (id, name) => DeleteNumber(id, name, setPersons)

  // Effect Hook for fetching data when loading page
  useEffect((() => {
    dbService
      .getAll()
      .then(PersonsFromDb => {setPersons(PersonsFromDb)})
  }), [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications.SuccesfullNotification message={addMessage} />
      <Notifications.ErrorNotification message={errorMessage} />
      <Filter filterValue={filterValue} handler={handleFilter} />
      <h3>add a new</h3>
        <AddPerson persons={persons} setPersons={setPersons} newName={newName} 
        newNumber={newNumber} handleName={handleAddName} handleNum={handleAddNum}
        setNewName={setNewName} setNewNumber={setNewNumber} setAddMessage={setAddMessage}
        setErrorMessage={setErrorMessage} />
      <h3>Numbers</h3>
        <GetNumbers persons={persons} filter={filterValue} 
        deletedId={deletedId} setDeletedId={setDeletedId} handleDelete={handleDelete} />
    </div>
  )
}

export default App