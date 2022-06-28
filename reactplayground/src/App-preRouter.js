import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'


const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  const d = new Date()
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki {d.getFullYear()}</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([{
    content: 'Fetching notes',
    id: '1',
    important: true
  }])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    console.log('effect')
    noteService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNotappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }

  }, [])

  console.log('render', notes.length, 'notes')

  const createLogin = async (userObject) => {

    try {
      // console.log(await loginService.getAllUsers())
      const user = await loginService.login(userObject)
      noteService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNotappUser', JSON.stringify(user))
      setUser(user)

    } catch (exception) {
      // console.log(exception)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }


  const createNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
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
      .catch(() => {
        setErrorMessage(
          `Note: ${note.content} was already deleted from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const noteForm = () => (
    <Togglable buttonLabel='Add a note' ref={noteFormRef}>
      <NoteForm
        createNote={createNote}
      />
    </Togglable >
  )


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null
        ?
        <Togglable buttonLabel='login' >
          <LoginForm
            createLogin={createLogin}
          />
        </Togglable >
        :
        <div>
          <p>{user.name} logged in! <button onClick={() => {
            window.localStorage.removeItem('loggedNotappUser')
            setUser(null)
            noteService.setToken(null)
          }
          }>Log out</button></p>
          {noteForm()}
        </div>
      }

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
            user={user}

          />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App