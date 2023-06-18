/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Box, Link, Typography } from '@mui/material';

export default function ExtendedResources({
  data,
}: {
  data?: { title: string; link: string; imgSrc: string; alt: string }[];
}) {
  if (!data || !data.length) {
    return <Box>TODO empty tips</Box>;
  }

  return (
    <>
      <Box
        sx={{ '&::after': { content: '""', display: 'table', clear: 'both' } }}
      >
        {data.map((item) => (
          <Box
            sx={{
              float: 'left',
              '&:nth-of-type(2n)': { marginRight: 0 },
            }}
            width={[1, 1, 398, 398]}
            mb={6}
            mr={4}
            key={item.title}
          >
            <Box
              height={200}
              borderRadius="6px"
              sx={{
                background: '#fff',
              }}
              boxShadow="0px 4px 40px rgba(0, 0, 0, 0.06)"
            >
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
            <Typography
              component={Box}
              variant="h6"
              py={2}
              fontWeight="bold"
              fontSize={18}
              lineHeight={'30px'}
            >
              {item.title}
            </Typography>
            <Box>
              <Link href={item.link} underline="none">
                Learn more →
              </Link>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}
