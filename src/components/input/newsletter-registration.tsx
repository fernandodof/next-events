import React, { useRef } from 'react';
import classes from './newsletter-registration.module.css';

export default function NewsletterRegistration() {
    const email = useRef<HTMLInputElement>();

    function registrationHandler(event: React.FormEvent) {
        event.preventDefault();

        const userEmail = email.current.value;

        fetch('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify({ email: userEmail }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input type="email" id="email" placeholder="Your email" aria-label="Your email" ref={email} />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}
