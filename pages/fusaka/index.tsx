import React from 'react';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import Banner from '@/components/fusaka/Banner';
import MintNFT from '@/components/fusaka/MintNFT';
import WhyCalled from '@/components/fusaka/WhyCalled';
import Relationship from '@/components/Relationship';
import HowItWork from '@/components/fusaka/HowItWork';
import { useT } from '@/hooks/useGetLang';

const RelationshipData = [
  // Core EIPs
  {
    eip: 7594,
    title: 'PeerDAS - Peer Data Availability Sampling',
    description:
      'PeerDAS lets nodes sample and serve different pieces of data while keeping availability verifiable, massively boosting data throughput for rollups.',
  },
  {
    eip: 7823,
    title: 'Set upper bounds for MODEXP',
    description:
      'Caps each MODEXP input to 8192 bits to reduce consensus risk from unbounded inputs and simplify future replacements.',
  },
  {
    eip: 7825,
    title: 'Transaction Gas Limit Cap',
    description:
      'Sets a 16,777,216 gas cap per transaction to prevent single-tx block domination and improve stability.',
  },
  {
    eip: 7883,
    title: 'ModExp Gas Cost Increase',
    description:
      'Raises gas costs for the ModExp precompile (e.g., from 200 to 500 base) to better price heavy operations.',
  },
  {
    eip: 7917,
    title: 'Deterministic proposer lookahead',
    description:
      'Stores a deterministic proposer schedule ahead of time so apps can know future proposers for MEV mitigation and coordination.',
  },
  {
    eip: 7918,
    title: 'Blob base fee bounded by execution cost',
    description:
      'Ensures blob gas has a reserve price tied to execution gas so the blob market cannot collapse to 1 wei when execution dominates.',
  },
  {
    eip: 7934,
    title: 'RLP Execution Block Size Limit',
    description:
      'Adds a ~10 MiB cap (incl. 2 MiB beacon margin) on RLP-encoded block size to avoid propagation/DoS issues.',
  },
  {
    eip: 7939,
    title: 'Count leading zeros (CLZ) opcode',
    description:
      'Introduces a native opcode to count leading zero bits in a 256-bit word, making math/crypto primitives cheaper.',
  },
  {
    eip: 7951,
    title: 'Precompile for secp256r1 Curve Support',
    description:
      'Adds a secp256r1 (P-256) signature verification precompile, enabling common device ecosystems and wallets. Supersedes RIP-7212.',
  },

  // Other EIPs (required/supporting)
  {
    eip: 7892,
    title: "Blob Parameter Only ('BPO') Hardforks",
    description:
      'Defines lightweight blob-only hardforks so Ethereum can tune blob capacity more frequently.',
  },
  {
    eip: 7642,
    title: 'eth/69 - Drop pre-merge fields',
    description:
      'Eth/69 p2p upgrade: advertise served history window, drop unused total difficulty from handshake, remove receipt blooms. Clients MUST support this for Fusaka activation.',
  },
  {
    eip: 7910,
    title: 'eth_config JSON-RPC Method',
    description:
      'Adds eth_config to expose current/next fork config over RPC. Clients MUST support this by Fusaka activation.',
  },
  {
    eip: 7935,
    title: 'Set default gas limit to 60M',
    description:
      'Updates client defaults to 60M gas (from 36M) to align with Fusaka expectations; requires careful testing by client teams.',
  },
];

function Fusaka() {
  const T = useT();
  return (
    <>
      <Head>
        <title>
          Fusaka Upgrade - EIP.Fun - Serve Ethereum Builders, Scale the
          Community.
        </title>
      </Head>
      <Box borderTop={1} borderColor="#EAEBF0" />

      <Banner />

      <MintNFT />

      <WhyCalled />

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

      <HowItWork />
    </>
  );
}

export default Fusaka;
