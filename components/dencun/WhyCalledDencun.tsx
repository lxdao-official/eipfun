import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useT } from '@/hooks/useGetLang';

function WhyCalledDencun() {
  const T = useT();
  return (
    <Container sx={{ py: 8 }}>
      <Typography
        fontWeight="bold"
        fontSize={14}
        lineHeight={'20px'}
        color={'#437EF7'}
        component="h3"
        align="center"
      >
        {T({ en: 'PREFACE', zh: '前言' })}
      </Typography>

      <Typography
        component="h2"
        fontSize={32}
        color={'#272D37'}
        align="center"
        lineHeight={'40px'}
        fontWeight={700}
        mt={1}
      >
        {T({
          en: 'Why is it called the Dencun Upgrade?',
          zh: '什么是坎昆升级？',
        })}
      </Typography>

      <Typography
        variant="body1"
        mx={'auto'}
        lineHeight={'24px'}
        width={800}
        textAlign={'center'}
        mt={2}
        mb={8}
      >
        {T({
          en: "The English name for the Cancun upgrade is actually Dencun, which is composed of two merged names: Deneb and Cancun. Deneb represents the upgrade of Ethereum's Consensus Layer, while Cancun represents the upgrade of Ethereum's Execution Layer.",
          zh: '为什么叫坎昆升级？其实坎昆升级的英文名称为 Dencun，是由两个名字合并组成：Deneb 和 Cancun，其中 Deneb 是以太坊共识层（Consensus Layer）的升级而 Cancun 则是以太坊执行层（Execution Layer）升级。',
        })}
      </Typography>

      <Typography
        variant="body1"
        mx={'auto'}
        lineHeight={'24px'}
        width={800}
        textAlign={'center'}
        pt={3.5}
        mb={8}
        sx={{
          position: 'relative',
          '&::before': {
            content: '"一"',
            position: 'absolute',
            top: 0,
            left: '50%',
            marginLeft: '-7px',
            fontWeight: 700,
            color: '#437EF7',
            fontSize: '14px',
          },
        }}
      >
        {T({
          en: "After Ethereum transitioned to Proof of Stake (PoS), the original Ethereum protocol was split into two layers: the Consensus Layer and the Execution Layer. Here's the difference between these two layers:",
          zh: '在以太坊转向 PoS 之后，原有的以太坊拆分层了两层，即共识层和执行层。那么这两个层分别有什么区别呢？',
        })}
      </Typography>

      <Box display={'flex'}>
        <Box flex={1} mr={3}>
          <Box>
            <Image
              src="/images/dencun/consensus.png"
              alt="consensus layer"
              width={32}
              height={32}
            />
          </Box>
          <Typography
            component="h4"
            fontSize={24}
            color={'#272D37'}
            fontWeight="600"
            lineHeight={'30px'}
            mt={2.5}
          >
            {T({ en: 'Consensus Layer', zh: '坎昆升级' })}
          </Typography>
          <Typography variant="body1" lineHeight={'24px'} mt={1.5}>
            {T({
              en: "This layer is responsible for the network's consensus mechanism, determining which transactions are valid and agreeing on the order of transactions to be added to the blockchain. With the upgrade, Ethereum transitioned from Proof of Work (PoW) to Proof of Stake (PoS) in this layer.",
              zh: '负责网络的共识机制，即针对哪些交易有效以及交易顺序达成一致，将其加入到区块链中。经过升级之后，以太坊从工作量证明（PoW）转变成了权益证明（PoS）。',
            })}
          </Typography>
        </Box>

        <Box flex={1}>
          <Box>
            <Image
              src="/images/dencun/execution.png"
              alt="execution layer"
              width={32}
              height={32}
            />
          </Box>
          <Typography
            component="h4"
            fontSize={24}
            color={'#272D37'}
            fontWeight="600"
            lineHeight={'30px'}
            mt={2.5}
          >
            {T({ en: 'Execution Layer', zh: '执行层' })}
          </Typography>
          <Typography variant="body1" lineHeight={'24px'} mt={1.5}>
            {T({
              en: "This layer handles all computations related to state changes, such as validating transactions, executing smart contracts, updating account balances, and maintaining Ethereum's state tree. The Execution Layer also includes permanent storage spaces such as Calldata.",
              zh: '处理所有关于状态变化的计算，比如检查交易是否合法、智能合约执行、账户余额更新等，并且维护以太坊的状态树。执行层同时也包括 Calldata 等永久存储空间。',
            })}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default React.memo(WhyCalledDencun);
