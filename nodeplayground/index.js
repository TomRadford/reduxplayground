const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
        "id": 1,
        "content": "HTML is easy",
        "date": "2019-05-30T17:30:31.098Z",
        "important": true
    },
    {
        "id": 2,
        "content": "HTML is easy",
        "date": "2019-05-30T17:30:31.098Z",
        "important": false
    },
    {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "date": "2019-05-30T19:20:14.298Z",
        "important": true
    },
    {
        "content": "test",
        "date": "2022-02-08T13:39:55.169Z",
        "important": false,
        "id": 4
    },
    {
        "content": "hello",
        "date": "2022-02-15T07:29:43.913Z",
        "important": false,
        "id": 5
    }
]

app.get('/', (request, response) => {
    response.send(`<h1>Hello world</h1>`)
})

app.get('/hi/:name', (request, response) => {
    const name = request.params.name
    console.log(`Greeting ${name}`)
    response.send(`<h1>Hello ${name}</h1>`)
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note =>  note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.statusMessage = 'Note ID not found'
        response.status(404).end()
    }    
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body
    console.log(note)
    response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})