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
import { createPublicClient, fallback, http, formatEther } from 'viem';
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
const TOKEN_ID = Number(process.env.NEXT_PUBLIC_FUSAKA_TOKEN_ID || 1);

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

export default function MintNFT() {
  const T = useT();
  // const lang = useGetLang();
  const { address, chain } = useAccount();
  const [phase, setPhase] = useState<Phase>(Phase.NotStarted);
  const [num, setNum] = useState(0);
  const [isWhiteListed, setIsWhiteListed] = useState(false);
  const [whiteStatus, setWhiteStatus] = useState<
    'idle' | 'loading' | 'yes' | 'no'
  >('idle');
  const [total, setTotal] = useState(0);
  const [proof, setProof] = useState<string[]>();
  const [amount, setAmount] = useState<number | string>(1);
  const [phaseTimes, setPhaseTimes] = useState<{
    whitelistStartTime?: number;
    publicStartTime?: number;
  }>({});
  const [tokenInfo, setTokenInfo] = useState<{
    maxSupply?: number;
    currentSupply?: number;
    whitelistMaxPerAddress?: number;
    publicMaxPerAddress?: number;
    whitelistPrice?: string;
    publicPrice?: string;
    transferable?: boolean;
  }>({});

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
  const subtitle = (() => {
    if (tokenInfo.transferable === false) {
      return T({ en: 'Non-transferable NFT', zh: '不可转移 NFT' });
    }
    if (tokenInfo.transferable === true) {
      return T({ en: 'Transferable NFT', zh: '可转移 NFT' });
    }
    return T({ en: 'NFT', zh: 'NFT' });
  })();

  // 获取什么阶段，以及拥有多少数量
  useEffect(() => {
    publicClient
      .readContract({
        ...wagmiContract,
        functionName: 'getCurrentPhase',
        args: [TOKEN_ID],
      })
      .then((currentPhase) => {
        setPhase(Number(currentPhase) as Phase);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!IAddress) {
      setNum(0);
      return;
    }
    publicClient
      .readContract({
        ...wagmiContract,
        functionName: 'balanceOf',
        args: [IAddress, TOKEN_ID],
      })
      .then((balance) => {
        setNum(Number(balance));
      })
      .catch(() => {});
  }, [IAddress]);

  useEffect(() => {
    if (phase === 1) {
      setAmount(5 - num);
    }
  }, [phase, num]);

  // 阶段时间
  useEffect(() => {
    // Prefer dedicated getter; fall back to tokenConfigs if needed
    publicClient
      .readContract({
        ...wagmiContract,
        functionName: 'getPhaseTimes',
        args: [TOKEN_ID],
      })
      .then((res: any) => {
        const [wl, pub] = res as [bigint, bigint];
        setPhaseTimes({
          whitelistStartTime: Number(wl),
          publicStartTime: Number(pub),
        });
      })
      .catch(() => {
        publicClient
          .readContract({
            ...wagmiContract,
            functionName: 'tokenConfigs',
            args: [TOKEN_ID],
          })
          .then((config: any) => {
            const wl = config?.whitelistStartTime ?? config?.[5];
            const pub = config?.publicStartTime ?? config?.[6];
            setPhaseTimes({
              whitelistStartTime: Number(wl || 0n),
              publicStartTime: Number(pub || 0n),
            });
          })
          .catch(() => {});
      });
  }, []);

  // Token detail for display
  useEffect(() => {
    publicClient
      .readContract({
        ...wagmiContract,
        functionName: 'getTokenInfo',
        args: [TOKEN_ID],
      })
      .then((info: any) => {
        const [
          _upgradeName,
          maxSupply,
          currentSupply,
          whitelistMaxPerAddress,
          publicMaxPerAddress,
          whitelistPrice,
          publicPrice,
          _phase,
          _ended,
          _mintEndTime,
          transferable,
        ] = info as [
          string,
          bigint,
          bigint,
          bigint,
          bigint,
          bigint,
          bigint,
          number,
          boolean,
          bigint,
          boolean
        ];
        setTokenInfo({
          maxSupply: Number(maxSupply),
          currentSupply: Number(currentSupply),
          whitelistMaxPerAddress: Number(whitelistMaxPerAddress),
          publicMaxPerAddress: Number(publicMaxPerAddress),
          whitelistPrice: formatEth(whitelistPrice),
          publicPrice: formatEth(publicPrice),
          transferable: Boolean(transferable),
        });
      })
      .catch(() => {
        publicClient
          .readContract({
            ...wagmiContract,
            functionName: 'tokenConfigs',
            args: [TOKEN_ID],
          })
          .then((config: any) => {
            setTokenInfo({
              maxSupply: Number(config?.maxSupply ?? config?.[0] ?? 0n),
              whitelistMaxPerAddress: Number(
                config?.whitelistMaxPerAddress ?? config?.[1] ?? 0n
              ),
              publicMaxPerAddress: Number(
                config?.publicMaxPerAddress ?? config?.[2] ?? 0n
              ),
              whitelistPrice: formatEth(config?.whitelistPrice ?? config?.[3]),
              publicPrice: formatEth(config?.publicPrice ?? config?.[4]),
              transferable: Boolean(config?.transferable ?? config?.[9]),
            });
          })
          .catch(() => {});
      });
  }, []);

  // 白名单状态/证明
  useEffect(() => {
    if (!IAddress) {
      setIsWhiteListed(false);
      setWhiteStatus('idle');
      return;
    }
    setWhiteStatus('loading');
    sendGet('/nft/isWhiteAddress', { address: IAddress, tokenId: TOKEN_ID })
      .then((res) => {
        if (res?.data && res.data) {
          setIsWhiteListed(true);
          setWhiteStatus('yes');

          // 获取 merkle proof，便于之后铸造
          sendGet('/nft/getAddressProof', {
            address: IAddress,
            tokenId: TOKEN_ID,
          })
            .then((res) => {
              if (res.data) {
                setProof(res.data.proof || res.data);
              }
            })
            .catch(() => {});
          return;
        }
        setIsWhiteListed(false);
        setWhiteStatus('no');
      })
      .catch(() => {
        setWhiteStatus('idle');
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
      minHeight={['auto', 'auto', 340, 340]}
      pt={[4, 4, 5, 5]}
      pb={[12, 10, 6, 6]}
      px={[3, 4, 6, 6]}
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
            {subtitle}
          </Typography>

          <InfoBar
            address={IAddress}
            isWhiteListed={isWhiteListed}
            whiteStatus={whiteStatus}
            phaseTimes={phaseTimes}
            tokenInfo={tokenInfo}
          />

          <Box mt={3} mb={[6, 6, 4, 3]}>
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
                  {phaseTimes.whitelistStartTime
                    ? T({
                        en: `Whitelist opens at ${formatTs(
                          phaseTimes.whitelistStartTime
                        )} (Local)`,
                        zh: `白名单阶段将于 ${formatTs(
                          phaseTimes.whitelistStartTime
                        )} 开启（本地时间）`,
                      })
                    : phaseTimes.publicStartTime
                    ? T({
                        en: `Public mint opens at ${formatTs(
                          phaseTimes.publicStartTime
                        )} (Local)`,
                        zh: `公开铸造将于 ${formatTs(
                          phaseTimes.publicStartTime
                        )} 开启（本地时间）`,
                      })
                    : T({
                        en: 'Mint has not started yet.',
                        zh: 'Mint 尚未开启。',
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
                  {phaseTimes.publicStartTime
                    ? T({
                        en: `Whitelist live. Public mint opens at ${formatTs(
                          phaseTimes.publicStartTime
                        )} (Local).`,
                        zh: `当前为白名单阶段，公开铸造将于 ${formatTs(
                          phaseTimes.publicStartTime
                        )} 开启（本地时间）。`,
                      })
                    : T({
                        en: 'Whitelist phase is live.',
                        zh: '当前为白名单阶段。',
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
                    en: 'Public mint is now open.',
                    zh: '公开铸造已开放。',
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
            bottom: ['-30px', '-20px', '6px', '10px'],
            right: ['16px', '24px', '96px', '106px'],
            zIndex: 1,
            width: [140, 160, 200, 216],
            height: [140, 160, 200, 216],
            pointerEvents: 'none',
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

type InfoProps = {
  address?: Address;
  isWhiteListed: boolean;
  whiteStatus: 'idle' | 'loading' | 'yes' | 'no';
  phaseTimes: { whitelistStartTime?: number; publicStartTime?: number };
  tokenInfo: {
    maxSupply?: number;
    currentSupply?: number;
    whitelistMaxPerAddress?: number;
    publicMaxPerAddress?: number;
    whitelistPrice?: string;
    publicPrice?: string;
    transferable?: boolean;
  };
};

function InfoBar({
  address,
  isWhiteListed,
  whiteStatus,
  phaseTimes,
  tokenInfo,
}: InfoProps) {
  const T = useT();
  return (
    <Box
      mt={2}
      p={2}
      sx={{
        background: 'rgba(255,255,255,0.6)',
        borderRadius: '8px',
        border: '1px solid rgba(0,0,0,0.05)',
        maxWidth: ['100%', '100%', '820px', '960px'],
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
      }}
    >
      <Typography fontWeight={600} fontSize={14} color="#272D37" mb={1}>
        {T({ en: 'Mint Configuration', zh: '铸造配置' })}
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2} fontSize={13} color="#444">
        <InfoItem
          label={T({ en: 'Wallet', zh: '钱包地址' })}
          value={
            address
              ? shortAddress(address)
              : T({ en: 'Not connected', zh: '未连接' })
          }
        />
        <InfoItem
          label={T({ en: 'Whitelist', zh: '白名单' })}
          value={renderWhiteStatus(whiteStatus, isWhiteListed, T)}
        />
        <InfoItem
          label={T({ en: 'Supply', zh: '供应' })}
          value={
            tokenInfo.currentSupply !== undefined &&
            tokenInfo.maxSupply !== undefined
              ? `${tokenInfo.currentSupply}/${tokenInfo.maxSupply}`
              : '—'
          }
        />
        <InfoItem
          label={T({ en: 'Whitelist cap', zh: '白名单限额' })}
          value={tokenInfo.whitelistMaxPerAddress ?? '—'}
        />
        <InfoItem
          label={T({ en: 'Public cap', zh: '公开限额' })}
          value={tokenInfo.publicMaxPerAddress ?? '—'}
        />
        <InfoItem
          label={T({ en: 'Whitelist price', zh: '白名单价格' })}
          value={tokenInfo.whitelistPrice ?? '—'}
        />
        <InfoItem
          label={T({ en: 'Public price', zh: '公开价格' })}
          value={tokenInfo.publicPrice ?? '—'}
        />
        <InfoItem
          label={T({ en: 'Transferable', zh: '可转移' })}
          value={
            tokenInfo.transferable === undefined
              ? '—'
              : tokenInfo.transferable
              ? T({ en: 'Yes', zh: '可转移' })
              : T({ en: 'No (SBT)', zh: '不可转移' })
          }
        />
        <InfoItem
          label={T({ en: 'Whitelist start', zh: '白名单开始' })}
          value={
            phaseTimes.whitelistStartTime
              ? `${formatTs(phaseTimes.whitelistStartTime)} (Local)`
              : '—'
          }
        />
        <InfoItem
          label={T({ en: 'Public start', zh: '公开开始' })}
          value={
            phaseTimes.publicStartTime
              ? `${formatTs(phaseTimes.publicStartTime)} (Local)`
              : '—'
          }
        />
      </Box>
    </Box>
  );
}

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box sx={{ minWidth: 140, flex: '1 1 180px' }}>
      <Typography fontSize={12} color="#666" mb={0.5}>
        {label}
      </Typography>
      <Typography fontSize={13} color="#272D37">
        {value}
      </Typography>
    </Box>
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

function formatTs(ts?: number) {
  if (!ts) return '';
  const d = new Date(ts * 1000);
  return d.toLocaleString();
}

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function formatEth(val?: bigint | number | string) {
  if (val === undefined || val === null) return undefined;
  try {
    const normalized =
      typeof val === 'bigint'
        ? val
        : typeof val === 'number'
        ? BigInt(val)
        : BigInt(val);
    if (normalized === 0n) return 'Free Mint';
    return `${Number(formatEther(normalized)).toString()} ETH`;
  } catch (e) {
    return undefined;
  }
}

function renderWhiteStatus(
  status: 'idle' | 'loading' | 'yes' | 'no',
  isWhiteListed: boolean,
  T: ReturnType<typeof useT>
) {
  if (status === 'loading') return T({ en: 'Checking…', zh: '检查中…' });
  if (isWhiteListed || status === 'yes')
    return T({ en: 'Whitelisted', zh: '白名单' });
  if (status === 'no') return T({ en: 'Not whitelisted', zh: '非白名单' });
  return '—';
}
