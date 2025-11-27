import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useT } from '@/hooks/useGetLang';

function HowItWork() {
  const T = useT();

  return (
    <Box bgcolor={'#EFEFEF'}>
      <Container sx={{ py: 6 }}>
        <Typography
          fontWeight="bold"
          fontSize={32}
          lineHeight={'42px'}
          color={'#222935'}
          component="h2"
        >
          {T({
            en: 'How do Ethereum network upgrades work?',
            zh: '以太坊网络升级是如何运作的？',
          })}
        </Typography>
        <Typography variant="body1" color={'#5F6D7E'} mt={3}>
          {T({
            en: `Ethereum network upgrades require explicit opt-in from node operators on the network. While client developers come to consensus on what EIPs are included in an upgrade, they are not the ultimate deciders of its adoption.`,
            zh: `以太坊网络升级需要网络上的节点操作员明确选择加入。虽然客户端开发者就升级中包含哪些 EIP 达成共识，但他们并不是升级采用的最终决定者。`,
          })}
        </Typography>
        <Typography variant="body1" color={'#5F6D7E'} mt={4}>
          {T({
            en: `For the upgrade to go live, validators and non-staking nodes must manually update their software to support the protocol changes being introduced.`,
            zh: `为了使升级生效，验证者和非质押节点必须手动更新其软件以支持引入的协议更改。`,
          })}
        </Typography>
        <Typography variant="body1" color={'#5F6D7E'} mt={4}>
          {T({
            en: `If they use an Ethereum client that is not updated to the latest version, at the fork block, it will disconnect from upgraded peers, leading to a fork on the network. In this scenario, each subset of the network nodes will only stay connected with those who share their (un)upgraded status.`,
            zh: `如果他们使用的以太坊客户端未更新到最新版本，在分叉区块时，它将与升级的节点断开连接，从而导致网络分叉。在这种情况下，网络节点的每个子集将仅与共享其（未）升级状态的节点保持连接。`,
          })}
        </Typography>
        <Typography variant="body1" color={'#5F6D7E'} mt={4}>
          {T({
            en: `While most Ethereum upgrades are non-contentious and cases leading to forks have been rare, the option for node operators to coordinate on whether to support an upgrade or not is a key feature of Ethereum's governance.`,
            zh: `虽然大多数以太坊升级都是无争议的，并且导致分叉的情况很少见，但节点操作员协调是否支持升级的选择是以太坊治理的一个关键特征。`,
          })}
        </Typography>
      </Container>
    </Box>
  );
}

export default React.memo(HowItWork);
