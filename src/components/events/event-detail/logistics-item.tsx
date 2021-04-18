import React from 'react';

import classes from './logistics-item.module.css';

export default function LogisticsItem(props: LogisticsItemProps) {
    const { icon: Icon } = props;

    return (
        <li className={classes.item}>
            <span className={classes.icon}>
                <Icon />
            </span>
            <span className={classes.content}>{props.children}</span>
        </li>
    );
}

interface LogisticsItemProps {
    icon: any;
    children: any;
}
