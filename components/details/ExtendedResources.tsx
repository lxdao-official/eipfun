/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';

export default function ExtendedResources({
  data,
  url,
  T,
}: {
  data?: { title: string; link: string; imgSrc: string; alt: string }[];
  url: string;
  T: Function;
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
          {T({
            en: 'Anyone may contribute to propose contents.',
            zh: '欢迎补充好内容',
          })}
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
          {T({
            en: ' Go propose',
            zh: '去提交',
          })}
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
            mr={4}
            mt={3}
            key={item.title}
          >
            <Box
              height={[150, 150, 200, 200]}
              borderRadius="6px"
              sx={{
                background: '#fff',
                overflow: 'hidden',
                border: '0.5px solid #d9d9d9',
              }}
              p={2.5}
              boxShadow="0px 4px 40px rgba(0, 0, 0, 0.06)"
            >
              <img
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
                loading="lazy"
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
                Learn more{' '}
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
          </Box>
        ))}
      </Box>
    </>
  );
}
