const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const User = require('./users-model');


const server = express()

server.use(express.json())
server.use(helmet());
server.use(morgan('dev'))

server.get('/', (req, res) => {
    res.send(`
    <h2>My App Works!</h2>`)
});

server.get('/api/users', (req, res) => {
    User.findAll()
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({ message: "Users information could not be retrieved" })
        })
});

server.post('/api/register', (req, res) => {
    let { username, password } = req.body;
    let userProfile = req.body;
    if(username && password) {
        User.create(userProfile)
            .then(profile => {
                res.status(201).json(profile)
            })
    } else {
        console.log(userProfile)
        res.status(400).json({ message: 'Please provide a username and password for the user' })
    }
});

server.post('/api/login', (req, res) => {
    let loginDetails = req.body
    console.log(req.body)
    User.login(loginDetails)
        .then(profile => {
            if(!profile){
                res.status(404).json({ message: 'Not'})
            } else {
                res.status(200).json({ message: 'success' })
            }
        })

    });

module.exports = server;
    