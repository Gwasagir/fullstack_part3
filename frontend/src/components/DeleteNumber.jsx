import dbService from "../services/phonebook"

const DeleteNumber = (id, name, setPersons) => {
    if (window.confirm(`delete ${name} ?`)){
        dbService
            .removePerson(id)
            .then(response => dbService.updatePersons(setPersons))
    }}

export default DeleteNumber