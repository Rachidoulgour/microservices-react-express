const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);
    try {
        axios.post('http://posts-clusterip-srv:5000/events', event);
        axios.post('http://comments-srv:5001/events', event);
        axios.post('http://query-srv:5002/events', event)
        axios.post('http://moderation-srv:5003/events', event);

        res.send({ status: 'OK' });
    } catch (error) {
        res.send(error);
    }
    // .catch((err) => { console.log(err.message); });
    // .catch((err) => { console.log(err.message); });
    // .catch((err) => { console.log(err.message); });
    // .catch((err) => { console.log(err.message); });
    
    
});

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(5005, () => {
    console.log('listening on port 5005');
});