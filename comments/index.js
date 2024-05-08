const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:5005/events', {
        type: 'CommentCreated',
        data: {
            id : commentId,
            content,
            postId: req.params.id
        }
    })
    res.status(200).send(comments);
});

app.post('/events', async (req, res) => {

});

app.listen(5001, () => {
    console.log('listening on port 5001');
});