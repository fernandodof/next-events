import React from 'react';

import classes from './event-content.module.css';

export default function EventContent(props: { children: any }) {
    return <section className={classes.content}>{props.children}</section>;
}
