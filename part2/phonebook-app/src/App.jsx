import { useEffect, useState } from 'react'
import Header from './components/Header'
import Form, {Input} from './components/Form'
import axios from 'axios'

const App = () => {

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])
  const [persons, setPersons] = useState([])

  const [filterPersons, setFilterPersons]  = useState(persons);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [flag, setFlag] = useState(true);
  
  const handleName = (e) => setNewName(e.target.value)

  const handleNumber = (e) => setNewNumber(e.target.value)
  
  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {name: newName, id: persons.length+1, number: newNumber};
    const index = persons.findIndex((ele) => ele.name === newPerson.name);
    if(index >= 0) {
      alert(`${newPerson.name} is already added to phonebook`)
      return
    }
    const people = [...persons, newPerson];
    setPersons(people);
    setNewName('');
    setNewNumber('')
  }

  const nameFilter = (e) => setFilter(e.target.value)

  useEffect(() => {
    setFilterPersons(persons);
    setFlag(!flag);
  }, [filter, persons])

  useEffect(() => {
    const people = persons.filter((person) => person.name.includes(filter));
    setFilterPersons(people)
  }, [flag])

  return (
    <div>
      
      <Header title='Phonebook' />
      <Input title='Filter shown with' handler={nameFilter} />
      <Header title='Add a new contact' />
      <Form {...{addPerson, handleName, newName, handleNumber, newNumber}} />
      <Header title='Numbers' />
      <div>
        {filterPersons.map((person) => {
          return <p key={person.id}>{person.name} {person.number}</p>
        })}
      </div>
    </div>
  )
}

export default App