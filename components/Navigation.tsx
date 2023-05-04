import Link, { LinkProps } from 'next/link';
import React, { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import Logo from 'public/logo.svg';
import LanguageIcon from '@mui/icons-material/Language';
import TelegramIcon from '@mui/icons-material/Telegram';
// import Container, { ContainerProps } from '@mui/material/Container';
import { styled } from '@mui/material';
import SearchHeader from './SearchHeader';

const Navigation = (): JSX.Element => {
  const [langText, setLangText] = useState<string>();
  const router = useRouter();
console.log( router.asPath)
  useEffect(() => {
    if (router.pathname.includes('zh')) {
      setLangText('EN');
    } else {
      setLangText('中文');
    }
  }, [router]);

  const EipHeader = styled('div')(() => ({
    width: 1440,
    maxWidth: 1440,
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',
    justifyContent: 'space-around',
    margin: '0px auto',
  }));
  const EipHeaderLink = styled(Link)<LinkProps>(() => ({
    margin: '0px 20px',
   fontWeight:600
  }));

  const NavLeft = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    '.current':{
      color:'#437EF7!important'
    },
    "a:hover":{
      color:'#437EF7!important'
    }
    // paddingRight:15
  }));
  const NavRight = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
  }));
  const EipHeaderButton = styled('div')(() => ({
    height: 46,
    padding: '0 15px',
    background: '#F8F9FB',
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    margin: '0 20px',
    cursor: 'pointer',
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
      <NavLeft>
        <Link href="/">
          <Logo />
        </Link>
        <EipHeaderLink sx={{marginLeft:'30px'}} className={ (router.asPath==='/')?'current':''} href="/">Home</EipHeaderLink>
        <EipHeaderLink sx={{marginRight:'30px'}} className={ (router.asPath==='/eips')?'current':''} href="/eips">EIPs</EipHeaderLink>
        <SearchHeader />
      </NavLeft>
      <NavRight>
        <EipHeaderButton>
          <TelegramIcon />
        </EipHeaderButton>

        <EipHeaderButton onClick={toggleLang}>
          <LanguageIcon /> {langText}
        </EipHeaderButton>
      </NavRight>
    </EipHeader>
  );
};

export default Navigation;
