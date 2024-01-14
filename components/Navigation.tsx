import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Logo from 'public/logo.svg';
import Menu from 'public/images/menu.svg';
import Close from 'public/images/close.svg';
import LanguageIcon from '@mui/icons-material/Language';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
// import Container, { ContainerProps } from '@mui/material/Container';
import { Box, Link, styled } from '@mui/material';
import SearchHeader from './SearchHeader';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import useGetLang from '@/hooks/useGetLang';
import Drawer from '@mui/material/Drawer';
import { Telegram as TelegramLink } from '@/common/config';
import { Twitter as TwitterLink } from '@/common/config';

const Navigation = (): JSX.Element => {
  const [langText, setLangText] = useState<string>();
  const [drawOpen, setDrawOpen] = useState<boolean>(false);

  const router = useRouter();
  const isEn = useGetLang() === 'en';
  useEffect(() => {
    if (router.pathname.includes('zh')) {
      setLangText('EN');
    } else {
      setLangText('中文');
    }
  }, [router]);

  const EipHeader = styled(Box)(({ theme }) => ({
    // width: 1440,
    maxWidth: 1280,
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',
    justifyContent: 'space-between',
    margin: '0px auto',
    '.current': {
      color: '#437EF7',
    },
    '.mobileShow': {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      '.mobileHidden': {
        display: 'none',
        visibility: 'hidden',
      },
      '.mobileShow': {
        display: 'block',
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
      const asPath = router.asPath;
      if (asPath.includes('/zh/')) {
        router.replace(asPath.substring(3));
      } else {
        router.replace('/');
      }
    } else {
      router.replace('/zh' + router.asPath);
    }
  };

  return (
    <EipHeader>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Link href={isEn ? '/' : '/zh'}>
            <Logo />
          </Link>
          <Link
            sx={{ margin: '0 5px 0 108px' }}
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
            {isEn ? 'Home' : '主页'}
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
        </Box>
        <Box className="mobileHidden">
          <SearchHeader />
        </Box>
      </Box>
      <Box>
        <Box className="mobileHidden" display={'flex'} alignItems={'center'}>
          <Link
            height="46px"
            bgcolor="#F8F9FB"
            borderRadius="25px"
            display="flex"
            alignItems="center"
            padding="0 12px"
            color="inherit"
            target="_blank"
            href={TwitterLink}
          >
            <TwitterIcon />
          </Link>

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
              href={TelegramLink}
              target="_blank"
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
        <Box className="mobileShow">
          <Box
            padding="10px"
            onClick={() => {
              setDrawOpen(true);
            }}
          >
            <Menu />
          </Box>
        </Box>
      </Box>
      <Drawer
        anchor="top"
        open={drawOpen}
        onClose={() => {
          setDrawOpen(false);
        }}
        hideBackdrop={true}
      >
        <EipHeader
          className="EipHeader"
          bgcolor="#fff"
          display="flex"
          flexDirection="column"
          alignItems="top"
        >
          <Box width="100%">
            <Box
              display="flex"
              width="100%"
              alignItems="center"
              justifyContent="space-between"
            >
              <Link href={isEn ? '/' : '/zh'}>
                <Logo />
              </Link>
              <Box
                padding="10px"
                onClick={() => {
                  setDrawOpen(false);
                }}
              >
                <Close />
              </Box>
            </Box>
            <Box width="100%" height="72px" lineHeight="72px">
              <Box
                fontWeight={600}
                className={
                  ['/', '/zh'].includes(router.asPath) ? 'current ' : ''
                }
                // href={isEn ? '/' : '/zh'}
                // underline="none"
                color="inherit"
                onClick={() => {
                  location.href = isEn ? '/' : '/zh';
                }}
              >
                {isEn ? 'Home' : '主页'}
              </Box>
            </Box>
            <Box width="100%" height="72px" lineHeight="72px">
              <Box
                color="inherit"
                fontWeight={600}
                // underline="none"
                onClick={() => {
                  location.href = isEn ? '/eips' : '/zh/eips';
                }}
                className={router.asPath.includes('/eips') ? 'current ' : ''}
                // href={isEn ? '/eips' : '/zh/eips'}
              >
                EIPs
              </Box>
            </Box>
          </Box>
          <Box
            width="100%"
            display={'flex'}
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <Link
              height="46px"
              bgcolor="#F8F9FB"
              borderRadius="25px"
              display="flex"
              alignItems="center"
              padding="0 12px"
              color="inherit"
              target="_blank"
              href={TwitterLink}
            >
              <TwitterIcon />
            </Link>

            <Link
              height="46px"
              bgcolor="#F8F9FB"
              borderRadius="25px"
              display="flex"
              alignItems="center"
              margin="0 20px"
              padding="0 12px"
              color="inherit"
              target="_blank"
              href="https://t.me/eipfun"
            >
              <TelegramIcon />
            </Link>

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
        </EipHeader>
      </Drawer>
    </EipHeader>
  );
};

export default Navigation;
