import React, { useRef, useState } from 'react';
import classes from './new-comment.module.css';

function NewComment(props: { onAddComment: Function }) {
    const [isInvalid, setIsInvalid] = useState(false);

    const emailInputRef = useRef<HTMLInputElement>();
    const nameInputRef = useRef<HTMLInputElement>();
    const textInputRef = useRef<HTMLTextAreaElement>();

    function sendCommentHandler(event: React.FormEvent) {
        event.preventDefault();

        const email = emailInputRef.current.value;
        const name = nameInputRef.current.value;
        const text = textInputRef.current.value;

        if (
            !email ||
            email.trim() === '' ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === ''
        ) {
            setIsInvalid(true);
            return;
        }

        props.onAddComment({
            email,
            name,
            text
        });
    }

    return (
        <form className={classes.form} onSubmit={(event) => sendCommentHandler(event)}>
            <div className={classes.row}>
                <div className={classes.control}>
                    <label htmlFor="email">Your email</label>
                    <input type="email" id="email" ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="name">Your name</label>
                    <input type="text" id="name" ref={nameInputRef} />
                </div>
            </div>
            <div className={classes.control}>
                <label htmlFor="comment">Your comment</label>
                <textarea id="comment" rows={5} ref={textInputRef}></textarea>
            </div>
            {isInvalid && <p>Please enter a valid email address and comment!</p>}
            <button>Submit</button>
        </form>
    );
}

export default NewComment;
