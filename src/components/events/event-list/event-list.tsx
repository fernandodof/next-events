import React from 'react';

import EventItem from '../event-item/event-item';
import { Event } from './../../../../dummy-data';
import classes from './event-list.module.css';

export default function EventList(props: EventListProps): JSX.Element {
    const { events } = props;

    return (
        <ul className={classes.list}>
            {events.map((event) => (
                <EventItem key={event.id} {...event} />
            ))}
        </ul>
    );
}

interface EventListProps {
    events: Event[];
}
