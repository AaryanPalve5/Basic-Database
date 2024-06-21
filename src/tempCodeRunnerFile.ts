import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;
const dbPath = './db.json';

app.use(express.json());

app.get('/ping', (req:Request, res:Response) => {
    res.send(true);
});

app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const newEntry = { name, email, phone, github_link, stopwatch_time };

    fs.readFile(dbPath, (err, data) => {
        if (err) throw err;
        const db = JSON.parse(data.toString());
        db.push(newEntry);
        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) throw err;
            res.send('Submission saved successfully');
        });
    });
});

app.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string);

    fs.readFile(dbPath, (err, data) => {
        if (err) throw err;
        const db = JSON.parse(data.toString());
        if (index < 0 || index >= db.length) {
            res.status(404).send('Entry not found');
        } else {
            res.json(db[index]);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
