import React from 'react';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import Banner from '@/components/dencun/Banner';
import MintNFT from '@/components/dencun/MintNFT';
import WhyCalledDencun from '@/components/dencun/WhyCalledDencun';
import Relationship from '@/components/dencun/Relationship';
import EIP4844 from '@/components/dencun/EIP4844';
import FutureOutlook from '@/components/dencun/FutureOutlook';
import { useT } from '@/hooks/useGetLang';

const RelationshipData = [
  {
    eip: 4844,
    title: 'Shard Blob Transactions',
    description:
      'This protocol introduces a new type of transaction called BlobTx, which attaches a blob capable of storing a large amount of information. The blob is stored in the consensus layer and is deleted after a certain period of time.',
  },
  {
    eip: 1153,
    title: 'Transient Storage Opcodes',
    description:
      'This proposal introduces transient storage opcodes to address intra-block communication. Transient storage operates similarly to current storage operations, but the data stored in transient storage is discarded after each transaction, and it does not require access to server disks, resulting in lower gas fees.',
  },
  {
    eip: 4788,
    title: 'Beacon block root in the EVM',
    description:
      'The block root of the beacon chain is a cryptographic accumulator that can prove any consensus state. Making the block root publicly accessible within the EVM (Ethereum Virtual Machine) enables access to the consensus layer with minimized trust. This also helps improve trust assumptions in various scenarios, such as staking pools, re-staking structures, smart contract bridges, and mitigating MEV (Miner Extractable Value) issues.',
  },
  {
    eip: 5656,
    title: 'Memory copying instruction',
    description:
      'This proposal introduces an efficient Ethereum Virtual Machine (EVM) instruction called MCOPY, which can be used to copy memory regions. Using this instruction for memory copying requires only 27 Gas for copying 256 bytes of data, compared to the current solution which requires 96 gas.',
  },
  {
    eip: 6780,
    title: 'SELFDESTRUCT only in same transaction',
    description:
      'The SELFDESTRUCT opcode is used to delete the code and storage of a smart contract and reclaim its balance. With the new changes, the capabilities of SELFDESTRUCT have been reduced, thus enhancing security.',
  },
  {
    eip: 7044,
    title: 'SELFDESTRUCT only in same transaction',
    description:
      'The SELFDESTRUCT opcode is used to delete the code and storage of a smart contract and reclaim its balance. With the new changes, the capabilities of SELFDESTRUCT have been reduced, thus enhancing security.',
  },
  {
    eip: 7045,
    title: 'SELFDESTRUCT only in same transaction',
    description:
      'The SELFDESTRUCT opcode is used to delete the code and storage of a smart contract and reclaim its balance. With the new changes, the capabilities of SELFDESTRUCT have been reduced, thus enhancing security.',
  },
  {
    eip: 7514,
    title: 'SELFDESTRUCT only in same transaction',
    description:
      'The SELFDESTRUCT opcode is used to delete the code and storage of a smart contract and reclaim its balance. With the new changes, the capabilities of SELFDESTRUCT have been reduced, thus enhancing security.',
  },
  {
    eip: 7516,
    title: 'SELFDESTRUCT only in same transaction',
    description:
      'The SELFDESTRUCT opcode is used to delete the code and storage of a smart contract and reclaim its balance. With the new changes, the capabilities of SELFDESTRUCT have been reduced, thus enhancing security.',
  },
];

function Dencun() {
  const T = useT();
  return (
    <>
      <Head>
        <title>
          Dencun upgrade - EIP.Fun - Serve EIP builders, scale Ethereum.
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

export default Dencun;
