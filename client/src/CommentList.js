import React, { useEffect, useState } from "react";
import axios from "axios";


const CommentList = (postId) => {
    const [comments, setComments] = useState([]);
    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:5001/posts/${postId}/comments`);
        setComments(res.data);
    }

    useEffect(() => {
        fetchComments();
    }, []);

    const renderedComments = comments.map(comment => {
        return (
            <li>{comment.content}</li>
        )
    })

    return (
        <ul>{renderedComments}</ul>
    )
}

export default CommentList;