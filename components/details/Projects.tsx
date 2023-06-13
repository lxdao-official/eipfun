/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Box, Link, Typography } from '@mui/material';

export default function Projects({
  data,
}: {
  data?: { title: string; link: string; imgSrc: string; alt: string }[];
}) {
  if (!data || !data.length) {
    return null;
  }

  return (
    <>
      {data.map((item) => (
        <Link href={item.link} key={item.title} underline="hover">
          <Box height={100}>
            <img
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              src={item.imgSrc}
              alt={item.alt}
            />
          </Box>
          <Typography py={2} color="#272d37" variant="subtitle1">
            {item.title}
          </Typography>
        </Link>
      ))}
    </>
  );
}
