// implement your API here
const express = require('express')
const Users = require('./data/db.js')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('success')
})

// ? gets all users
server.get('/users', (req, res) => {
    Users.find()
    .then( users => {
        res.status(200).json(users)
    })
    .catch( err => {
        res.status(500).json({message: 'The users information could not be retrieved.'})
    })
})

//? gets user by id

server.get('/users/:id', (req, res) => {
    const { id } = req.params
        Users.findById(id)
        .then( user => {
            if(user){
                res.status(200).json(user)
            }else{
                res.status(404).json({message: "The user with the specified ID does not exist.", user: user})
            }
        })
        .catch( err => {
            res.status(500).json({error: "The user information could not be retrieved.", err: err})
        })
})

// ? creates new user
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

//? deletes user

server.delete('/users/:id', ( req, res ) => {
    const { id } = req.params
    Users.remove(id)
        .then(results => {
            if(results){
                res.status(200).json({ message: "Delete successful." })
            }else{
                res.status(404).json({message: "The user with the specified ID does not exist." })
            }})
        .catch(err => res.status(500).json({message:'Error deleting user'}))
})
const port = 8000

server.listen(port, () => console.log(`\nserver listening on port ${port}\n`))