import { useEffect, useState } from 'react'
import Header from './components/Header'
import Form, {Input} from './components/Form'
import contactService from './services/contacts'
import Contact from './components/Contact'
import Notification from './components/Notification'

const App = () => {

  useEffect(() => {
    contactService
      .getAll()
      .then((contacts) => {
        setPersons(contacts)
      })
  }, [])


  const [persons, setPersons] = useState([])
  const [notif, setNotif] = useState({message: null, type: 'add'})
  const [filterPersons, setFilterPersons]  = useState(persons);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [flag, setFlag] = useState(true);
  
  const handleName = (e) => setNewName(e.target.value)

  const handleNumber = (e) => setNewNumber(e.target.value)
  
  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {name: newName, number: newNumber};
    const index = persons.findIndex((ele) => ele.name === newPerson.name);
    if(index >= 0) {
      const confirm = window.confirm(`${newPerson.name} is already added to phonebook, replace with new?`)
      if(!confirm)
        return
      else {
        contactService
          .replaceContact(persons[index].id, newPerson)
          .then(repContact => {
            setPersons(persons.map(p => p.id === persons[index].id ? repContact : p))
            setNewName('');
            setNewNumber('')
            setNotif({type:'entry', message:`${newPerson.name}'s number changed`});
            setTimeout(() => setNotif({...notif, message: null}), 5000)
          })
          .catch(err => {
            setNotif({type:'del', message: `Info of ${newPerson.name} has already been removed from server`})
            setTimeout(() => setNotif({...notif, message:null}), 5000)
            setPersons(persons.filter(p => p.name !== newPerson.name))
          })
          return
      }
    }

    contactService
      .create(newPerson)
      .then(newContact => {
        const people = [...persons, newContact]
        setPersons(people);
      })
      setNewName('');
      setNewNumber('')
      setNotif({message:`${newPerson.name} added to phonebook`, type:'entry'});
      setTimeout(() => setNotif({...notif, message:null}), 5000)
  }

  const handleDelete = (id) => {
    contactService
      .deleteContact(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotif({type:'del', message:`${(persons.find(p => p.id === id)).name} removed`})
        setTimeout(() => setNotif({...notif, message:null}), 5000)
      })
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
      <Notification message={notif.message} type={notif.type}/>
      <Input title='Filter shown with' handler={nameFilter} />
      <Header title='Add a new contact' />
      <Form {...{addPerson, handleName, newName, handleNumber, newNumber}} />
      <Header title='Numbers' />
      <div>
        {filterPersons.map((person) => {
          // return <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></p>
          return <Contact key={person.id} id={person.id} name={person.name} number={person.number} handleDelete={handleDelete}/>
        })}
      </div>
    </div>
  )
}

export default App