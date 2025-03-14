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
    title: 'BLS12-381 曲线操作的预编译',
    description:
      '该提案定义了在以太坊中实现 BLS12-381 曲线操作的标准。它指定了一组预编译合约，以便在以太坊虚拟机（EVM）上高效执行这些操作。这是提高以太坊网络上加密操作安全性和效率的重要一步。',
  },
  {
    eip: 2935,
    title: '在状态中保存历史区块哈希',
    description:
      'EIP-2935 提议在系统合约中存储最后 8192 个区块哈希，以支持以太坊中的无状态客户端。这使得客户端无需本地存储即可访问最近的区块哈希。它引入了一个环形缓冲区以实现高效检索，并且不会改变 BLOCKHASH 函数的工作方式。目标是让无状态客户端和 rollups 更容易访问历史区块数据。',
  },
  {
    eip: 6110,
    title: '链上提供验证者存款',
    description:
      '该提案将验证者存款直接添加到执行层区块中，将存款包含和验证的责任从共识层转移到执行层。这消除了共识层中存款投票的需要，简化了存款处理，改善了验证者用户体验和安全性。区块中的验证者存款列表源自存款合约日志事件。该提案引入了最小的数据复杂性，不会增加执行层的 DoS 攻击风险。',
  },
  {
    eip: 7002,
    title: '执行层可触发的退出',
    description:
      'EIP-7002 允许验证者使用其执行层（0x01）提款凭证触发提款，而仅仅是使用活跃密钥。这使得提款凭证的所有者可以独立退出并提取质押的 ETH，即使活跃密钥丢失。该系统包括一个合约，用于排队请求、应用动态费用以防止滥用，并在每个区块中处理它们。',
  },
  {
    eip: 7251,
    title: '增加 MAX_EFFECTIVE_BALANCE',
    description:
      '在保持 32 ETH 最低质押余额的同时增加 MAX_EFFECTIVE_BALANCE。这一变化允许较大的验证者合并为较少的验证者，并让较小的验证者能够以更灵活的增量进行质押。目标是减少验证者集规模，提高网络效率，并让大小验证者都能从复利奖励中受益。',
  },
  {
    eip: 7549,
    title: '将委员会索引移出证明',
    description:
      'EIP-7549 提议将委员会索引移出签名的证明消息，以提高 Casper FFG 客户端的效率。这一变化减少了验证共识规则所需的配对次数，并降低了达到 2/3 阈值所需的证明数量。通过分离委员会索引，该提案还允许更有效地将证明打包到信标区块中，从而增加总投票容量。',
  },
  {
    eip: 7623,
    title: '增加 calldata 成本',
    description:
      '增加主要用于发布数据的交易的 calldata 成本，旨在减少最大区块大小并提高区块空间效率。通过将数据密集型交易的 calldata 成本从每字节 4/16 gas 提高到 10/40 gas，该提案在不影响大多数用户的情况下限制了区块大小，这些用户通常依赖 calldata 进行 EVM 操作。这一变化将减少执行层的最大有效负载大小，为 EIP-4844 准备更多的 blob。',
  },
  {
    eip: 7685,
    title: '通用执行层请求',
    description:
      '该提案引入了一个通用框架，用于在执行层和共识层之间存储和共享合约触发的请求。该方法简化了新请求类型的添加，增强了灵活性，并通过将操作委托给智能合约来提高整体系统安全性。',
  },
  {
    eip: 7691,
    title: '增加 blob 吞吐量',
    description:
      '将以太坊上每个区块的 blob 数量增加到 6 个（最多 9 个），以提高 Layer 2 解决方案的可扩展性。这一变化旨在基于测试结果和网络监控，在短期内提高吞吐量，并调整基础费用更新以平衡影响。',
  },
  {
    eip: 7702,
    title: '设置 EOA 账户代码',
    description:
      '引入一种新的交易类型，旨在通过允许外部账户（EOA）以更灵活和受控的方式将代码执行委托给其他地址来增强其功能。这种称为设置代码交易的交易类型，允许签名账户指定一个授权元组列表，每个元组包含指向代码地址的委托指示符。',
  },
  {
    eip: 7840,
    title: '将 blob 计划添加到 EL 配置文件中',
    description:
      '在执行层客户端配置文件中添加一个新的配置对象 blobSchedule。目标是动态调整 blob 参数并提高 blob gas 定价的响应能力，而无需依赖引擎 API 上的复杂交互。',
  },
];

function Pectra() {
  const T = useT();
  return (
    <>
      <Head>
        <title>Pectra 升级 - EIP.Fun - 服务以太坊建设者，扩展社区。</title>
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
