const express = require('express')
const app = express()

// Middleware to parse JSON body
app.use(express.json())

const PORT = 3000

// ================= BASIC ROUTES =================

// / -> Hello user
app.get('/', (req, res) => {
	res.send('Hello user')
})

// /json -> JSON response
app.get('/json', (req, res) => {
	res.json({
		text: 'hi',
		numbers: [1, 2, 3],
	})
})

// /profile/:username -> Dynamic route
app.get('/profile/:username', (req, res) => {
	const username = req.params.username
	res.send(`Profile page of ${username}`)
})

// /letters?text=hello
app.get('/letters', (req, res) => {
	const text = req.query.text

	if (!text) {
		return res.send('Please provide text query parameter')
	}

	res.json({
		normal: text,
		shouty: text.toUpperCase(),
		count: text.length,
		backwards: text.split('').reverse().join(''),
	})
})

// ================= USERS CRUD =================

// Dummy users data
let users = [
	{ id: 1, name: 'Adam' },
	{ id: 2, name: 'Sara' },
]

// GET /users -> list users
app.get('/users', (req, res) => {
	res.json(users)
})

// POST /users -> create user
app.post('/users', (req, res) => {
	const newUser = req.body
	users.push(newUser)
	res.send('User created')
})

// PUT /users/:id -> update user
app.put('/users/:id', (req, res) => {
	const id = Number(req.params.id)
	const updatedData = req.body

	if (!updatedData || Object.keys(updatedData).length === 0) {
		return res.status(400).send('Request body is empty')
	}

	let userFound = false

	users = users.map(user => {
		if (user.id === id) {
			userFound = true
			return { ...user, ...updatedData }
		}
		return user
	})

	if (!userFound) {
		return res.status(404).send('User not found')
	}

	res.send(`User with ID ${id} updated`)
})

// DELETE /users/:id -> delete user
app.delete('/users/:id', (req, res) => {
	const id = Number(req.params.id)
	users = users.filter(user => user.id !== id)
	res.send(`User with ID ${id} deleted`)
})

// ================= SERVER =================

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`)
})
