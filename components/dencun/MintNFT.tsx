import React from 'react';
import { Container, Box, Button, ButtonProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useT } from '@/hooks/useGetLang';
import Image from 'next/image';

const MintButton = styled(Button)<ButtonProps>(() => ({
  color: '#fff',
  backgroundColor: '#F651B0',
  '&:hover': {
    backgroundColor: '#F651B0',
    opacity: 0.8,
  },
}));

export default function MintNFT() {
  const T = useT();
  return (
    <Container>
      <Box
        sx={{
          position: 'relative',
          borderRadius: '10px',
          background: 'linear-gradient(90deg, #EFD4EE 0%, #EED1EB 69.71%)',
        }}
        height={260}
        py={5}
        pl={6}
      >
        {/* <Typography
          fontWeight="600"
          fontSize={18}
          color={'#F651B0'}
          component="h3"
          textTransform={'uppercase'}
        >
          {T({ en: 'Dencun Upgrade', zh: '坎昆升级' })}
        </Typography>

        <Typography
          component="h2"
          fontSize={32}
          lineHeight={'42px'}
          fontWeight={600}
          color={'#272D37'}
          mt={1}
        >
          {T({ en: 'Dencun Upgrade Commemorative NFT', zh: '坎昆升级' })}
        </Typography>

        <Typography
          fontWeight={400}
          fontSize={16}
          color={'#666F85'}
          lineHeight={'24px'}
          component="h4"
          mt={2}
        >
          {T({
            en: 'Free  Non-transferable NFT',
            zh: '终审截止日期',
          })}
        </Typography>

        <Box mt={3}>
          <MintButton>{T({ en: 'Mint', zh: '铸造' })}</MintButton>{' '}
           <span style={{ paddingLeft: '16px' }}>
            <Opensea />
          </span>
          <span style={{ paddingLeft: '8px' }}>
            <Etherscan />
          </span>
        </Box> */}

        {/* minted NFT */}
        <Typography
          fontWeight="600"
          fontSize={32}
          color={'#F651B0'}
          lineHeight={'42px'}
          component="h3"
        >
          {T({ en: 'Successful！', zh: '成功了！' })}
        </Typography>

        <Typography
          fontWeight={400}
          fontSize={16}
          color={'#666F85'}
          lineHeight={'24px'}
          component="h4"
          mt={2}
        >
          {T({
            en: 'Please check your wallet for your NFT.',
            zh: '终审截止日期',
          })}
        </Typography>

        <Box mt={3}>
          <MintButton>{T({ en: 'Share on Twitter', zh: '铸造' })}</MintButton>{' '}
          <ConnectButton />
          <span style={{ paddingLeft: '16px' }}>
            <Opensea />
          </span>
          <span style={{ paddingLeft: '8px' }}>
            <Etherscan />
          </span>
        </Box>

        <Image
          style={{ position: 'absolute', top: 0, right: '20px' }}
          src="/images/dencun/mint_nft_bg.png"
          alt="nft"
          width={275}
          height={162.5}
        ></Image>
      </Box>
    </Container>
  );
}

function Etherscan() {
  return (
    <Image
      src="/images/dencun/etherscan.png"
      alt="etherscan"
      width={20}
      height={20}
    ></Image>
  );
}

function Opensea() {
  return (
    <Image
      src="/images/dencun/opensea.png"
      alt="etherscan"
      width={20}
      height={20}
    ></Image>
  );
}
