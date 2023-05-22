import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Logo from 'public/logo.svg';
import LanguageIcon from '@mui/icons-material/Language';
import TelegramIcon from '@mui/icons-material/Telegram';
// import Container, { ContainerProps } from '@mui/material/Container';
import { Box, Link, styled } from '@mui/material';
import SearchHeader from './SearchHeader';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import useGetLang from '@/hooks/useGetLang';

const Navigation = (): JSX.Element => {
  const [langText, setLangText] = useState<string>();
  const router = useRouter();
  const isEn = useGetLang() === 'en';
  useEffect(() => {
    if (router.pathname.includes('zh')) {
      setLangText('EN');
    } else {
      setLangText('中文');
    }
  }, [router]);

  const EipHeader = styled('div')(({ theme }) => ({
    // width: 1440,
    maxWidth: 1280,
    width:'90%',
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',
    justifyContent: 'space-between',
    margin: '0px auto',
    '.current': {
      color: '#437EF7',
    },

    [theme.breakpoints.down('md')]: {
      '.mobileHidden': {
        display: 'none',
        visibility: 'hidden',
      },
    },
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
      router.replace(router.pathname.substring(3) || '/');
    } else {
      router.replace('/zh' + router.pathname);
    }
  };

  return (
    <EipHeader>
      <Box display={'flex'} alignItems={'center'}>
        <Link href={isEn ? '/' : '/zh'}>
          <Logo />
        </Link>
        <Link
          sx={{ margin: '0 5px 0 30px' }}
          fontWeight={600}
          className={
            ['/', '/zh'].includes(router.asPath)
              ? 'current mobileHidden'
              : 'mobileHidden'
          }
          href={isEn ? '/' : '/zh'}
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
          className={
            router.asPath.includes('/eips')
              ? 'current mobileHidden'
              : 'mobileHidden'
          }
          href={isEn ? '/eips' : '/zh/eips'}
        >
          EIPs
        </Link>
        <Box className="mobileHidden">
          <SearchHeader />
        </Box>
      </Box>
      <Box>
        <Box className="mobileHidden" display={'flex'} alignItems={'center'}>
          <LightTooltip title="Join community">
            <Link
              height="46px"
              bgcolor="#F8F9FB"
              borderRadius="25px"
              display="flex"
              alignItems="center"
              margin="0 20px"
              padding="0 12px"
              color="inherit"
              href="https://t.eips.fun/"
            >
              <TelegramIcon />
            </Link>
          </LightTooltip>

          <Link
            height="46px"
            bgcolor="#F8F9FB"
            borderRadius="25px"
            display="flex"
            alignItems="center"
            margin="0 20px"
            padding="0 12px"
            color="inherit"
            underline="none"
            sx={{ cursor: 'pointer' }}
            onClick={toggleLang}
          >
            <LanguageIcon /> {langText}
          </Link>
        </Box>
      </Box>
    </EipHeader>
  );
};

export default Navigation;
