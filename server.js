
// import modules
import express from 'express'
import fs from 'fs/promises'

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

app.get('/students', async function(req, res) {
    try { 

        const data = await fs.readFile('students.json', 'utf8');
        console.log("File data:". data);
        const students = JSON.parse(data);
        console.log("Parsed students:". students);
        res.status(200).json({ students })
} catch (error) {
    console.error("error reading the students file:", error);
    res.status(500).json({ message: "Internal server error" })
}
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

app.post('/student', async function (req, res) {
    try { 
        const newStudent = req.body;
        const data = await fs.readFile('students.json', 'utf8');
        const students = JSON.parse(data);

        students.push(newStudent);
        await fs.writeFile('students.json', JSON.stringify(students, null, 2));

        res.status(201).json({ student: newStudent });
    } catch (error) {
        console.error( "error handling post request:", error);
        res.status(500).json({ message: "Internal server error " });
    }
});


app.put('/student', async function(req, res){
    try {
        const studentToUpdate = req.body;
        const data = await fs.readFile('students.json', 'utf8');
        let students = JSON.parse(data);

        students = students.map(student =>
            student.name === studentToUpdate.name ? studentToUpdate : student);
            await fs.writeFile('students.json', JSON.stringify(students, null, 2));
        
            res.status(200).json({ updatedStudent: req.body });
    } catch (error) {
        console.error("error handling put:", error);
        res.status(500).json({ message: "Internal server error"});
    }
});

app.delete('/studnet', async function(req, res){
    try{ 
        const studentToDelete = req.body.name;
        const data = await fs.readFile('students.json', 'utf8');
        let students = JSON.parse(data);

        students = students.filter(student => student.name !== studentToDelete);
        await fs.writeFile('students.json', JSON.stringify(students, null, 2));
    
        res.status(200).json({ message: `${studentToDelete} deleted` });
    } catch (error) {
        console.error(" error handling delelete request:", error);
        res.status(500).json({ message: "Internal server error"});
    }
});

// Initialize server
app.listen(PORT, function() {
    console.log(`Server running at PORT ${PORT}`)
})
