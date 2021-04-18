import React, { Fragment } from 'react';
import MainHeader from '../main-header/main-header';

export default function Layout(props: LayoutProps) {
    return (
        <Fragment>
            <MainHeader />
            <main>{props.children}</main>
        </Fragment>
    );
}

interface LayoutProps {
    children: any;
}
