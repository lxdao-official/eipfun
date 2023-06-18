import NextHead from 'next/head';
import React from 'react';
import { MetaProps } from '../types/layout';

const Head = ({ customMeta }: { customMeta?: MetaProps }): JSX.Element => {
  const meta = {
    title: 'EIPs.Fun - Serve EIP builders, scale Ethereum.',
    description:
      'EIPs.fun is run by the contributors, for the contributor, and owned by the contributors.',
    type: 'website',
    ...customMeta,
  };

  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="EIPs.Fun - Website" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@huntarosan" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta
        name="twitter:image"
        content="https://eips.fun/images/logo_summary.jpg"
      />
      {meta.created && (
        <meta property="eips:created_time" content={meta.created} />
      )}
    </NextHead>
  );
};

export default Head;
