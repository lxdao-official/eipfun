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
import useGetLang, { useT } from '@/hooks/useGetLang';
import Image from 'next/image';
import abi from 'abi/dencunnft.json';

import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  type UseWriteContractReturnType,
} from 'wagmi';

export const MintButton = styled(Button)<ButtonProps>(() => ({
  color: '#fff',
  backgroundColor: '#F651B0',
  '&:hover': {
    backgroundColor: '#F651B0',
    opacity: 0.8,
  },
}));

type Address = `0x${string}`;

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address;

export default function MintNFT() {
  const T = useT();
  const lang = useGetLang();
  const { address, chain } = useAccount();

  const {
    data: hash,
    isLoading,
    writeContract,
  }: UseWriteContractReturnType = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const [isMinted, setIsMinted] = useState(false);
  const [IAddress, setIAddress] = useState<Address | undefined>();

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
  }, [result.isSuccess, result.data, IAddress]);

  const mint = async () => {
    writeContract({
      abi,
      address: CONTRACT_ADDRESS,
      functionName: 'mint',
      args: ['Dencun'],
    });

    if (isConfirmed) {
      setIsMinted(true);
    }
  };

  const mintOrConnectWallet = () => {
    if (IAddress) {
      mint();
    } else {
      openConnectModal && openConnectModal();
    }
  };

  console.log(chain);

  return (
    <Container id="mint-nft">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '10px',
          background: 'linear-gradient(90deg, #EFD4EE 0%, #EED1EB 69.71%)',
        }}
        height={[520, 520, 260, 260]}
        py={5}
        pl={6}
      >
        {(address && isMinted) || isConfirmed ? (
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
                zh: '免费且不可转移，每个地址仅可铸造一枚铸造，共同见证以太坊的历史时刻',
              })}
            </Typography>

            <Box mt={3}>
              <MintButton>
                <Link
                  href={
                    lang === 'en'
                      ? 'https://twitter.com/share?text=I just minted my Dencun Mainnet Fork NFT from @EIPFun as a memorable piece of Ethereum history. Blobs are here! To learn more about Dencun upgrade and mint the Dencun NFT, please follow @EIPFun and check the website here&url=https://eip.fun/dencun'
                      : 'https://twitter.com/share?text=刚刚在 @EIPFun 平台铸造了我的 Dencun 主网分叉纪念 NFT，为这个令人难忘的以太坊历史时刻留念，Blobs 已经来啦！ 想要了解 Dencun 升级的详情及铸造 Dencun 纪念 NFT 的信息，请关注 @EIPFun 推特及官网&url=https://eip.fun/zh/dencun'
                  }
                  target="_blank"
                  color={'#fff'}
                  underline="none"
                >
                  {T({ en: 'Share on Twitter', zh: '分享到 Twitter' })}
                </Link>
              </MintButton>
              <Icons />
            </Box>
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
              {T({
                en: 'Dencun Mainnet Fork NFT',
                zh: '坎昆升级纪念 NFT',
              })}
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
                en: 'Free Non-transferable NFT',
                zh: '免费且不可转移，每个地址仅可铸造一枚铸造，共同见证以太坊的历史时刻',
              })}
            </Typography>

            <Box mt={3}>
              <MintButton
                disabled={isLoading || !isConfirming}
                onClick={mintOrConnectWallet}
              >
                {T({ en: 'Mint', zh: '铸造' })}
              </MintButton>
              <Icons />
            </Box>
          </>
        )}
        <Box
          sx={{
            position: 'absolute',
            bottom: ['10px'],
            right: ['50%', '50%', '106px', '106px'],
            marginRight: ['-108px', '108px', 0, 0],
            zIndex: 1,
            width: 216,
            height: 216,
          }}
        >
          <img
            src="/images/dencun/mint_nft_bg.png"
            alt="nft"
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
    </Container>
  );
}

function Icons() {
  return (
    <>
      <Link
        sx={{
          height: '46px',
          verticalAlign: 'middle',
          paddingLeft: 2,
        }}
        href="https://opensea.io/collection/memory-of-ethereum"
      >
        <Image
          src="/images/dencun/opensea.png"
          alt="etherscan"
          width={20}
          height={20}
        />
      </Link>
      <Link
        sx={{
          height: '46px',
          verticalAlign: 'middle',
          paddingLeft: 1,
        }}
        href={`${process.env.NEXT_PUBLIC_ETHERSCAN_URL}/address/${CONTRACT_ADDRESS}`}
      >
        <Image
          src="/images/dencun/etherscan.png"
          alt="etherscan"
          width={20}
          height={20}
        />
      </Link>
    </>
  );
}
