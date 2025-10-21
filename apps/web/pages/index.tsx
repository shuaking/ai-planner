import Head from 'next/head';
import React from 'react';

export default function Home() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'NextJS Monorepo';
  return (
    <>
      <Head>
        <title>{appName}</title>
        <meta name="description" content="Bootstrap Next.js monorepo" />
      </Head>
      <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <h1>{appName}</h1>
        <p>Welcome! Your Next.js monorepo is up and running.</p>
      </main>
    </>
  );
}
