import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Note from './components/Note'



const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('new note...')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                console.log('promise fulfilled')
                setNotes(response.data)
            })
    }, [])

    console.log('render', notes.length, 'notes')

    const addNote = event => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString,
            important: Math.random() > 0.5
        }

        axios
            .post('http://localhost:3001/notes', noteObject)
            .then(response => {
                setNotes(notes.concat(response.data))
                setNewNote('')
            })


    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const toggleImportanceOf = (id) => {
        const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }
        axios.put(url, changedNote)
            .then(response => {
                setNotes(
                    notes.map(note => note.id !== id
                        ? note
                        : response.data))
            })
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)


    const handleFirstClick = () => { if (newNote === 'new note...') setNewNote('') }



    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>
            <form onSubmit={addNote} >
                <input
                    onFocus={handleFirstClick}
                    value={newNote}
                    onChange={handleNoteChange} />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default App