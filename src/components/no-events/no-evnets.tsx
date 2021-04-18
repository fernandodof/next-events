import React, { Fragment } from 'react';
import Button from '../ui/button/button';
import ErrorAlert from '../ui/error-alert/error-alert';

export default function NoEvents(props: { message: string }): JSX.Element {
    return (
        <Fragment>
            <ErrorAlert>{props.message}</ErrorAlert>
            <div className="center">
                <Button link="/events">Show all events</Button>
            </div>
        </Fragment>
    );
}
