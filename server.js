
// import modules
import express from 'express'

// create express app
const app = express()
const PORT = process.env.PORT || 3000

// configurations (app.set)

// middleware (app.use)
app.use(express.json())

// mount routes
app.get('/', function(req, res) {
    res.json({
        message: 'Hii this my server'
    })
})

app.get('/students', function(req, res) {
    res.status(200).json({ students: [] })
});

app.get('/home', function(req, res) {
    res.json({
        message: 'Home Page'
    })
})

app.post('/home', function(req, res) {
    const body = req.body

    res.json({
        message: `Hi ${req.body.name}`
    })
})

app.post('/student', function(req, res){

    res.status(201).json({ student: req.body });
});

// Initialize server
app.listen(PORT, function() {
    console.log(`Server running at PORT ${PORT}`)
})
