const express = require('express');
const cors = require('cors');
const axios = require('axios');


const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

const handleEvent = (type, data) => {
    if(type === 'postCreated') {
        posts[id] = { id, title, comments: [] };
    }

    if(type === 'commentCreated') {
        const { id, content, postId, status } = data;

        const post = posts[postId];
        post.comments.push({ id, content, status });   
    }

    if(type === 'commentUpdated') {
        const { id, content, postId, status } = data;

        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const  {type, data } = req.body;

    handleEvent(type, data);

    res.send({});
});

app.listen(5002, async () => {
    console.log('listening on port 5002');
    try {
        const res = await axios.get('http://localhost:5005/events');
        for(let event of res.data) {
            console.log('Processing event:', event.type);
            handleEvent(event.type, event.data);
        }
    } catch (error) {
       console.log(error) 
    }

});