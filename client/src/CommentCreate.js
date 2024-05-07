import React, { useState } from "react";
import axios from "axios";


const CommentCreate = (postId) => {
    const [content, setContent] = useState('');
    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`http://loclahost:5001/posts/${postId}/comments`, {
            title
        });
        setContent('');
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label></label>
                    <input value={content} onChamge={e => setContent(e.target.value)} className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>);
};

export default CommentCreate;