const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('events', (req, res) => {

});

app.listen(5003, () => {
    console.log('listening on port 5003');
});