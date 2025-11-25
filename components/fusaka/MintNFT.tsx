import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Button,
  ButtonProps,
  Typography,
  Link,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import useGetLang, { useT } from '@/hooks/useGetLang';
import Image from 'next/image';
import abi from 'abi/fusaka.json';

import {
  useAccount,
  useWriteContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  type UseWriteContractReturnType,
} from 'wagmi';
import { createPublicClient, fallback, http } from 'viem';
import { sepolia, mainnet } from 'viem/chains';
import { sendGet } from '@/network/axios-wrapper';

export const MintButton = styled(Button)<ButtonProps>(() => ({
  color: '#fff',
  backgroundColor: '#D32E12',
  '&:hover': {
    backgroundColor: '#D32E12',
    opacity: 0.8,
  },
  '&:disabled': {
    backgroundColor: '#c9c9c9',
    opacity: 0.6,
  },
}));

type Address = `0x${string}`;

const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_FUSAKA_CONTRACT_ADDRESS as Address;

const DEFAULT_CHAIN_ID = 11155111; // Sepolia by default
const ChainId = Number(
  process.env.NEXT_PUBLIC_FUSAKA_CHAIN_ID || DEFAULT_CHAIN_ID
);

const wagmiContract = {
  address: CONTRACT_ADDRESS,
  abi: abi,
} as const;
const isMainnet = ChainId === 1;
const transport = isMainnet
  ? fallback([
      http(
        process.env.NEXT_PUBLIC_MAINNET_RPC ||
          'https://ethereum-rpc.publicnode.com'
      ),
    ])
  : fallback([
      http(process.env.NEXT_PUBLIC_SEPOLIA_RPC || 'https://rpc.sepolia.org'),
      http('https://ethereum-sepolia-rpc.publicnode.com'),
    ]);

const publicClient = createPublicClient({
  chain: isMainnet ? mainnet : sepolia,
  transport,
});

enum Phase {
  NotStarted,
  Whitelist,
  Public,
  Ended,
}

// NotStarted, 时间开始
// Whitelist,
// Public,
// Ended,
const TOKEN_ID = 1;

export default function MintNFT() {
  const T = useT();
  // const lang = useGetLang();
  const { address, chain } = useAccount();
  const [phase, setPhase] = useState<Phase>(Phase.NotStarted);
  const [num, setNum] = useState(0);
  const [isWhiteListed, setIsWhiteListed] = useState(false);
  const [total, setTotal] = useState(0);
  const [proof, setProof] = useState<string[]>();
  const [amount, setAmount] = useState<number | string>(1);

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
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (address) {
      setIAddress(address);
    }
  }, [address]);
  const { openConnectModal } = useConnectModal();

  // 获取什么阶段，以及拥有多少数量
  useEffect(() => {
    if (!IAddress) return;
    publicClient
      .multicall({
        contracts: [
          {
            ...wagmiContract,
            functionName: 'getCurrentPhase',
            args: [TOKEN_ID],
          },
          {
            ...wagmiContract,
            functionName: 'balanceOf',
            args: [IAddress, TOKEN_ID],
          },
        ],
      })
      .then((results) => {
        const [phaseRes, balanceOfRes] = results;
        if (phaseRes.status === 'success') {
          setPhase(phaseRes.result as Phase);
          // setPhase(0);
        }
        if (balanceOfRes.status === 'success') {
          setNum(Number(balanceOfRes.result));
        }
      });
  }, [IAddress]);

  useEffect(() => {
    if (phase === 1) {
      setAmount(5 - num);
    }
  }, [phase, num]);

  // 白名单阶段 判断是否是白名单地址 以及是否获得 proof
  useEffect(() => {
    if (!IAddress || phase !== 1) {
      return;
    }
    sendGet('/nft/isWhiteAddress', { address: IAddress }).then((res) => {
      if (res?.data && res.data) {
        setIsWhiteListed(true);

        sendGet('/nft/getAddressProof', { address: IAddress }).then((res) => {
          if (res.data) {
            setProof(res.data);
          }
        });
      }
    });
  }, [IAddress, phase]);

  // 到结束阶段，获取 totalSupply 数据
  useEffect(() => {
    if (phase !== 0) {
      return;
    }

    publicClient
      .readContract({
        ...wagmiContract,
        functionName: 'totalSupply',
        args: [TOKEN_ID],
      })
      .then((res) => {
        setTotal(Number(res));
      });
  }, [phase]);

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    v = v.replace(/[^1-5]/g, '').slice(0, 1);
    setAmount(v);
  };

  const mint = async () => {
    if (chain?.id !== ChainId) {
      // if the chain is not the one we want, switch to it
      switchChain({ chainId: ChainId });
    }
    if (phase === Phase.Public) {
      writeContract({
        ...wagmiContract,
        functionName: 'publicMint',
        args: [TOKEN_ID, 1],
      });
    } else if (phase === Phase.Whitelist) {
      if (num + Number(amount) > 5) {
        setAmount(5 - num);
      }
      writeContract({
        ...wagmiContract,
        functionName: 'whitelistMint',
        args: [TOKEN_ID, amount, proof],
      });
    }
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

  return (
    <Container id="mint-nft">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '10px',
          background: 'linear-gradient(90deg, #FFDA9F  0%, #F4CC8A 69.71%)',
        }}
        height={[520, 520, 260, 260]}
        py={5}
        pl={6}
      >
        <>
          <Typography
            fontWeight="600"
            fontSize={18}
            color={'#D32E12'}
            component="h3"
            textTransform={'uppercase'}
          >
            {T({ en: 'Fusaka Upgrade', zh: 'Fusaka 升级' })}
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
              en: 'Fusaka Mainnet Fork NFT',
              zh: 'Fusaka 升级纪念 NFT',
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
            {/* 未开始 */}
            {phase === 0 && (
              <>
                <MintButton disabled={true}>
                  {T({ en: 'Coming Soon', zh: '即将开始' })}
                </MintButton>
                <Typography
                  fontWeight={400}
                  fontSize={14}
                  color={'#666F85'}
                  lineHeight={'24px'}
                  component="span"
                  ml={2}
                >
                  {T({
                    en: 'Mint has not started yet and is scheduled to open on Dec 2, 15:00 UTC+8.',
                    zh: 'Mint 尚未开启，预计将于 12 月 2 日 15:00 UTC+8 开始。',
                  })}
                </Typography>
              </>
            )}

            {/* 白名单 mint */}
            {phase === 1 && (
              <>
                <MintButton disabled={isLoading} onClick={mintOrConnectWallet}>
                  {isWhiteListed
                    ? T({ en: 'Mint', zh: '铸造' })
                    : T({ en: 'Not whitelisted ', zh: '非白名单' })}
                </MintButton>

                <TextField
                  sx={{
                    width: '90px',
                    ml: 2,
                    mt: 0.5,
                  }}
                  id="outlined-basic"
                  label={T({ en: 'Amount', zh: '数量' })}
                  variant="outlined"
                  size="small"
                  value={amount}
                  onChange={handleChangeAmount}
                />

                <Typography
                  fontWeight={400}
                  fontSize={14}
                  color={'#666F85'}
                  lineHeight={'24px'}
                  component="span"
                  ml={2}
                >
                  {T({
                    en: 'The whitelist-only phase is live. Public mint will open on Dec 3.',
                    zh: '当前为白名单专属阶段，公开铸造将于 12 月 3 日启动。',
                  })}
                </Typography>
              </>
            )}

            {/* 公共 mint */}
            {phase === 2 && (
              <>
                <MintButton disabled={isLoading} onClick={mintOrConnectWallet}>
                  {T({ en: 'Mint', zh: '铸造' })}
                </MintButton>
                <Typography
                  fontWeight={400}
                  fontSize={14}
                  color={'#666F85'}
                  lineHeight={'24px'}
                  component="span"
                  ml={2}
                >
                  {T({
                    en: 'Public mint is now open and will end on Dec 8.',
                    zh: '公开铸造已开放，截止时间为 12 月 8 日。',
                  })}
                </Typography>
              </>
            )}

            {/* 未开始 */}
            {phase === 3 && (
              <>
                <MintButton disabled={true}>
                  {T({ en: 'Mint Window Closed', zh: '铸造已关闭' })}
                </MintButton>
                <Typography
                  fontWeight={400}
                  fontSize={14}
                  color={'#666F85'}
                  lineHeight={'24px'}
                  component="span"
                  ml={2}
                >
                  {T({
                    en: `${total} participants joined to witness the historical moment of the Fusaka Ethereum mainnet upgrade!`,
                    zh: `${total} 位朋友位朋友一起见证了 Fusaka 以太坊主网升级的历史时刻！`,
                  })}
                </Typography>
              </>
            )}

            <Icons />
          </Box>
        </>

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
            src="/images/pectra/mint_nft_bg.png?q=1"
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
          paddingLeft: 1,
        }}
        target="_blank"
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
        target="_blank"
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
