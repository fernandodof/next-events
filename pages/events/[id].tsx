import React, { Fragment } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Event, getEventById, getFeaturedEvents } from '../../util/api-util';
import EventSummary from '../../src/components/events/event-detail/event-summary';
import EventLogistics from '../../src/components/events/event-detail/event-logistics';
import EventContent from '../../src/components/events/event-detail/event-content';
import Head from 'next/head';
import Comments from '../../src/components/input/comments';

export default function EventPage(props: { event: Event }): JSX.Element {
    const event = props.event;

    if (!event) {
        return (
            <div className="center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={`${event.title} - ${event.date}`} />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>{event.description}</EventContent>
            <Comments eventId={event.id}></Comments>
        </Fragment>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const eventId = context.params.id;

    const event = await getEventById(eventId.toString());

    return {
        props: {
            event
        },
        revalidate: 30
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const events = await getFeaturedEvents();

    const paths = events.map((event) => ({ params: { id: event.id } }));

    return {
        paths: paths,
        fallback: true
    };
};
