// implement your API here
const express = require('express')
const Users = require('./data/db.js')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('success')
})

server.get('/users', (req, res) => {
    Users.find()
    .then( users => {
        res.status(200).json(users)
    })
    .catch( err => {
        res.status(500).json({message: 'The users information could not be retrieved.'})
    })
})

server.post('/users', (req, res) =>{
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }else{
        Users.insert(newUser)
        .then( result => {
            res.status(201).json(result)
        })
        .catch( err => res.status(500).json({ error: "There was an error while saving the user to the database" }))
    }
})

const port = 8000

server.listen(port, () => console.log(`\nserver listening on port ${port}\n`))