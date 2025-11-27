import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Button,
  ButtonProps,
  Typography,
  Link,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  CircularProgress,
  Tooltip,
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
import { useAccountModal } from '@rainbow-me/rainbowkit';
import { useDisconnect } from 'wagmi';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const MintButton = styled(Button)<ButtonProps>(() => ({
  color: '#f9e67a',
  background: 'linear-gradient(135deg, #ffce6b 0%, #ff6ac9 60%, #8be1ff 100%)',
  boxShadow:
    '0 12px 25px rgba(255,106,201,0.35), 0 0 18px rgba(255,206,107,0.55)',
  fontWeight: 700,
  '&:hover': {
    background: 'linear-gradient(135deg, #ffd98a 0%, #ff7bd3 60%, #9ae7ff 100%)',
    boxShadow:
      '0 14px 28px rgba(255,106,201,0.45), 0 0 22px rgba(255,206,107,0.75)',
  },
  '&:disabled': {
    background: 'rgba(255,255,255,0.08)',
    color: '#9aa0b5',
    boxShadow: 'none',
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
  const [amount, setAmount] = useState<string>('1');
  const [phaseTimes, setPhaseTimes] = useState<{
    whitelistStartTime?: number;
    publicStartTime?: number;
  }>({});
  const [txHash, setTxHash] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'pending'>('success');
  const [modalMessage, setModalMessage] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<{
    maxSupply?: number;
    currentSupply?: number;
    whitelistMaxPerAddress?: number;
    publicMaxPerAddress?: number;
    whitelistPrice?: string;
    publicPrice?: string;
    transferable?: boolean;
  }>({});
  const [isTokenInfoLoading, setIsTokenInfoLoading] = useState(true);

  const {
    data: hash,
    isLoading,
    writeContractAsync,
  }: UseWriteContractReturnType = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isConfirmError,
    error: confirmError,
  } =
    useWaitForTransactionReceipt({
      hash,
    });
  const [isMinted, setIsMinted] = useState(false);
  const [IAddress, setIAddress] = useState<Address | undefined>();
  const { switchChain } = useSwitchChain();
  const { disconnect } = useDisconnect();
const openseaBase = isMainnet
  ? 'https://opensea.io/assets/ethereum'
  : 'https://testnets.opensea.io/assets/sepolia';
const openseaTokenUrl = `${openseaBase}/${CONTRACT_ADDRESS}/${TOKEN_ID}`;
const etherscanBase = (() => {
  if (ChainId === 1) return 'https://etherscan.io';
  if (ChainId === 11155111) return 'https://sepolia.etherscan.io';
  return process.env.NEXT_PUBLIC_ETHERSCAN_URL || 'https://etherscan.io';
})();
const whitelistCap = tokenInfo.whitelistMaxPerAddress ?? 5;
const whitelistRemaining = Math.max(whitelistCap - num, 0);
const [minting, setMinting] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const pendingMessage = T({
    en: 'Transaction submitted. Waiting for confirmation.',
    zh: '交易已提交，等待链上确认。',
  });
  const exceedMessage = T({
    en: 'Exceeds whitelist allocation.',
    zh: '超过白名单限额。',
  });
  const successMessage = T({
    en: 'Transaction confirmed!',
    zh: '交易已确认！',
  });

  useEffect(() => {
    if (address) {
      setIAddress(address);
    } else {
      setIAddress(undefined);
      setIsWhiteListed(false);
      setWhiteStatus('idle');
      setProof(undefined);
      setNum(0);
    }
  }, [address]);
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const subtitle = (() => {
    if (isTokenInfoLoading) {
      return T({
        en: 'Loading information from smart contract…',
        zh: '正在加载合约信息…',
      });
    }
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
      const whitelistCap = tokenInfo.whitelistMaxPerAddress ?? 5;
      const remaining = Math.max(whitelistCap - num, 0);
      const nextAmount =
        remaining <= 0 ? '' : String(Math.min(Math.max(1, remaining), whitelistCap));
      setAmount(nextAmount);
    }
  }, [phase, num, tokenInfo.whitelistMaxPerAddress]);

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
        setIsTokenInfoLoading(false);
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
            setIsTokenInfoLoading(false);
          })
          .catch(() => {
            setIsTokenInfoLoading(false);
          });
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
    v = v.replace(/[^0-9]/g, '').slice(0, 2);
    setAmount(v);
  };

  const mint = async () => {
    const wagmiPending = hash ? isLoading || isConfirming : false;
    const isMintingNow = wagmiPending || minting;
    if (isMintingNow) return;
    if (chain?.id !== ChainId) {
      try {
        await switchChain({ chainId: ChainId });
      } catch (e: any) {
        setModalType('error');
        setModalMessage(
          e?.shortMessage ||
            e?.message ||
            T({
              en: 'Unable to switch network. Please switch to the required chain and try again.',
              zh: '无法切换到目标网络，请手动切换后重试。',
            })
        );
        setModalOpen(true);
        return;
      }
    }
    try {
      let tx: Address | undefined;
      const whitelistCap = tokenInfo.whitelistMaxPerAddress ?? 5;
      const remaining = Math.max(whitelistCap - num, 0);
      const desired = Number(amount || 0) || 0;
      if (desired < 1) {
        setModalType('error');
        setModalMessage(
          T({ en: 'Amount must be at least 1.', zh: '数量不能小于 1。' })
        );
        setModalOpen(true);
        setMinting(false);
        return;
      }
      const mintAmount = Math.min(desired, remaining || whitelistCap || 1);
      if (phase === Phase.Public) {
        setMinting(true);
        tx = (await writeContractAsync({
          ...wagmiContract,
          functionName: 'publicMint',
          args: [TOKEN_ID, 1],
        })) as Address;
      } else if (phase === Phase.Whitelist) {
        if (!isWhiteListed || !proof || proof.length === 0) {
          setModalType('error');
          setModalMessage(
            T({ en: 'Not whitelisted or missing proof.', zh: '非白名单或缺少验证信息。' })
          );
          setModalOpen(true);
          setMinting(false);
          return;
        }
        if (mintAmount <= 0) {
          setModalType('error');
          setModalMessage(exceedMessage);
          setModalOpen(true);
          setMinting(false);
          return;
        }
        if (Number(amount || 0) > remaining) {
          setAmount(String(Math.max(remaining, 1)));
          setModalType('error');
          setModalMessage(exceedMessage);
          setModalOpen(true);
          setMinting(false);
          return;
        }
        setMinting(true);
        tx = (await writeContractAsync({
          ...wagmiContract,
          functionName: 'whitelistMint',
          args: [TOKEN_ID, mintAmount, proof],
        })) as Address;
      }
      if (tx) {
        setTxHash(tx as unknown as string);
        setModalType('pending');
        setModalMessage(pendingMessage);
        setModalOpen(true);
      } else {
        setMinting(false);
      }
    } catch (e: any) {
      setModalType('error');
      setModalMessage(parseErrorMessage(e, 'Transaction failed'));
      setModalOpen(true);
      setMinting(false);
    }
  };

  const mintOrConnectWallet = () => {
    if (IAddress) {
      mint();
    } else {
      openConnectModal && openConnectModal();
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      setIsMinted(true);
      setModalType('success');
      setModalMessage(successMessage);
      setModalOpen(true);
      setMinting(false);
    }
  }, [isConfirmed, successMessage]);

  useEffect(() => {
    if (isConfirmError && confirmError) {
      setModalType('error');
      setModalMessage(parseErrorMessage(confirmError, 'Transaction failed'));
      setModalOpen(true);
      setMinting(false);
    }
  }, [isConfirmError, confirmError]);

  useEffect(() => {
    if (hash) {
      setTxHash(hash);
      setModalType('pending');
      setModalMessage(pendingMessage);
      setModalOpen(true);
    }
  }, [hash, pendingMessage]);

  const wagmiPending = hash ? isLoading || isConfirming : false;
  const isMinting = wagmiPending || minting;
  const renderMintLabel = (label: string) =>
    isMinting ? (
      <Stack direction="row" spacing={1} alignItems="center">
        <CircularProgress size={16} color="inherit" />
        <span>{T({ en: 'Processing', zh: '处理中' })}</span>
      </Stack>
    ) : (
      label
    );

  return (
    <Container id="mint-nft">
      <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '18px',
        background:
          'radial-gradient(circle at 30% 20%, rgba(255,94,255,0.2), transparent 32%), radial-gradient(circle at 70% 10%, rgba(255,195,113,0.24), transparent 30%), radial-gradient(circle at 50% 80%, rgba(72,186,255,0.25), transparent 38%), linear-gradient(135deg, #090b15 0%, #0f1224 45%, #070910 100%)',
        color: '#f6f6ff',
        boxShadow: '0 25px 60px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.03)',
      }}
      minHeight={['auto', 'auto', 380, 420]}
      pt={[5, 5, 6, 6]}
      pb={[16, 14, 10, 10]}
      px={[3, 4, 5, 6]}
      >
        <>
          <Typography
            fontWeight="600"
            fontSize={18}
            color={'#ffca66'}
            component="h3"
            textTransform={'uppercase'}
            letterSpacing={1}
            sx={{ textShadow: '0 0 14px rgba(255,202,102,0.4)' }}
          >
            {T({ en: 'Fusaka Upgrade', zh: 'Fusaka 升级' })}
          </Typography>

          <Typography
            component="h2"
            fontSize={[30, 34, 40, 44]}
            lineHeight={'1.15'}
            fontWeight={800}
            color={'#f4f7ff'}
            mt={1}
            letterSpacing={0.2}
            sx={{ textShadow: '0 0 20px rgba(255,96,204,0.35)' }}
          >
            {T({
              en: 'Fusaka Mainnet Fork NFT',
              zh: 'Fusaka 升级纪念 NFT',
            })}
          </Typography>

          <Typography
            fontWeight={400}
            fontSize={16}
            color={'#d5d9ff'}
            lineHeight={'24px'}
            component="h4"
            mt={2}
          >
            <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
              <span>{subtitle}</span>
              <Link
                href="https://opensea.io/collection/memory-of-ethereum"
                target="_blank"
                underline="hover"
                sx={{ color: '#f9e67a', fontWeight: 600, fontSize: 14 }}
              >
                OpenSea
              </Link>
              <Link
                href={`${etherscanBase}/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                underline="hover"
                sx={{ color: '#f9e67a', fontWeight: 600, fontSize: 14 }}
              >
                Etherscan
              </Link>
            </Box>
          </Typography>

          <Box pr={[0, 0, 16, 18]}>
            <InfoBar
              address={IAddress}
              isWhiteListed={isWhiteListed}
              whiteStatus={whiteStatus}
              phaseTimes={phaseTimes}
              tokenInfo={tokenInfo}
              onConnect={openConnectModal || undefined}
              onManageAccount={openAccountModal || undefined}
              onDisconnect={disconnect}
              hydrated={isHydrated}
            />
          </Box>

          <Box mt={3} mb={[6, 6, 4, 3]} pr={[0, 0, 16, 18]}>
            {/* 未开始 */}
            {phase === 0 && (
              <>
                <MintButton disabled={true}>
                  {T({ en: 'Coming Soon', zh: '即将开始' })}
                </MintButton>
                <Typography
                  fontWeight={400}
                  fontSize={14}
                  color={'#c8cff3'}
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
                <MintButton
                  disabled={
                    isMinting ||
                    !isWhiteListed ||
                    !proof?.length ||
                    whitelistRemaining <= 0
                  }
                  onClick={mintOrConnectWallet}
                >
                  {isWhiteListed
                    ? renderMintLabel(T({ en: 'Mint', zh: '铸造' }))
                    : T({ en: 'Not whitelisted ', zh: '非白名单' })}
                </MintButton>

                <TextField
                  sx={{
                    width: '90px',
                    ml: 2,
                    mt: 0.5,
                    '& .MuiInputBase-root': {
                      background: 'rgba(12,14,24,0.9)',
                      color: '#f8f9ff',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,106,201,0.4)',
                    },
                    '& label': { color: '#c1c7ff' },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,106,201,0.4)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,106,201,0.7)',
                    },
                    '& .MuiInputBase-input': { color: '#f8f9ff' },
                  }}
                  id="outlined-basic"
                  label={T({ en: 'Amount', zh: '数量' })}
                  variant="outlined"
                  size="small"
                  type="text"
                  value={amount}
                  onChange={handleChangeAmount}
                  disabled={!isWhiteListed}
                  onBlur={() => setAmount((v) => (v ? v : '1'))}
                />

                <Typography
                  fontWeight={400}
                  fontSize={14}
                  color={'#c8cff3'}
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
                <MintButton
                  disabled={isMinting}
                  onClick={mintOrConnectWallet}
                >
                  {renderMintLabel(T({ en: 'Mint', zh: '铸造' }))}
                </MintButton>
                <Typography
                  fontWeight={400}
                  fontSize={14}
                  color={'#c8cff3'}
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
                  color={'#c8cff3'}
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
          </Box>
        </>

        <ResultModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          type={modalType}
          txHash={(txHash as Address | undefined) || (hash as Address | undefined)}
          etherscanBase={etherscanBase}
          openseaTokenUrl={openseaTokenUrl}
          message={modalMessage}
        />

        <Box
          sx={{
            position: 'absolute',
            top: ['auto', 'auto', '18px', '28px'],
            right: ['10px', '20px', '40px', '60px'],
            bottom: ['-8px', '-6px', 'auto', 'auto'],
            zIndex: 1,
            width: [200, 220, 280, 320],
            height: [200, 220, 280, 320],
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 24px rgba(255,106,201,0.45)) drop-shadow(0 0 30px rgba(0,255,255,0.2))',
          }}
        >
          <Image
            src="/images/fusaka/fusaka.png"
            alt="Fusaka NFT"
            width={320}
            height={320}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transform: 'translateY(-50%)',
              position: 'absolute',
              top: '50%',
              right: 0,
            }}
            priority
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
  onConnect?: () => void;
  onManageAccount?: () => void;
  onDisconnect?: () => void;
  hydrated: boolean;
};

function InfoBar({
  address,
  isWhiteListed,
  whiteStatus,
  phaseTimes,
  tokenInfo,
  onConnect,
  onManageAccount,
  onDisconnect,
  hydrated,
}: InfoProps) {
  const T = useT();
  return (
    <Box
      mt={2}
      p={2}
      sx={{
        background:
          'linear-gradient(145deg, rgba(35,38,61,0.78), rgba(18,21,35,0.78))',
        borderRadius: '14px',
        border: '1px solid rgba(255,94,204,0.4)',
        maxWidth: ['100%', '100%', '720px', '780px'],
        boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 0 35px rgba(255,94,204,0.16)',
      }}
    >
      <Typography
        fontWeight={700}
        fontSize={15}
        color="#ffe7a4"
        mb={1.5}
        sx={{ textShadow: '0 0 12px rgba(255,231,164,0.35)' }}
      >
        {T({ en: 'Mint Configuration', zh: '铸造配置' })}
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        fontSize={13}
        color="#dfe4ff"
      >
        <InfoItem
          label={T({ en: 'Wallet', zh: '钱包地址' })}
          value={
            <Box>
              <Typography
                fontSize={13}
                color="#f9e67a"
                fontWeight={700}
                sx={{ textShadow: '0 0 10px rgba(249,230,122,0.35)' }}
              >
                {address
                  ? shortAddress(address)
                  : T({ en: 'Not connected', zh: '未连接' })}
              </Typography>
              {hydrated && (
                <Box display="flex" gap={1} mt={0.5} flexWrap="wrap">
                  {!address && onConnect && (
                    <MintButton
                      size="small"
                      sx={{ height: 28, px: 1.5, fontSize: 12 }}
                      onClick={onConnect}
                    >
                      {T({ en: 'Connect Wallet', zh: '连接钱包' })}
                    </MintButton>
                  )}
                  {address && (
                    <>
                      {onManageAccount && (
                        <MintButton
                          size="small"
                          sx={{
                            height: 28,
                            px: 1.5,
                            fontSize: 12,
                            background: 'rgba(255,255,255,0.08)',
                            color: '#f9e67a',
                            boxShadow: '0 0 14px rgba(249,230,122,0.35)',
                          }}
                          onClick={onManageAccount}
                        >
                          {T({ en: 'Manage', zh: '账户' })}
                        </MintButton>
                      )}
                      {onDisconnect && (
                        <MintButton
                          size="small"
                          sx={{
                            height: 28,
                            px: 1.5,
                            fontSize: 12,
                            background: 'rgba(255,255,255,0.12)',
                            color: '#f9e67a',
                            boxShadow: '0 0 14px rgba(249,230,122,0.35)',
                          }}
                          onClick={() => onDisconnect()}
                        >
                          {T({ en: 'Disconnect', zh: '断开' })}
                        </MintButton>
                      )}
                    </>
                  )}
                </Box>
              )}
            </Box>
          }
        />
        <InfoItem
          label={
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography component="span" fontSize={12} color="#9ba2c9">
                {T({ en: 'Whitelist', zh: '白名单' })}
              </Typography>
              {(() => {
                const tipItems = [
                  T({
                    en: 'Notable Ethereum builder addresses (ENS)',
                    zh: '知名 Ethereum Builder 地址（ENS）',
                  }),
                  T({
                    en: 'Protocol Guild membership (ENS)',
                    zh: 'Protocol Guild 成员地址（ENS）',
                  }),
                  T({
                    en: 'Addresses that minted Memory of Ethereum on Optimism',
                    zh: '曾在 Optimism 铸造过 Memory of Ethereum 的地址',
                  }),
                  T({
                    en: 'LXDAO & ETHPanda Ethereum builders',
                    zh: 'LXDAO 与 ETHPanda 社区的以太坊建设者',
                  }),
                ];
                return (
              <Tooltip
                title={
                  <Box component="ul" sx={{ m: 0, pl: 2.5, fontSize: 12, lineHeight: 1.6 }}>
                    <Typography
                      fontWeight={700}
                      component="li"
                      sx={{ listStyle: 'none', mb: 0.5, color: '#f9e67a' }}
                    >
                      {T({ en: 'Whitelist range includes:', zh: '白名单范围包括：' })}
                    </Typography>
                    {tipItems.map((item, idx) => (
                      <Box
                        key={idx}
                        component="li"
                        sx={{ listStyle: 'disc', ml: 1, color: '#f2f3ff' }}
                      >
                        {item}
                      </Box>
                    ))}
                  </Box>
                }
                placement="top"
                arrow
              >
                <InfoOutlinedIcon
                  fontSize="small"
                  sx={{ color: '#f9e67a', cursor: 'pointer' }}
                />
              </Tooltip>
                );
              })()}
            </Box>
          }
          value={renderWhiteStatus(whiteStatus, isWhiteListed, T)}
        />
        <InfoItem
          label={
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography component="span" fontSize={12} color="#9ba2c9">
                {T({ en: 'Supply', zh: '供应' })}
              </Typography>
              <Tooltip
                title={
                  <Box component="ul" sx={{ m: 0, pl: 2.5, fontSize: 12, lineHeight: 1.6 }}>
                    <Typography
                      fontWeight={700}
                      component="li"
                      sx={{ listStyle: 'none', mb: 0.5, color: '#f9e67a' }}
                    >
                      {T({ en: 'Max supply & burn logic', zh: '最大供应与销毁逻辑' })}
                    </Typography>
                    <Box component="li" sx={{ listStyle: 'disc', ml: 1, color: '#f2f3ff' }}>
                      {T({
                        en: 'Max supply is fixed on-chain for this token.',
                        zh: '该 Token 的最大供应量在链上固定。',
                      })}
                    </Box>
                    <Box component="li" sx={{ listStyle: 'disc', ml: 1, color: '#f2f3ff' }}>
                      {T({
                        en: 'Unminted supply will be removed/burned after the mint window closes.',
                        zh: '铸造窗口结束后，未铸造的剩余供应将被移除/销毁。',
                      })}
                    </Box>
                  </Box>
                }
                placement="top"
                arrow
              >
                <InfoOutlinedIcon
                  fontSize="small"
                  sx={{ color: '#f9e67a', cursor: 'pointer' }}
                />
              </Tooltip>
            </Box>
          }
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

function InfoItem({
  label,
  value,
}: {
  label: string | React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <Box sx={{ minWidth: 140, flex: '1 1 180px' }}>
      {typeof label === 'string' ? (
        <Typography component="div" fontSize={12} color="#9ba2c9" mb={0.5}>
          {label}
        </Typography>
      ) : (
        <Box fontSize={12} color="#9ba2c9" mb={0.5} display="flex" alignItems="center" gap={0.5}>
          {label}
        </Box>
      )}
      {typeof value === 'string' || typeof value === 'number' ? (
        <Typography fontSize={13} color="#f7f7ff" fontWeight={600}>
          {value}
        </Typography>
      ) : (
        <Box fontSize={13} color="#f7f7ff" fontWeight={600}>
          {value}
        </Box>
      )}
    </Box>
  );
}

function Icons() {
  return (
    <Box display="flex" gap={1} alignItems="center" bgcolor="rgba(0,0,0,0.08)" px={1} py={0.5} borderRadius={1}>
      <Link
        sx={{
          height: 32,
          width: 32,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.08)',
        }}
        target="_blank"
        href="https://opensea.io/collection/memory-of-ethereum"
      >
        <Image
          src="/images/dencun/opensea.png"
          alt="etherscan"
          width={18}
          height={18}
        />
      </Link>
      <Link
        sx={{
          height: 32,
          width: 32,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.08)',
        }}
        target="_blank"
        href={`${process.env.NEXT_PUBLIC_ETHERSCAN_URL}/address/${CONTRACT_ADDRESS}`}
      >
        <Image
          src="/images/dencun/etherscan.png"
          alt="etherscan"
          width={18}
          height={18}
        />
      </Link>
    </Box>
  );
}

function ResultModal({
  open,
  onClose,
  type,
  txHash,
  etherscanBase,
  openseaTokenUrl,
  message,
}: {
  open: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'pending';
  txHash?: Address;
  etherscanBase?: string;
  openseaTokenUrl?: string;
  message?: string;
}) {
  const T = useT();
  const txUrl =
    txHash && etherscanBase ? `${etherscanBase}/tx/${txHash}` : undefined;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Stack direction="row" spacing={1} alignItems="center">
          {type === 'success' ? (
            <CheckCircleOutlineIcon sx={{ color: '#2e7d32' }} />
          ) : type === 'pending' ? (
            <HourglassTopIcon sx={{ color: '#ed6c02' }} />
          ) : (
            <ErrorOutlineIcon sx={{ color: '#d32f2f' }} />
          )}
          <Typography fontWeight={700} fontSize={18}>
            {type === 'success'
              ? T({ en: 'Mint Successful', zh: '铸造成功' })
              : type === 'pending'
              ? T({ en: 'Mint Pending', zh: '交易确认中' })
              : T({ en: 'Mint Failed', zh: '铸造失败' })}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Typography fontSize={14} color="#444" mb={2}>
          {type === 'success'
            ? T({
                en: 'You can view your NFT or transaction details below.',
                zh: '可以在下方查看你的 NFT 或交易详情。',
              })
            : message ||
              T({
                en: 'Transaction failed. Please try again.',
                zh: '交易失败，请重试。',
              })}
        </Typography>
        {openseaTokenUrl && (
          <Box mb={1}>
            <Link href={openseaTokenUrl} target="_blank" underline="hover">
              {T({ en: 'View on OpenSea', zh: '在 OpenSea 查看' })}
            </Link>
          </Box>
        )}
        {txUrl && (
          <Box mb={1}>
            <Link href={txUrl} target="_blank" underline="hover">
              {T({ en: 'View on Etherscan', zh: '在 Etherscan 查看' })}
            </Link>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {T({ en: 'Close', zh: '关闭' })}
        </Button>
      </DialogActions>
    </Dialog>
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

function parseErrorMessage(err: any, fallback: string) {
  return (
    err?.cause?.shortMessage ||
    err?.shortMessage ||
    err?.cause?.message ||
    err?.message ||
    fallback
  );
}
