const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if(type === 'CommentCreated') {
        const status = data.content.include('stupid') ? 'rejected' : 'approved';
        await axios.post('http://event-bus-srv:5005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }
    res.send({})
});

app.listen(5003, () => {
    console.log('listening on port 5003');
});