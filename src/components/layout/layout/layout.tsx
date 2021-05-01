import React, { Fragment, useContext } from 'react';

import MainHeader from '../main-header/main-header';
import Notification from '../../ui/notification/notification';
import { NotificationContext } from '../../../context/notification-context';

export default function Layout(props: LayoutProps) {
    const notificationContext = useContext(NotificationContext);

    const activeNotification = notificationContext.notification;

    return (
        <Fragment>
            <MainHeader />
            <main>{props.children}</main>
            {activeNotification && (
                <Notification
                    title={activeNotification.title}
                    message={activeNotification.message}
                    status={activeNotification.status}
                ></Notification>
            )}
        </Fragment>
    );
}

interface LayoutProps {
    children: any;
}
