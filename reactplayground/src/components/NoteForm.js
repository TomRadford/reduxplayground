import { useState } from 'react'

const NoteForm = ( { createNote } ) => {
    const [newNote, setNewNote] = useState('new note...')
    
    const handleFirstClick = () => { if (newNote === 'new note...') setNewNote('') }
    
    const addNote = event => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() > 0.5
        }
        createNote(noteObject)
        
        setNewNote('')
    }

    return (
        <div>
            <h2>Create a new note</h2>
            <form onSubmit={addNote} >
                <input
                    onFocus={handleFirstClick}
                    value={newNote}
                    onChange={({ target }) => setNewNote(target.value)} />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default NoteForm