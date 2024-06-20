"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
const dbFilePath = path_1.default.join(__dirname, 'db.json');
app.use(body_parser_1.default.json());
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
    if (fs_1.default.existsSync(dbFilePath)) {
        const data = fs_1.default.readFileSync(dbFilePath, 'utf-8');
        submissions = JSON.parse(data);
    }
    // Add new submission
    submissions.push(submission);
    // Write the updated submissions back to the file
    fs_1.default.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
    res.status(201).send({ message: 'Submission saved successfully' });
});
// Read endpoint
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index, 10);
    if (fs_1.default.existsSync(dbFilePath)) {
        const data = fs_1.default.readFileSync(dbFilePath, 'utf-8');
        const submissions = JSON.parse(data);
        if (index >= 0 && index < submissions.length) {
            res.send(submissions[index]);
        }
        else {
            res.status(404).send({ message: 'Submission not found' });
        }
    }
    else {
        res.status(404).send({ message: 'No submissions found' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
