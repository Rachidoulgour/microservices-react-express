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
    comments.push({ id: commentId, content, status: 'pending' });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://event-bus-srv:5005/events', {
        type: 'CommentCreated',
        data: {
            id : commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })
    res.status(200).send(comments);
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if(type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        await axios.post('http://event-bus-srv:5005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }
});

app.listen(5001, () => {
    console.log('listening on port 5001');
});