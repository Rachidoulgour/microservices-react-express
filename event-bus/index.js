const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


app.post('/events', (req, res) => {
    const event = req.body;
    axios.post('http://posts-clusterip-srv:5000/events', event).catch((err) => { console.log(err.message); });
    axios.post('http://comments-srv:5001/events', event).catch((err) => { console.log(err.message); });
    axios.post('http://query-srv:5002/events', event).catch((err) => { console.log(err.message); });
    axios.post('http://moderation-srv:5003/events', event).catch((err) => { console.log(err.message); });
    
    req.send({ status: 'OK' });
});

app.listen(5005, () => {
    console.log('listening on port 5005');
});