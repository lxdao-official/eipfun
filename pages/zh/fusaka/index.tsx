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
    title: 'PeerDAS：点对点数据可用性采样',
    description:
      'PeerDAS 允许以太坊节点专门存储不同的数据片段，同时验证整体数据是否可用。这一基础机制显著提升 Layer 2 的数据容量，并维持网络安全性。',
  },
  {
    eip: 7642,
    title: 'eth/69：历史数据过期和更简化的收据',
    description:
      '对执行层网络进行改动，调整收据处理方式，并在节点同步期间移除历史数据，可节省约 530GB 同步带宽。',
  },
  {
    eip: 7823,
    title: '设置 MODEXP 输入上限',
    description:
      '为 MODEXP 预编译增加每个输入最大 8192-bit（1024 字节）限制。此前 MODEXP 因无限输入范围带来共识风险。该限制涵盖所有现实应用（如 RSA 验证），降低测试复杂度，并为未来替换为更高效 EVM 代码铺路。',
  },
  {
    eip: 7825,
    title: '交易 Gas 限额',
    description:
      '为单笔交易设置 16,777,216 gas（2^24）上限，避免单笔交易占用绝大部分区块资源，确保区块空间更公平分配并提高网络稳定性。',
  },
  {
    eip: 7883,
    title: 'ModExp Gas 成本提升',
    description:
      '提高 ModExp 预编译操作的 gas 成本，修正其当前低估状态。最低费用从 200 提升至 500 gas，大于 32 字节的输入成本翻倍。',
  },
  {
    eip: 7892,
    title: 'Blob 参数轻量化升级流程（BPO）',
    description:
      '为 blob 参数调整建立轻量流程，无需等待大型升级，使以太坊能更频繁地根据 L2 需求动态调整 blob 容量。',
  },
  {
    eip: 7917,
    title: '提前确定区块提议者顺序',
    description:
      '使区块提议者列表提前完全可预测。目前，验证者需等到新 epoch 开始才能知道提议者顺序，这对 MEV 缓解与预确认机制造成不确定性。该改动将未来 epoch 的提议者顺序预先计算并存储。',
  },
  {
    eip: 7918,
    title: 'Blob 基础费与执行成本挂钩',
    description:
      '引入与执行成本相关的 blob 价格下限，避免在 L2 执行成本远高于 blob 成本时，blob 市场形同虚设（价格恒为 1 wei）。',
  },
  {
    eip: 7934,
    title: 'RLP 区块大小上限',
    description:
      '提议将 L1 gas 上限从 36M 提升至 60M，扩展执行能力。尽管 gas 上限由验证者自主调整，不需硬分叉，但此 EIP 被纳入升级以确保优先测试与推进。',
  },
  {
    eip: 7935,
    title: '默认 Gas 上限提升至 60M',
    description:
      '提议将 L1 gas 上限从 36M 提升至 60M，扩展执行能力。尽管 gas 上限由验证者自主调整，不需硬分叉，但此 EIP 被纳入升级以确保优先测试与推进。',
  },
  {
    eip: 7939,
    title: 'CLZ Opcode：计算前导零指令',
    description:
      '为 EVM 添加 CLZ 指令，用于高效计算 256 位数字的前导零数量。该操作在数学计算、数据压缩、密码算法中常用，可显著降低 Solidity 实现成本。',
  },
  {
    eip: 7951,
    title: '支持 secp256r1 加密曲线',
    description: `为以太坊引入 secp256r1（P-256）支持。目前以太坊仅支持 secp256k1，许多设备与系统使用 secp256r1（如 iPhone、安卓、硬件钱包）。该改动将提升以太坊与现有设备生态的兼容性。注：此 EIP 取代 RIP-7212。`,
  },
];

function Fusaka() {
  const T = useT();
  return (
    <>
      <Head>
        <title>Fusaka 升级 - EIP.Fun - 服务以太坊建设者，扩展社区。</title>
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
