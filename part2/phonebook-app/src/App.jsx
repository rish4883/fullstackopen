import { useEffect, useState } from 'react'
import Header from './components/Header'
import Form, {Input} from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1, number: 9900584883 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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