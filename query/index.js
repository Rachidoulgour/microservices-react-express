const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const  {type, data } = req.body;

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

    res.send({});
});

app.listen(5002, () => {
    console.log('listening on port 5002');
});