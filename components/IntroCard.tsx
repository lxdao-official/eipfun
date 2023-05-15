import React from 'react';
import { EipWayIntro } from '../types/eips';
import { Box, Link, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
const IntroCard = ({ intro }: { intro?: EipWayIntro }): JSX.Element => {
  const meta = {
    ...intro,
  };
  return (
    <Box
      flex={0}
      maxWidth={218}
      minWidth={218}
      width={218}
      textAlign={'center'}
      padding={'20px 0'}
    >
      <Typography
        variant={'h6'}
        display={'inline-flex'}
        width={48}
        height={48}
        alignItems={'center'}
        justifyContent={'center'}
        bgcolor={'#F5FAFF'}
        borderRadius={'5px'}
        color={'#437EF7'}
        fontSize={24}
      >
        {meta.index}
      </Typography>
      <Typography
        variant={'h4'}
        fontSize={'22px'}
        lineHeight={'30px'}
        padding={'16px 0 0 0'}
        color={'#272D37'}
        fontWeight={600}
      >
        {meta.title}
      </Typography>
      <Typography
        variant={'h6'}
        fontSize={'16px'}
        lineHeight={'24px'}
        padding={'5px 0'}
        color={'#5F6D7E'}
        width={'100%'}
        fontWeight={400}
      >
        {meta.intro}
      </Typography>

      {meta.action && meta.actionLink && (
        <Link
          fontWeight={700}
          underline="hover"
          fontSize={15}
          marginTop={10}
          href={meta.actionLink}
        >
          {' '}
          {meta.action} <EastIcon sx={{ fontSize: '14px' }} />
        </Link>
      )}
    </Box>
  );
};

export default IntroCard;
