import React from 'react';
import { GetStaticProps } from 'next';

import { getFeaturedEvents, Event } from '../util/api-util';
import EventList from '../src/components/events/event-list/event-list';
import classes from '../styles/Home.module.css';
import NewsletterRegistration from '../src/components/input/newsletter-registration';

export default function Home(props: { featuredEvents: Event[] }) {
    const { featuredEvents } = props;

    return (
        <div className={classes.container}>
            <NewsletterRegistration></NewsletterRegistration>
            <EventList events={featuredEvents}></EventList>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const featuredEvents = await getFeaturedEvents();

    return {
        props: {
            featuredEvents
        },
        revalidate: 600
    };
};
