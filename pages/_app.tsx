import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../components/layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Component {...pageProps}></Component>
      </Layout>
    </>
  );
}
