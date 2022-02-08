import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'



const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('new note...')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        console.log('effect')
        noteService.getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    console.log('render', notes.length, 'notes')

    const addNote = event => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date(),
            important: Math.random() > 0.5
        }

        noteService.create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find(note => note.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
        .update(id, changedNote).then(returnedNote => {
            setNotes(notes.map(note =>
                note.id !== id
                    ? note
                    : returnedNote))
        })
        .catch(error => {
            alert(
                `The note ${note.content} was already deleted from the server`
            )
            setNotes(notes.filter(n => n.id !== id))
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