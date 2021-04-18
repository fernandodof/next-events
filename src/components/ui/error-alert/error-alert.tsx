import React from 'react';

import classes from './error-alert.module.css';

export default function ErrorAlert(props: { children: any }) {
    return <div className={classes.alert}>{props.children}</div>;
}
