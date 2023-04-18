import NextHead from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { MetaProps } from '../types/layout';

const Head = ({ customMeta }: { customMeta?: MetaProps }): JSX.Element => {
  const router = useRouter();
  const meta = {
    title: 'EIPs-FUN',
    description: 'EIPs-FUN',
    type: 'website',
    ...customMeta,
  };

  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Hunter Chang - Website" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@huntarosan" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {meta.created && (
        <meta property="eips:created_time" content={meta.created} />
      )}
    </NextHead>
  );
};

export default Head;
