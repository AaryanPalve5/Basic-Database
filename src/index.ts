import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
const dbPath = path.resolve(__dirname, './db.json');

app.use(express.json());

app.get('/ping', (req: Request, res: Response) => {
    res.send(true);
});

app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const newEntry = { name, email, phone, github_link, stopwatch_time };

    fs.readFile(dbPath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // db.json file doesn't exist, create a new one with the first entry
                fs.writeFile(dbPath, JSON.stringify([newEntry], null, 2), (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return res.status(500).send('Server error');
                    }
                    return res.send('Submission saved successfully');
                });
            } else {
                console.error('Error reading file:', err);
                return res.status(500).send('Server error');
            }
        } else {
            const db = JSON.parse(data.toString());
            db.push(newEntry);
            fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return res.status(500).send('Server error');
                }
                return res.send('Submission saved successfully');
            });
        }
    });
});

app.get('/read', (req: Request, res: Response) => {
    const index = parseInt(req.query.index as string);

    if (isNaN(index) || index < 0) {
        return res.status(400).send('Invalid index');
    }

    fs.readFile(dbPath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).send('Database not found');
            } else {
                console.error('Error reading file:', err);
                return res.status(500).send('Server error');
            }
        }
        const db = JSON.parse(data.toString());
        if (index >= db.length) {
            return res.status(404).send('Entry not found');
        } else {
            return res.json(db[index]);
        }
    });
});

app.get('/submissions', (req: Request, res: Response) => {
    fs.readFile(dbPath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).send('Database not found');
            } else {
                console.error('Error reading file:', err);
                return res.status(500).send('Server error');
            }
        }
        const db = JSON.parse(data.toString());
        return res.json(db);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
