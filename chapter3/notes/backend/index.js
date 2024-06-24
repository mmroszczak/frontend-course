const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()
const Note  = require('./models/note')


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


app.get('/api/notes', (request, response) => {
  Note.find({}).
  then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})
  
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    console.log(notes)
    notes = notes.filter(note => note.id !== id)
    console.log(notes)
    response.status(204).end()
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})