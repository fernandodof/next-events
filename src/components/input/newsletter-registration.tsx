import React, { useRef, useContext } from 'react';
import { NotificationContext, NotificationStatus } from '../../context/notification-context';
import classes from './newsletter-registration.module.css';

export default function NewsletterRegistration() {
    const email = useRef<HTMLInputElement>();
    const notificationContext = useContext(NotificationContext);

    function registrationHandler(event: React.FormEvent) {
        event.preventDefault();

        const userEmail = email.current.value;

        notificationContext.showNotification({
            title: 'Signing up',
            message: 'Registering for newsletter',
            status: NotificationStatus.Pending
        });

        fetch('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify({ email: userEmail }),
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
                    title: 'Success',
                    message: 'Succesfully Registered for newsletter!',
                    status: NotificationStatus.Success
                })
            )
            .catch((error) =>
                notificationContext.showNotification({
                    title: 'Success',
                    message: error.message || 'Something went wrong',
                    status: NotificationStatus.Error
                })
            );
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
