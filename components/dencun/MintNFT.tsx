import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Button,
  ButtonProps,
  Typography,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useT } from '@/hooks/useGetLang';
import Image from 'next/image';
import abi from 'abi/dencunnft.json';

import { useAccount, useReadContract, useWriteContract } from 'wagmi';

const MintButton = styled(Button)<ButtonProps>(() => ({
  color: '#fff',
  backgroundColor: '#F651B0',
  '&:hover': {
    backgroundColor: '#F651B0',
    opacity: 0.8,
  },
}));

type Address = `0x${string}`;

export default function MintNFT() {
  const T = useT();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [isMinted, setIsMinted] = useState(false);
  const [IAddress, setIAddress] = useState<Address | undefined>();
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address;

  useEffect(() => {
    if (address) {
      setIAddress(address);
    }
  }, [address]);
  const { openConnectModal } = useConnectModal();

  const result = useReadContract({
    abi,
    address: CONTRACT_ADDRESS,
    functionName: 'balanceOf',
    args: [IAddress, 1],
    account: IAddress,
  });
  useEffect(() => {
    if (result.isSuccess) {
      if ((result.data as bigint) > 0) {
        setIsMinted(true);
      }
    }
  }, [result.isSuccess, result.data]);

  const mint = async () => {
    const nftResult = await writeContractAsync({
      abi,
      address: CONTRACT_ADDRESS,
      functionName: 'mint',
      args: ['Dencun'],
    });
    console.log(nftResult);
  };

  const mintOrConnectWallet = () => {
    if (IAddress) {
      mint();
    } else {
      openConnectModal && openConnectModal();
    }
  };

  return (
    <Container>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '10px',
          background: 'linear-gradient(90deg, #EFD4EE 0%, #EED1EB 69.71%)',
        }}
        height={260}
        py={5}
        pl={6}
      >
        {address && isMinted ? (
          <>
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
              <MintButton>
                <Link
                  href="https://twitter.com/share?text=I just minted my Dencun Mainnet Fork NFT from @EIPFun as a memorable piece of Ethereum history. Blobs are here! To learn more about Dencun upgrade and mint the Dencun NFT, please follow @EIPFun and check the website here&url=https://eip.fun/dencun"
                  target="_blank"
                  color={'#fff'}
                  underline="none"
                >
                  {T({ en: 'Share on Twitter', zh: '铸造' })}
                </Link>
              </MintButton>
              <Link
                sx={{
                  height: '46px',
                  verticalAlign: 'middle',
                  paddingLeft: 2,
                }}
                href="https://opensea.io/collection/"
              >
                <Opensea />
              </Link>
              <Link
                sx={{
                  height: '46px',
                  verticalAlign: 'middle',
                  paddingLeft: 1,
                }}
                href="https://sepolia-optimism.etherscan.io/address/0x64f2143a6FD6c7a35bE8D03dd30CA754f7da8501"
              >
                <Etherscan />
              </Link>
            </Box>

            <Image
              style={{
                position: 'absolute',
                top: 0,
                right: '56px',
                marginTop: '-50px',
              }}
              src="/images/dencun/mint_nft_bg.png?v=1"
              alt="nft"
              width={284.5}
              height={254.5}
            ></Image>
          </>
        ) : (
          <>
            <Typography
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
              <MintButton onClick={mintOrConnectWallet}>
                {T({ en: 'Mint', zh: '铸造' })}
              </MintButton>
              <Link
                sx={{
                  height: '46px',
                  verticalAlign: 'middle',
                  paddingLeft: 2,
                }}
                href="https://opensea.io/collection/"
              >
                <Opensea />
              </Link>
              <Link
                sx={{
                  height: '46px',
                  verticalAlign: 'middle',
                  paddingLeft: 1,
                }}
                href="https://sepolia-optimism.etherscan.io/address/0x64f2143a6FD6c7a35bE8D03dd30CA754f7da8501"
              >
                <Etherscan />
              </Link>
            </Box>
          </>
        )}
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
