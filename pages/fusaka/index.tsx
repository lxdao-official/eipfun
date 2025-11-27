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
  {
    eip: 7594,
    title: 'PeerDAS - Peer Data Availability Sampling',
    description:
      'PeerDAS enables Ethereum nodes to specialize in storing different pieces of data while still verifying everything is available. This foundational change dramatically increases data capacity for Layer 2 networks while maintaining security.',
  },
  {
    eip: 7642,
    title: 'eth/69 - history expiry and simpler receipts',
    description:
      'A change to EL networking that changes how receipts are handled and removes old data from node synchronization, saving approximately 530GB of bandwidth during sync.',
  },
  {
    eip: 7823,
    title: 'Set upper bounds for MODEXP',
    description:
      'This introduces a 8192-bit (1024 byte) limit on each input to the MODEXP cryptographic precompile. MODEXP has been a source of consensus bugs due to unbounded inputs. By setting practical limits that cover all real-world use cases (like RSA verification), this reduces the testing surface area and paves the way for future replacement with more efficient EVM code.',
  },
  {
    eip: 7825,
    title: 'Transaction Gas Limit Cap',
    description:
      'This introduces a 16,777,216 gas (2^24) cap for individual transactions, preventing any single transaction from consuming most of a block. The goal is to ensure fairer access to block space and improve network stability.',
  },
  {
    eip: 7883,
    title: 'ModExp Gas Cost Increase',
    description:
      'This increases the gas cost of the ModExp cryptographic precompile to address underpriced operations. It raises the minimum cost from 200 to 500 gas and doubles costs for large inputs over 32 bytes.',
  },
  {
    eip: 7892,
    title: "Blob Parameter Only ('BPO') Hardforks",
    description:
      'This creates a new lightweight process to adjust blob storage parameters. Instead of waiting for a major upgrade, Ethereum can make smaller, more frequent adjustments to blob capacity to accommodate changing demand from Layer 2s.',
  },
  {
    eip: 7910,
    title: 'eth_config JSON-RPC Method',
    description:
      'A JSON-RPC method that describes the configuration of the current and next fork',
  },
  {
    eip: 7917,
    title: 'Deterministic proposer lookahead',
    description:
      "This makes Ethereum's block proposer schedule completely predictable ahead of time. Currently, validators can't know who will propose blocks in the next epoch until it starts, which creates uncertainty for MEV mitigation and preconfirmation protocols. This change pre-calculates and stores the proposer schedule for future epochs, making it deterministic and accessible to applications.",
  },
  {
    eip: 7918,
    title: 'Blob base fee bounded by execution cost',
    description:
      'This addresses blob fee market problems by introducing a reserve price tied to execution costs. When Layer 2 execution costs dominate blob costs, this prevents the blob fee market from becoming ineffective at 1 wei. ',
  },
  {
    eip: 7934,
    title: 'RLP Execution Block Size Limit',
    description:
      'This adds a maximum size limit of 10MB to Ethereum blocks to prevent network instability and denial-of-service attacks. Currently, blocks can grow very large, which slows down network propagation and increases the risk of temporary forks. This limit ensures blocks stay within a reasonable size that the network can efficiently process and propagate.',
  },
  {
    eip: 7935,
    title: 'Set default gas limit to 60M',
    description:
      'This proposes increasing the gas limit from 36M to 60M to scale L1 execution capacity. While this change does not require a hard fork (gas limit is a validator-chosen parameter), it requires extensive testing to ensure network stability at higher computational loads and so inclusion of the EIP in the hard fork ensures that this work is prioritized and ongoing.',
  },
  {
    eip: 7939,
    title: 'Count leading zeros (CLZ) opcode',
    description:
      'This adds a new CLZ (Count Leading Zeros) opcode to the EVM that efficiently counts the number of zero bits at the start of a 256-bit number. This is a fundamental mathematical operation used in many algorithms, especially for mathematical computations, data compression, and cryptographic operations. Currently, implementing this operation in Solidity requires complex and expensive code - this opcode makes it much cheaper and faster.',
  },
  {
    eip: 7951,
    title: 'Precompile for secp256r1 Curve Support',
    description:
      'his adds support for a widely-used cryptographic curve called secp256r1 (also known as P-256) to Ethereum. Currently, Ethereum only supports the secp256k1 curve for signatures, but many devices and systems use secp256r1. This change allows Ethereum to verify signatures from devices like iPhones, Android phones, hardware wallets, and other systems that use this standard curve, making it easier to integrate with existing infrastructure. Note: This EIP supercedes RIP-7212.',
  },
];

function Fusaka() {
  const T = useT();
  return (
    <>
      <Head>
        <title>
          Fusaka upgrade - EIP.Fun - Serve Ethereum Builders, Scale the
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
