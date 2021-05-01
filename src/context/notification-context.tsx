import React, { createContext, ReactNode, useState, useEffect } from 'react';

export enum NotificationStatus {
    Success,
    Pending,
    Error
}

export interface Notification {
    title: string;
    message: string;
    status: NotificationStatus;
}

interface NotificationContextData {
    notification: Notification;
    showNotification: (notification: Notification) => void;
    hideNotification: () => void;
}

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationContext = createContext({} as NotificationContextData);

export default function NotificationContextProvider({ children }: NotificationProviderProps): JSX.Element {
    const [activeNotification, setActiveNotification] = useState<Notification>();

    useEffect(() => {
        if (activeNotification && activeNotification.status !== NotificationStatus.Pending) {
            const timer = setTimeout(() => {
                hideNotificationHandler();
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [activeNotification]);

    function showNotificationHandler(notification: Notification) {
        setActiveNotification(notification);
    }

    function hideNotificationHandler() {
        setActiveNotification(null);
    }

    return (
        <NotificationContext.Provider
            value={{
                notification: activeNotification,
                showNotification: showNotificationHandler,
                hideNotification: hideNotificationHandler
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}
