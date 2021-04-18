import React from 'react';
import Link from 'next/link';

import classes from './main-header.module.css';

export default function MainHeader() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href="/">NextEvents</Link>
            </div>
            <nav className={classes.navigation}>
                <nav>
                    <ul>
                        <Link href="/events">Browse all events</Link>
                    </ul>
                </nav>
            </nav>
        </header>
    );
}
