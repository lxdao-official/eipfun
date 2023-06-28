/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { UpdateDocs } from '@/common/config';

export default function Projects({
  data,
}: {
  data?: { title: string; link: string; imgSrc: string; alt: string }[];
}) {
  if (!data || !data.length) {
    return (
      <Box
        mt={3}
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
          Any one may contribute to propose contents.
        </Typography>
        <Link
          display={'block'}
          href={UpdateDocs}
          color={'#437EF7'}
          lineHeight={'22px'}
          fontSize={'15px'}
          underline="none"
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
      {data.map((item) => (
        <Link
          href={item.link}
          key={item.title}
          underline="hover"
          pt={3}
          display="block"
        >
          <Box
            height={138}
            border={1}
            p={2.5}
            borderColor="#d9d9d9"
            borderRadius={1.5}
            overflow="hidden"
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
            mt={2}
            color="#272d37"
            variant="subtitle1"
            title={item.title}
          >
            {item.title}
          </Typography>
        </Link>
      ))}
    </>
  );
}
