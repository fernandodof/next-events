import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

import EventList from '../../src/components/events/event-list/event-list';
import EventsSearch from '../../src/components/events/events-search/events-search';
import { Event, getAllEvents } from '../../util/api-util';

export default function AllEventsPage(props: { events: Event[] }): JSX.Element {
    const router = useRouter();

    function onEventSearchHandler(year: string, month: string) {
        router.push(`/events/${year}/${month}`);
    }

    return (
        <Fragment>
            <Head>
                <title>All events</title>
            </Head>
            <EventsSearch onSearch={onEventSearchHandler} />
            <EventList events={props.events} />;
        </Fragment>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const events = await getAllEvents();

    return {
        props: {
            events,
            revalidate: 10
        }
    };
};
