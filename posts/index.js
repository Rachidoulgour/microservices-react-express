const express = require('express');
const app = express();
const { randomBytes } = require('crypto');
const cors = require('cors');


app.use(express.json());
app.use(cors());
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = { id, title };
    res.status(200).send(posts);
});

app.listen(5000, () => {
    console.log('listening on port 5000');
});