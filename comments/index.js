const express = require('express');
const { randomBytes } = require('crypto');
const { pushScopeId } = require('vue');
const app = express();

app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments-pushScopeId({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;
    res.status(200).send(comments);
});

app.listen(5001, () => {
    console.log('listening on port 5001');
});