require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const deckRoutes = require('../routes/decks');


const app = express()
app.use(cors());
app.use(express.json())
app.use('/api/decks', deckRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/test', (req, res) => {
    res.json({message: 'Hello from Backend!'})
})



app.listen(3001, ()=> console.log('server running on  http://localhost:3001'))