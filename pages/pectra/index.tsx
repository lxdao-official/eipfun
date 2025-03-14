import React from 'react';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import Banner from '@/components/pectra/Banner';
import MintNFT from '@/components/pectra/MintNFT';
import WhyCalled from '@/components/pectra/WhyCalled';
import Relationship from '@/components/pectra/Relationship';
import HowItWork from '@/components/pectra/HowItWork';
import { useT } from '@/hooks/useGetLang';

const RelationshipData = [
  {
    eip: 2537,
    title: 'Precompile for BLS12-381 curve operations',
    description:
      'This proposal defines a standard for implementing BLS12-381 curve operations in Ethereum. It specifies a set of precompiled contracts to perform these operations efficiently on the Ethereum Virtual Machine (EVM). This is an important step towards improving the security and efficiency of cryptographic operations on the Ethereum network.',
  },
  {
    eip: 2935,
    title: 'Save historical block hashes in state',
    description:
      "EIP-2935 proposes storing the last 8192 block hashes in a system contract to support stateless clients in Ethereum. This enables clients to access recent block hashes without storing them locally. It introduces a ring buffer for efficient retrieval and doesn't change how the BLOCKHASH function works. The goal is to make it easier for stateless clients and rollups to access historical block data.",
  },
  {
    eip: 6110,
    title: 'Supply validator deposits on chain',
    description:
      'This proposal adds validator deposits directly to the Execution Layer block, shifting the responsibility for deposit inclusion and validation from the Consensus Layer to the Execution Layer. This removes the need for deposit voting in the Consensus Layer and simplifies the deposit processing, improving validator UX and security. The list of validator deposits in a block is derived from deposit contract log events. The proposal introduces minimal data complexity and does not increase the risk of DoS attacks on the Execution Layer.',
  },
  {
    eip: 7002,
    title: ' Execution layer triggerable exits',
    description:
      'EIP-7002 allows validators to trigger withdrawals using their execution layer (0x01) withdrawal credentials, not just the active key. This enables the owner of the withdrawal credentials to independently exit and withdraw staked ETH, even if the active key is lost. The system includes a contract that queues requests, applies dynamic fees to prevent abuse, and processes them in each block.',
  },
  {
    eip: 7251,
    title: 'Increase the MAX_EFFECTIVE_BALANCE',
    description:
      'Increase MAX_EFFECTIVE_BALANCE while keeping the 32 ETH minimum staking balance. This change allows larger validators to consolidate into fewer validators and gives smaller validators the ability to stake in more flexible increments. The goal is to reduce the validator set size, improve network efficiency, and allow both small and large validators to benefit from compounding rewards.',
  },
  {
    eip: 7549,
    title: 'Move committee index outside Attestation',
    description:
      'EIP-7549 proposes moving the committee index outside of the signed Attestation message to improve efficiency in Casper FFG clients. This change reduces the number of pairings needed to verify consensus rules and lowers the number of attestations required to reach a 2/3 threshold. By separating the committee index, the proposal also allows more efficient packing of attestations into beacon blocks, increasing the total voting capacity.',
  },
  {
    eip: 7623,
    title: 'Increase calldata cost',
    description:
      'Increasing the calldata cost for transactions that predominantly post data, aiming to reduce the maximum block size and improve block space efficiency. By raising calldata costs from 4/16 to 10/40 gas per byte for data-heavy transactions, the proposal limits the block size without affecting most users, who typically rely on calldata for EVM operations. This change will reduce the maximum Execution Layer payload size, allowing more blobs in preparation for EIP-4844. ',
  },
  {
    eip: 7685,
    title: 'General purpose execution layer requests',
    description:
      'This proposal introduces a general-purpose framework to store and share contract-triggered requests between the Execution Layer and Consensus Layer. The approach simplifies the addition of new request types, enhances flexibility, and improves overall system safety by delegating operations to smart contracts.',
  },
  {
    eip: 7691,
    title: 'Blob throughput increase',
    description:
      'Increase the number of blobs per block on Ethereum to 6 (with a max of 9) to boost scalability for Layer 2 solutions. This change aims to improve throughput in the short term, based on test results and network monitoring, and adjusts the base fee update to balance the impact.',
  },
  {
    eip: 7702,
    title: 'Set EOA account code',
    description:
      'Introducing a new transaction type aimed at enhancing the functionality of Externally Owned Accounts (EOAs) by allowing them to delegate execution of code to other addresses in a more flexible and controlled manner. The transaction type, known as the Set Code Transaction, allows a signing account to specify a list of authorization tuples, each containing a delegation designator pointing to a code address.',
  },
  {
    eip: 7840,
    title: 'Add blob schedule to EL config files',
    description:
      'Adds a new configuration object, blobSchedule, to Execution Layer client configuration files. The goal is to dynamically adjust blob parameters and improve the responsiveness of blob gas pricing, without relying on complex interactions over the engine API.',
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

export default Pectra;
