import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;
const dbFilePath = path.join(__dirname, 'db.json');

app.use(bodyParser.json());

// Ping endpoint
app.get('/ping', (req, res) => {
    res.send(true);
});

// Submit endpoint
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const submission = { name, email, phone, github_link, stopwatch_time };
    
    // Read the current submissions from the file
    let submissions = [];
    if (fs.existsSync(dbFilePath)) {
        const data = fs.readFileSync(dbFilePath, 'utf-8');
        submissions = JSON.parse(data);
    }

    // Add new submission
    submissions.push(submission);

    // Write the updated submissions back to the file
    fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
    res.status(201).send({ message: 'Submission saved successfully' });
});

// Read endpoint
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string, 10);

    if (fs.existsSync(dbFilePath)) {
        const data = fs.readFileSync(dbFilePath, 'utf-8');
        const submissions = JSON.parse(data);

        if (index >= 0 && index < submissions.length) {
            res.send(submissions[index]);
        } else {
            res.status(404).send({ message: 'Submission not found' });
        }
    } else {
        res.status(404).send({ message: 'No submissions found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
