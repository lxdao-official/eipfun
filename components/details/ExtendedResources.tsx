/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';

export default function ExtendedResources({
  data,
  url,
}: {
  data?: { title: string; link: string; imgSrc: string; alt: string }[];
  url: string;
}) {
  if (!data || !data.length) {
    return (
      <Box
        my={3}
        borderRadius={1.5}
        px={2.5}
        pt={5}
        pb={3.75}
        border={1}
        borderColor={'#D9D9D9'}
        textAlign={'center'}
      >
        <Typography
          variant="subtitle2"
          component={Box}
          color={'#5F6D7E'}
          lineHeight={'20px'}
          mb={1}
        >
          Anyone may contribute to propose contents.
        </Typography>
        <Link
          display={'block'}
          href={url}
          color="#437EF7"
          lineHeight="22px"
          fontSize="15px"
          underline="none"
          target="_blank"
        >
          Go propose
          <EastIcon
            sx={{
              width: 14,
              height: 14,
              marginLeft: 0.5,
              verticalAlign: 'middle',
            }}
          />
        </Link>
      </Box>
    );
  }

  return (
    <>
      <Box mt={3} border={1} borderColor={'#EAEBF0'} borderRadius={1.25}>
        {data.map((item) => (
          <Link
            display={'flex'}
            sx={{
              boxSizing: 'border-box',
              borderBottom: '1px solid #EAEBF0',
              '&:last-child': { border: 0 },
            }}
            py={2}
            key={item.title}
            href={item.link}
            underline="none"
          >
            <Typography
              flex={1}
              px={4}
              component={Box}
              variant="h6"
              fontWeight={500}
              fontSize={16}
              lineHeight={'48px'}
            >
              {item.title}
            </Typography>

            <Typography
              component={Box}
              variant="body1"
              pl={2}
              pr={3}
              lineHeight={'48px'}
              color="#437EF7"
              fontSize={15}
            >
              Learn more{' '}
              <EastIcon
                sx={{
                  width: 20,
                  height: 20,
                  marginLeft: 0.5,
                  verticalAlign: 'middle',
                }}
              />
            </Typography>
          </Link>
        ))}
      </Box>
    </>
  );
}
