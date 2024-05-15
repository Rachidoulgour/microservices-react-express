
import React, { useState } from "react";
import axios from "axios";


const PostCreate = () => {
    const [title, setTilte] = useState('');
    const onSubmit = async (event) => {
        console.log(event)
        event.preventDefault();
        await axios.post('http://posts.com/posts/create', {
            title
        });
        setTilte('');
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} onChange={e => setTilte(e.target.value)} className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>);
};

export default PostCreate;