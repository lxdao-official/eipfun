import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="canonical" href="https://eip.fun/" />
      </Head>
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
