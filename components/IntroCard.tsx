import Link, { LinkProps } from 'next/link';
import React, { useState } from 'react';
import { EipWayIntro } from '../types/eips';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CardProps,
  Typography,
  styled,
} from '@mui/material';
import EastIcon from '@mui/icons-material/East';
const IntroCard = (
  { intro }: { intro?: EipWayIntro },
  { key }: { key?: number }
): JSX.Element => {
  const router = useRouter();

  const IntroNumber = styled('span')(({ theme }) => ({
    display: 'inline-block',
    width: 48,
    height: 48,
    lineHeight: '48px',
    background: '#F5FAFF',
    borderRadius: 5,
    fontSize: 24,
    textAlign: 'center',
    color: '#437EF7',
  }));
  const IntroLink = styled(Link)<LinkProps>(({ theme }) => ({
   color:'#437EF7',
   fontWeight:700,
   fontSize:15,
   marginTop:10
  }));
  const IntroTitle = styled('h5')(({ theme }) => ({
    fontSize: 17,
    height: 30,
    padding: '16px 0 0 0',
    lineHeight: '30px',
    color: '#272D37',
    fontWeight: 700,
  }));
  const IntroDesc = styled('p')(({ theme }) => ({
    width: '100%',

    fontSize: 16,

    // height:30,
    fontWeight: 400,
    padding: '10px 0 0 0 ',
    lineHeight: '24px',
    color: '#5F6D7E',

  }));

  const meta = {
    ...intro,
  };
  return (
    <Box
      sx={{
        maxWidth: 218,
        flex: 1,
        width: 218,
        textAlign: 'center',
        alignItems: 'flex-start',
      }}
    >
      <IntroNumber>{meta.index}</IntroNumber>
      <IntroTitle> {meta.title}</IntroTitle>
      <IntroDesc> {meta.intro}</IntroDesc>

      {meta.action && meta.actionLink && (
        <IntroLink href={meta.actionLink}>
          {' '}
          {meta.action} <EastIcon sx={{ fontSize: '14px' }} />
        </IntroLink>
      )}
    </Box>
  );
};

export default IntroCard;
