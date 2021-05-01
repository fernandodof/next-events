import React from 'react';

import { Comment } from './../../../pages/api/comments/model';
import classes from './comment-list.module.css';

export default function CommentList(props: { comments: Comment[] }) {
    return (
        <ul className={classes.comments}>
            {props.comments.map((comment) => (
                <li key={comment._id}>
                    <p>{comment.text}</p>
                    <div>
                        By <address>{comment.name}</address>
                    </div>
                </li>
            ))}
        </ul>
    );
}