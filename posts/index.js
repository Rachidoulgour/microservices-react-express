const express = require('express');
const app = express();
const axios = require('axios');
const { randomBytes } = require('crypto');
const cors = require('cors');


app.use(express.json());
app.use(cors());
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = { id, title };
    
    await axios.post('http://localhost:5005/events', {
        type: 'PostCreated',
        data: { id, title }
    })
    res.status(200).send(posts);
});

app.post('/events', async (req, res) => {

});

app.listen(5000, () => {
    console.log("testing update deplyment")
    console.log('listening on port 5000');
});