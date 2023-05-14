import React, { useState, useEffect } from 'react';
import {useRouter } from 'next/router';
import Logo from 'public/logo.svg';
import LanguageIcon from '@mui/icons-material/Language';
import TelegramIcon from '@mui/icons-material/Telegram';
// import Container, { ContainerProps } from '@mui/material/Container';
import { Box, Link, styled } from '@mui/material';
import SearchHeader from './SearchHeader';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const Navigation = (): JSX.Element => {
  const [langText, setLangText] = useState<string>();
  const router = useRouter();
  useEffect(() => {
    if (router.pathname.includes('zh')) {
      setLangText('EN');
    } else {
      setLangText('中文');
    }
  }, [router]);

  const EipHeader = styled('div')(() => ({
    // width: 1440,
    maxWidth: 1440,
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',
    justifyContent: 'space-around',
    margin: '0px auto',
    '.current': {
      color: '#437EF7',
    },
  }));

  const EipHeaderButton = styled('div')(() => ({
    height: 46,
    padding: '0 12px',
    background: '#F8F9FB',
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    margin: '0 20px',
    cursor: 'pointer',
  }));
  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      background: '#F8F9FB',
      transform: 'matrix(1, 0, 0, 1, 0, 0)',
      color: '#000',
      fontSize: 14,
    },
  }));
  const toggleLang = () => {
    if (langText === 'EN') {
      router.replace(router.pathname.substring(3));
    } else {
      router.replace('/zh' + router.pathname);
    }
  };

  return (
    <EipHeader>
      <Box display={'flex'} alignItems={'center'}>
        <Link href="/">
          <Logo />
        </Link>
        <Link
          sx={{ margin: '0 5px 0 30px' }}
          fontWeight={600}
          className={router.asPath === '/' ? 'current' : ''}
          href="/"
          color="inherit"
          underline="hover"
        >
          Home
        </Link>
        <Link
          color="inherit"
          sx={{ margin: '0 30px 0 5px', padding: '0 20px' }}
          fontWeight={600}
          underline="hover"
          className={router.asPath === '/eips' ? 'current' : ''}
          href="/eips"
        >
          EIPs
        </Link>
        <SearchHeader />
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <EipHeaderButton>
          <LightTooltip title="Join community">
            <TelegramIcon />
          </LightTooltip>
        </EipHeaderButton>

        <EipHeaderButton onClick={toggleLang}>
          <LanguageIcon /> {langText}
        </EipHeaderButton>
      </Box>
    </EipHeader>
  );
};

export default Navigation;
