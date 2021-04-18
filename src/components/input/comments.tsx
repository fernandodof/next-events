import React, { useEffect, useState } from 'react';

import { Comment } from './../../../pages/api/comments/model';
import CommentList from './comment-list';
import NewComment from './new-commentt';
import classes from './comments.module.css';

function Comments(props: { eventId: string }) {
    const { eventId } = props;

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch(`/api/comments/${eventId}`)
            .then((response) => response.json())
            .then((data) => setComments(data.comments));
    }, [showComments]);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        fetch(`/api/comments/${eventId}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList comments={comments} />}
        </section>
    );
}

export default Comments;
