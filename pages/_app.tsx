import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../components/Layout';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { theme } from '../theme';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { optimism, optimismSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
  appName: 'eip.fun App',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID as string,
  chains: [optimism, optimismSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default function App({ Component, pageProps }: AppProps) {
  const description =
    'What is EIPs? It is short for Ethereum Improvement Proposals, they are standards for the Ethereum platform, including core protocol specifications, client APIs, and contract standards.';

  return (
    <>
      <NextSeo
        title="Serve Ethereum Builders, Scale the Community."
        description={description}
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              'EIPs, eip fun, lxdao, plancker, ethereum, web3, dao, public goods',
          },
        ]}
        openGraph={{
          url: 'https://eip.fun',
          title: 'Serve Ethereum Builders, Scale the Community.',
          description,
          images: [
            {
              url: 'https://eip.fun/images/logo_summary.jpg',
              width: 800,
              height: 600,
              alt: 'eip.fun Alt',
              type: 'image/jpeg',
            },
            {
              url: 'https://eip.fun/images/lxdao.svg',
              width: 800,
              height: 600,
              alt: 'lxdao',
              type: 'image/jpeg',
            },
            {
              url: 'https://eip.fun/images/plancker.svg',
              width: 800,
              height: 600,
              alt: 'plancker',
              type: 'image/jpeg',
            },
          ],
          type: 'article',
          article: {
            tags: [
              'eip',
              'fun',
              'eipfun',
              'eip fun',
              'lxdao',
              'plancker',
              'ethereum',
            ],
          },
          siteName: 'EIP.Fun - Website',
        }}
        twitter={{
          handle: '@LXDAO',
          site: '@EIPFun',
          cardType: 'summary_large_image',
        }}
      />
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-005C54Q2GC"
      />
      <Script id="ga">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-005C54Q2GC');
        `}
      </Script>
      <CssBaseline />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <WagmiProvider config={config}>
        <QueryClientProvider client={new QueryClient()}>
          <RainbowKitProvider>
            <ThemeProvider theme={theme}>
              <Layout>
                <Script src="https://cdn.jsdelivr.net/npm/donate3-sdk@1.0.28/dist/webpack/bundle.js" />
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
