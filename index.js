const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json()); 

app.get("/", async (req, res) => {
    try {
        const students = await prisma.student.findMany();
        res.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).send("Internal Server Error");
    }
});

// GET endpoint to fetch all student details
app.get("/studentdetails/:id", async (req, res) => {
    const { id } = req.params; // Extract the id parameter from the request URL
    try {
        const studentDetail = await prisma.studentDetail.findUnique({
            where: { id: parseInt(id) } // Convert id to integer and use it as a condition to findUnique
        });
        res.json(studentDetail);
    } catch (error) {
        console.error("Error fetching student details:", error);
        res.status(500).send("Internal Server Error");
    }
});


// POST endpoint to create a new student
// POST endpoint to create a new student
app.post("/students", async (req, res) => {
    const { name, studentclass } = req.body;
    try {
        const newStudent = await prisma.student.create({
            data: {
                name:name,
                studentclass // Using "class" from the request body
            }
        });
        res.status(201).json(newStudent);
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).send("Internal Server Error");
    }
});


// POST endpoint to create a new student detail
app.post("/details", async (req, res) => {
    const { name, img_url, father_name, mother_name, phone_number, studentId } = req.body;
    try {
        const newStudentDetail = await prisma.studentDetail.create({
            data: {
                name,
                img_url: img_url,
                father_name: father_name,
                mother_name: mother_name,
                phone_number: phone_number,
                studentId
            }
        });
        res.status(201).json(newStudentDetail);
    } catch (error) {
        console.error("Error creating student detail:", error);
        res.status(500).send("Internal Server Error");
    }
});

const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
