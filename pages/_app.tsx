import React from 'react';
import Layout from '../src/components/layout/layout/layout';
import Head from 'next/head';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
    return (
        <Layout>
            <Head>
                <title>Next events</title>
                <meta name="description" content="Find a lot of great events here" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
