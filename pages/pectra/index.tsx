import React from 'react';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import Banner from '@/components/pectra/Banner';
import MintNFT from '@/components/pectra/MintNFT';
import WhyCalledDencun from '@/components/pectra/WhyCalledDencun';
import Relationship from '@/components/pectra/Relationship';
import EIP4844 from '@/components/pectra/EIP4844';
import FutureOutlook from '@/components/pectra/FutureOutlook';
import { useT } from '@/hooks/useGetLang';

const RelationshipData = [
  {
    eip: 2537,
    title: 'Precompile for BLS12-381 curve operations',
    description: '',
  },
  {
    eip: 2935,
    title: 'Save historical block hashes in state',
    description: '',
  },
  {
    eip: 6110,
    title: 'Supply validator deposits on chain',
    description: '',
  },
  {
    eip: 7002,
    title: ' Execution layer triggerable exits',
    description: '',
  },
  {
    eip: 7251,
    title: 'Increase the MAX_EFFECTIVE_BALANCE',
    description: '',
  },
  {
    eip: 7549,
    title: 'Move committee index outside Attestation',
    description: '',
  },
  {
    eip: 7623,
    title: 'Increase calldata cost',
    description: '',
  },
  {
    eip: 7685,
    title: 'General purpose execution layer requests',
    description: '',
  },
  {
    eip: 7691,
    title: 'Blob throughput increase',
    description: '',
  },
  {
    eip: 7702,
    title: 'Set EOA account code',
    description: '',
  },
  {
    eip: 7840,
    title: 'Add blob schedule to EL config files',
    description: '',
  },
];

function Pectra() {
  const T = useT();
  return (
    <>
      <Head>
        <title>
          Pectra upgrade - EIP.Fun - Serve Ethereum Builders, Scale the
          Community.
        </title>
      </Head>
      <Box borderTop={1} borderColor="#EAEBF0" />

      <Banner />

      <MintNFT />

      <WhyCalledDencun />

      <Container sx={{ py: 6 }}>
        <Typography
          fontWeight="bold"
          fontSize={32}
          lineHeight={'42px'}
          color={'#272D37'}
          component="h2"
          pb={3}
        >
          {T({ en: 'Related EIPs for this upgrade', zh: '相关 EIP 升级' })}
        </Typography>

        <Relationship data={RelationshipData} />
      </Container>

      <EIP4844 />

      <FutureOutlook />
    </>
  );
}

export default Pectra;
