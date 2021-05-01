import React, { useContext } from 'react';

import classes from './notification.module.css';
import {
    Notification as NotificationType,
    NotificationContext,
    NotificationStatus
} from '../../../context/notification-context';

export default function Notification(props: NotificationType) {
    const { title, message, status } = props;
    const notificationContext = useContext(NotificationContext);

    let statusClasses = '';

    switch (status) {
        case NotificationStatus.Success:
            statusClasses = classes.success;
            break;
        case NotificationStatus.Error:
            statusClasses = classes.error;
            break;
        case NotificationStatus.Pending:
            statusClasses = classes.pending;
            break;
    }

    const activeClasses = `${classes.notification} ${statusClasses}`;

    return (
        <div className={activeClasses} onClick={notificationContext.hideNotification}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}
