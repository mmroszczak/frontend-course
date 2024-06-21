import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteServices from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteServices
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteServices
    .create(noteObject)
    .then(newNote => {
      setNotes(notes.concat(newNote))
      setNewNote('')
    })

  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteServices
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(`the note ${note.content} is already deleted from the server`)
        setNotes(notes.filter(n => n.id !== id))
      }
      )
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <>
    <div>
      <h1>Notes</h1>
      <div>
      <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
    </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
    </div>



    <div>
      <form onSubmit={addNote}>

        <input 
        value={newNote}
        onChange={handleNoteChange}
        />

        <button type="submit">save</button>
      </form>   
    </div>
    </>
  )
}

export default App