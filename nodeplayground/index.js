const express = require('express')
const app = express()

app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'Unknown endpoint'})
}

app.use(unknownEndpoint)
  

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
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(notes)
    
    } else {
        response.statusMessage = 'Note ID not found'
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    console.log(notes)
    response.status(204).end()
})

const generateId = () => {
    maxId = notes.length > 0 
    ? Math.max(...notes.map(note => note.id))
    : 0 
    return maxId + 1 
}

app.post('/api/notes', (request, response) => {
    if (request.is('application/json')) {
               
        const body = request.body

        if (!body.content) {
            return response.status(400).json({
                error: 'content missing!'
            })
        }

        const note = {
            content: body.content,
            important: body.important || false,
            date: new Date(), 
            id: generateId()
        }
        

        notes = notes.concat(note)

        console.log(notes)
        response.json(note)

    } else {response.status(400).json({error: 'Not JSON'})}
}
)




const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})