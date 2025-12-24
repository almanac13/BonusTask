const express = require('express')
const app = express()

app.use(express.json())

const PORT = 3000

app.get('/', (req, res) => {
	res.send('Hello user')
})

app.get('/json', (req, res) => {
	res.json({
		text: 'hi',
		numbers: [1, 2, 3],
	})
})

app.get('/profile/:username', (req, res) => {
	const username = req.params.username
	res.send(`Profile page of ${username}`)
})

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

let users = [
	{ id: 1, name: 'Adam' },
	{ id: 2, name: 'Sara' },
]

app.get('/users', (req, res) => {
	res.json(users)
})

app.post('/users', (req, res) => {
	const newUser = req.body
	users.push(newUser)
	res.send('User created')
})

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

app.delete('/users/:id', (req, res) => {
	const id = Number(req.params.id)
	users = users.filter(user => user.id !== id)
	res.send(`User with ID ${id} deleted`)
})

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`)
})
