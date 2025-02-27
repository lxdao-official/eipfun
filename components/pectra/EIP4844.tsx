import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useT } from '@/hooks/useGetLang';

function EIP4844() {
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
            zh: '',
          })}
        </Typography>
        <Typography variant="body1" color={'#5F6D7E'} mt={3}>
          {T({
            en: `Ethereum network upgrades require explicit opt-in from node operators on the network. While client developers come to consensus on what EIPs are included in an upgrade, they are not the ultimate deciders of its adoption.`,
            zh: '',
          })}
        </Typography>
        <Typography variant="body1" color={'#5F6D7E'} mt={4}>
          {T({
            en: `For the upgrade to go live, validators and non-staking nodes must manually update their software to support the protocol changes being introduced.`,
            zh: '',
          })}
        </Typography>{' '}
        <Typography variant="body1" color={'#5F6D7E'} mt={4}>
          {T({
            en: `If they use an Ethereum client that is not updated to the latest version, at the fork block, it will disconnect from upgraded peers, leading to a fork on the network. In this scenario, each subset of the network nodes will only stay connected with those who share their (un)upgraded status.`,
            zh: '',
          })}
        </Typography>
        <Typography variant="body1" color={'#5F6D7E'} mt={4}>
          {T({
            en: `While most Ethereum upgrades are non-contentious and cases leading to forks have been rare, the option for node operators to coordinate on whether to support an upgrade or not is a key feature of Ethereum's governance.`,
            zh: '',
          })}
        </Typography>
      </Container>
    </Box>
  );
}

export default React.memo(EIP4844);
