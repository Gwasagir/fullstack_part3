import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const newPerson = newObject => {
    const request = axios.post(baseUrl, newObject) 
    return request.then(response => response.data)
}

const removePerson = id => {
    const request = axios.delete(baseUrl+'/'+id)
    return request.then(response => response)
}

const updateNum = (setPersons, persons, id, newNum) => {
    const personURL = baseUrl+'/'+id
    const personObject = persons.find(person => person.id === id) 
    const updatedNumber = {...personObject, number: newNum} // object with same name + id but new number
    const putUpdate = axios.put(personURL, updatedNumber)
    return putUpdate.then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response.data))
            console.log(response)        
        })
    }

const updatePersons = setPersons => {  
    const request = axios.get(baseUrl);
    request.then(response => {
      const persons = response.data;
      setPersons(persons)
    })}


export default { getAll, newPerson, removePerson, updateNum, updatePersons }