import Link, { LinkProps } from 'next/link';
import React, { useState } from 'react';
import Logo from 'public/logo.svg';
import LanguageIcon from '@mui/icons-material/Language';
import TelegramIcon from '@mui/icons-material/Telegram';
import Container, { ContainerProps } from '@mui/material/Container';
import { styled } from '@mui/material';
import SearchHeader from './SearchHeader';
const Navigation = (): JSX.Element => {
  const EipHeader = styled('div')(({ theme }) => ({
    width: 1440,
    maxWidth: 1440,
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',
    justifyContent: 'space-around',
    margin: '0px auto',
  }));
  const EipHeaderLink = styled(Link)<LinkProps>(({ theme }) => ({
    margin: '0px 20px',
  }));

  const NavLeft = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
  }));
  const NavRight = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
  }));
  const EipHeaderButton = styled('div')(({ theme }) => ({
    height: 46,
    padding: '0 15px',
    background: '#F8F9FB',
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    margin: '0 20px',
    cursor: 'pointer',
  }));
  return (
    <EipHeader>
      <NavLeft>
        <Link href="/">
          <Logo />
        </Link>
        <EipHeaderLink href="/">Home</EipHeaderLink>
        <EipHeaderLink href="/eips">EIPs</EipHeaderLink>
        <SearchHeader />
      </NavLeft>
      <NavRight>
        <EipHeaderButton>
          <TelegramIcon />
        </EipHeaderButton>

        <EipHeaderButton>
          <LanguageIcon /> EN
        </EipHeaderButton>
      </NavRight>
    </EipHeader>
  );
};

export default Navigation;
