const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


app.post('/events', (req, res) => {
    const event = req.body;
    axios.post('http://localhost:5000/events', event)
    axios.post('http://localhost:5001/events', event)
    axios.post('http://localhost:5002/events', event)
    
    req.send({ status: 'OK' });
});

app.listen(5005, () => {
    console.log('listening on port 5005');
});