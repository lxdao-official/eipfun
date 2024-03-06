import React from 'react';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';
// import { styled } from '@mui/material/styles';
// import { sendGet } from '@/network/axios-wrapper';

import Banner from '@/components/dencun/Banner';
import MintNFT from '@/components/dencun/MintNFT';
import WhyCalledDencun from '@/components/dencun/WhyCalledDencun';
import Relationship from '@/components/dencun/Relationship';
import EIP4844 from '@/components/dencun/EIP4844';
import FutureOutlook from '@/components/dencun/FutureOutlook';
import ReferenceLinks from '@/components/dencun/ReferenceLinks';
import { useT } from '@/hooks/useGetLang';

const RelationshipData = [
  {
    eip: 4844,
    title: '分片 Blob 交易',
    description:
      '该协议引入了一种全新的交易类型 BlobTx，该交易类型中挂载一个可以存储大量信息的 blob，blob 存储在共识层并在一定期限内删除。',
  },
  {
    eip: 1153,
    title: '瞬态存储操作码',
    description:
      '该提案引入了瞬态存储操作码，用以解决区块内部通讯。瞬态存储与目前存储的操作相同，但瞬态存储的数据在每次交易后都会被丢弃，且不需要访问服务器磁盘，因此 Gas fee 更低。',
  },
  {
    eip: 4788,
    title: '在以太坊虚拟机中公开信标链区块根',
    description:
      '信标链的区块根是一种加密累加器（Accumulators），可证明任意的共识状态。将区块根在 EVM 内部公开可以实现对共识层最小化信任的访问。这也有助于改善一些场景的信任假设（Trust assumption），如质押池、再质押的结构、智能合约桥、MEV 问题缓解等。',
  },
  {
    eip: 5656,
    title: '内存复制指令',
    description:
      '该提案引入一个能够用于复制内存区域的、高效的以太坊虚拟机指令：MCOPY。使用该指令进行内存复制仅需 27 Gas（复制 256 bytes 信息），而现有方案需要 96 gas。',
  },
  {
    eip: 6780,
    title: '仅可在相同的交易中执行 SELFDESTRUCT 操作码',
    description:
      'SELFDESTRUCT 操作码用于删除一个智能合约的代码和存储并且回收里面的余额。新的变更之后，削减了 SELFDESTRUCT 的能力，提升了安全性。',
  },
  {
    eip: 7044,
    title: '永久有效自愿退出签名',
    description:
      '切换为 PoS 之后，质押者需要将 32 ETH 质押到 Validator 中，想要解除质押的时候可以使用自愿退出签名解除。之前签名仅对之前以太坊版本生效，该升级将让签名永久有效，提升用户体验。',
  },
  {
    eip: 7045,
    title: '增加最大认证打包明文密文（明文槽）',
    description:
      '该提案增加以太坊区块证明槽中的包含范围，以降低区块确认时间和减少以太坊用户延迟。该提案对目前共识层的 LMD-GHOST 安全分析及确认规则至关重要。',
  },
  {
    eip: 7514,
    title: '添加 Max Epoch Churn 限制',
    description:
      '该提案主要旨在缓解由于质押的 ETH 总量增长带来的负外部性问题。通过限制 Max Epoch Churn，将验证者数量增长曲线从指数增长更新为线性增长。',
  },
  {
    eip: 7516,
    title: '操作码 BLOBBASEFEE',
    description:
      '该操作码与 EIP 3198 关联的 BASEFEE 操作码相同，只是 BLOBBASEFEE 主要针对 EIP 4844 协议中返回的 Blob 基本费用。',
  },
];

function Dencun() {
  const T = useT();
  return (
    <>
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

      <ReferenceLinks />
    </>
  );
}

export default Dencun;
