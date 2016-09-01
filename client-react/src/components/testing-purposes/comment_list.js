//stateless component, just for displaying purposes, does not modify state
//inside the return statement, whatever you want to build, must be wrapped inside <div> tags
import React from 'react';

const CommentList = (props) => {
    return (
        <div>
            <h3>This is the comment list</h3>
            <ul className="comment-list">
                <li>Comment 1</li>
            </ul>
        </div>        
    );
};

export default CommentList;