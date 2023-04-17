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
import { ThemeProvider } from '@mui/material/styles';

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {theme} from '../theme';
export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider  theme={theme}><Component {...pageProps} /></ThemeProvider >
}
