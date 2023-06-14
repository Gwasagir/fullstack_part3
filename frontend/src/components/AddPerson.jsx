import CheckEquality from "./DeepEquals"
import dbService from "../services/phonebook"

// props.constants. persons, newName, newNumber
// props.setState. setPersons, setNewName, setNewNumber, setAddMessage, setErrorMessage
// props.handlers. handleName, handleNum

const AddPerson = (props) => {
    // raiserError is legacy code and should probly be deleted
    const raiseError = () => alert(`${props.newName} is already added to phonebook`)

    const addButton = (event) => {
        event.preventDefault()
        let unique = true
        const PersonObject = {
            name: props.newName,
            number: props.newNumber
        }
        // Checking if newName exists
        props.persons.map(person => {
            if (CheckEquality(PersonObject.name, person.name)){ 
                // if exists, prompt to update the number and check for errors
                if (window.confirm(`${PersonObject.name} is already added to phonebook, replace the old number with a new one?`))
                    {dbService
                        .updateNum(props.setPersons, props.persons, person.id, PersonObject.number)
                        .then(response => {
                            props.setNewName('')
                            props.setNewNumber('') 
                        })
                        .catch(error => {
                            props.setErrorMessage('Information of '+PersonObject.name+' has already been removed from server')
                            setTimeout(() => {
                                props.setErrorMessage(null)
                                dbService.updatePersons(props.setPersons)
                            }, 4000)
                            })
                    unique = false
                    }
            }
        }
        )
        // Come here only if NEW name and number being added
        if (unique) {dbService
            .newPerson(PersonObject)
            .then(returnedPerson => {
                props.setPersons(props.persons.concat(returnedPerson))
                props.setNewName('')
                props.setNewNumber('')
                props.setAddMessage('Added '+returnedPerson.name)
                setTimeout(() => {props.setAddMessage(null)}, 4000)
            })}
        }
    // Return handles the submit form with name, number and add button
    return(
    <div>
        <form onSubmit={addButton}>
            <div> name: <input value={props.newName} onChange={props.handleName}/></div>
            <div> number: <input value={props.newNumber} onChange={props.handleNum} /> </div>
            <div> <button type="submit">add</button> </div>
        </form>
    </div>
    )}

export default AddPerson