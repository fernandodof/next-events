import React, { useContext, useEffect, useState } from 'react';

import { Comment } from './../../../pages/api/comments/model';
import CommentList from './comment-list';
import NewComment from './new-commentt';
import classes from './comments.module.css';
import { NotificationContext, NotificationStatus } from '../../context/notification-context';

function Comments(props: { eventId: string }) {
    const { eventId } = props;

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoadingComments, setIsLoadingComments] = useState(false);

    const notificationContext = useContext(NotificationContext);

    useEffect(() => {
        if (showComments) {
            setIsLoadingComments(true);
            fetch(`/api/comments/${eventId}`)
                .then((response) => response.json())
                .then((comments) => {
                    setIsLoadingComments(false);
                    setComments(comments);
                });
        }
    }, [showComments]);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        notificationContext.showNotification({
            title: 'Adding comment...',
            message: 'Your comment is being added',
            status: NotificationStatus.Pending
        });

        fetch(`/api/comments/${eventId}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                return response.json().then((data) => {
                    throw new Error(data.message || 'Something went wrong');
                });
            })
            .then(() =>
                notificationContext.showNotification({
                    title: 'Sucesss',
                    message: 'Comment succesfully added',
                    status: NotificationStatus.Success
                })
            )
            .catch((error) =>
                notificationContext.showNotification({
                    title: 'Sucesss',
                    message: error.message || 'Something went wrong',
                    status: NotificationStatus.Error
                })
            );
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && !isLoadingComments && <CommentList comments={comments} />}
            {showComments && isLoadingComments && <p>Loading....</p>}
        </section>
    );
}

export default Comments;
