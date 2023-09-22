import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const addNote = (event) => {
    event.preventDefault()
    const copy = [...notes];
    console.log(event.target);
  }

  const [notes, setNotes] = useState(props.notes)
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input type="text" />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App