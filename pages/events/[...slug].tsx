import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { Fragment } from 'react';

import EventList from '../../src/components/events/event-list/event-list';
import NoEvents from '../../src/components/no-events/no-evnets';
import ResultsTitle from '../../src/components/results-title/results-title';
import { Event, getFilteredEvents } from '../../util/api-util';

export default function FilteredEvents(props: FilteredEventsProps): JSX.Element {
    const { events, year, month } = props;

    const pageHeadData = (
        <Head>
            <title>{`Events in ${year}/${month}`}</title>
            <meta name="description" content={`All events for ${year}/${month}`} />
        </Head>
    );

    if (props.hasError) {
        return (
            <Fragment>
                {pageHeadData}
                <NoEvents message="Invalid Filter! please asjust your values"></NoEvents>;
            </Fragment>
        );
    }

    if (!events || events.length === 0) {
        return (
            <Fragment>
                {pageHeadData}
                <NoEvents message="No events found"></NoEvents>;
            </Fragment>
        );
    }

    const date = new Date(year, month - 1);

    return (
        <Fragment>
            {pageHeadData}
            <ResultsTitle date={date} />
            <EventList events={events} />
        </Fragment>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const filterData = context.params.slug;

    const year = Number(filterData[0]);
    const month = Number(filterData[1]);

    if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12) {
        return {
            props: {
                hasError: true
            }
        };
    }

    const events = await getFilteredEvents({ year, month });

    return {
        props: {
            events,
            year,
            month
        }
    };
};

interface FilteredEventsProps {
    hasError?: boolean;
    events: Event[];
    year: number;
    month: number;
}
