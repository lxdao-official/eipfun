import React, { useEffect, useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EastIcon from '@mui/icons-material/East';

const elementWidth = 272.66;
export default function Video({ list, url }: { list: string[]; url: string }) {
  const [left, setLeft] = useState(0);
  const [wrapWidth, setWrapWidth] = useState(838);
  const [leftMax, setLeftMax] = useState(0);
  useEffect(() => {
    const wrapWidthNew =
      document.querySelector('#videoWrap')?.clientWidth ?? 838;
    const leftMax = elementWidth * list.length - wrapWidthNew;
    setLeftMax(leftMax);
    setWrapWidth(wrapWidthNew);
  }, [list.length]);

  if (!list.length || (list.length && !list[0])) {
    return (
      <Box
        border={1}
        pt={3}
        pb={4}
        borderColor="#f5f5f5"
        borderRadius={1.5}
        textAlign={'center'}
        sx={{
          boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.06)',
        }}
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

  const handleLeft = () => {
    setLeft((state) => {
      const newState = state + elementWidth;
      if (newState >= 0) {
        return 0;
      } else {
        return newState;
      }
    });
  };

  const handleRight = () => {
    setLeft((state) => {
      const newState = state - elementWidth;
      if (newState > -leftMax) {
        return newState;
      } else {
        return -leftMax;
      }
    });
  };

  return (
    <Box
      id="videoWrap"
      position="relative"
      height={208}
      border={1}
      borderColor="#f5f5f5"
      borderRadius={1.5}
      sx={{
        boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.06)',
        overflow: ['scroll', 'scroll', 'hidden', 'hidden'],
      }}
    >
      <Box
        display="flex"
        position="absolute"
        top={24}
        left={0}
        marginLeft={`${left}px`}
        zIndex={1}
        width={list.length * 280}
      >
        {list.map((item) => (
          <Box
            key={item}
            borderRadius={1.5}
            width={252.66}
            height={158}
            ml={2.5}
            overflow="hidden"
          >
            <iframe
              width="260"
              height="160"
              src={`https://www.youtube.com/embed/${item}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Box>
        ))}
      </Box>

      {left !== 0 && (
        <Box
          position="absolute"
          top="50%"
          left={2}
          width={24}
          height={24}
          display={['none', 'none', 'block', 'block']}
          marginTop="-12px"
          border={1}
          borderColor="#D9D9D9"
          borderRadius="50%"
          zIndex={2}
          textAlign="center"
          sx={{ cursor: 'pointer' }}
          onClick={handleLeft}
        >
          <ArrowBackIosIcon
            sx={{
              width: 14,
              height: 14,
              marginTop: '-4px',
              marginLeft: '5px',
              verticalAlign: 'middle',
              color: '#5F6D7E',
            }}
          />
        </Box>
      )}

      {list.length * elementWidth > wrapWidth && left !== -leftMax && (
        <Box
          position={'absolute'}
          top="50%"
          right={10}
          width={24}
          height={24}
          marginTop="-12px"
          display={['none', 'none', 'block', 'block']}
          border={1}
          borderColor="#D9D9D9"
          borderRadius="50%"
          zIndex={2}
          textAlign="center"
          sx={{ cursor: 'pointer' }}
          onClick={handleRight}
        >
          <ArrowForwardIosIcon
            sx={{
              width: 14,
              height: 14,
              marginTop: '-4px',
              marginLeft: '2px',
              verticalAlign: 'middle',
              color: '#5F6D7E',
            }}
          />
        </Box>
      )}
    </Box>
  );
}
