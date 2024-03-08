import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import { useT } from '@/hooks/useGetLang';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#e6f0f7',
    color: '#333',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Date {
  name: string;
  storage: string;
  calldata: string;
  memory: string;
  blob: string;
}

function EIP4844() {
  const T = useT();
  const rows: Date[] = [
    {
      name: T({ en: 'Description', zh: '说明' }),
      storage: T({
        en: 'Ethereum storage, incl. the core World State',
        zh: '以太坊存储，包括最核心的状态 World State',
      }),
      calldata: T({ en: 'Immutable storage location', zh: '不可变的存储位置' }),
      memory: T({
        en: 'Temporary memory during EVM execution',
        zh: 'EVM 执行时的临时内存',
      }),
      blob: T({ en: 'Additional external storage', zh: '新增的外挂存储' }),
    },
    {
      name: T({ en: 'Location', zh: '位置' }),
      storage: T({
        en: 'Execution layer',
        zh: '执行层',
      }),
      calldata: T({ en: 'Execution layer', zh: '执行层' }),
      memory: T({
        en: 'Execution layer',
        zh: '执行层',
      }),
      blob: T({ en: 'Consensus layer', zh: '共识层' }),
    },
    {
      name: T({ en: 'Gas fee', zh: 'Gas fee' }),
      storage: T({
        en: '$$$$$',
        zh: '$$$$$',
      }),
      calldata: T({ en: '$$$', zh: '$$$' }),
      memory: T({
        en: '0',
        zh: '0',
      }),
      blob: T({ en: '$', zh: '$' }),
    },
    {
      name: T({ en: 'Life cycle', zh: '生命周期' }),
      storage: T({
        en: 'Permanent',
        zh: '永久',
      }),
      calldata: T({ en: 'Permanent', zh: '永久' }),
      memory: T({
        en: 'Destroyed immediately after the execution',
        zh: '方法执行完成立即销毁',
      }),
      blob: T({ en: 'Deleted after c. 18 days', zh: '～18 天后删除' }),
    },
  ];
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
            en: 'Explanation of the Important Upgrade EIP-4844',
            zh: '升级关键 EIP-4844 详解',
          })}
        </Typography>
        <Typography variant="body1" color={'#5F6D7E'} mt={3}>
          {T({
            en: `The EIP-4844 upgrade introduces a new transaction type called BlobTx and a new storage space called Blob. This storage space resides in the Ethereum Consensus Layer, making it inaccessible to the Execution Layer's EVM. Consequently, data stored in this location cannot be accessed by smart contracts.`,
            zh: 'EIP-4844 升级提供了一种全新的交易类型 BlobTx 和新的存储空间 Blob。这种存储空间位于以太坊共识层（Consensus Layer）因此无法被执行层的 EVM 获取，因此，存储于该位置的数据将无法被智能合约调用。',
          })}
        </Typography>
        <Typography variant="body1" color={'#5F6D7E'} mt={4}>
          {T({
            en: `As a decentralized ledger, storage has always been a significant topic for blockchain. If the storage capacity of each block is too small, it can lead to reduced transaction capacity and quantity. The pressure of competition can cause an increase in gas fees and render the blockchain unusable. On the other hand, if the storage capacity of each block is too large, it will increase the pressure on nodes, requiring each node to improve the quality of its hardware, thus reducing the security of the decentralized network due to fewer running nodes.`,
            zh: '区块链作为去中心化的账本，存储一直是一个比较重要的话题。如果每个区块存储容量过小，将会导致交易容量、数量减少，竞争带来的压力会导致 Gas fee 上涨而不可用。如果每个区块存储容量过大，则将会增加节点的压力，需要每个节点提升硬件的质量，从而导致更少的节点运行带来去中心化网络的安全性。',
          })}
        </Typography>{' '}
        <Typography variant="body1" color={'#5F6D7E'} mt={4}>
          {T({
            en: `This upgrade introduces blob storage, where each blob will have up to 128KB of space to store additional information. Each Ethereum block will support a maximum of 6 blobs, totaling a maximum of 768KB. This means that each Ethereum block can be expanded by up to approximately 0.7MB. Calculating based on an Ethereum block every 12 seconds, with each block defaulting to supporting 3 blobs, there will be approximately 21,600 blobs per day, resulting in nodes adding around 2.6 GB of data. Therefore, blobs are designed with a lifespan of approximately 18 days (4096 epochs) based on their use cases, after which nodes will delete them. Consequently, storing data in blobs incurs very low gas fees.`,
            zh: '该升级新增了 blob 存储，每个 blob 将有不超过 128KB 的空间来存储额外信息，每一个以太坊区块将支持最多挂载 6 个 blob，即最大不超过 768KB，这将意味着每个以太坊区块将会最大扩容 ～0.7MB。按照 12s 左右一个以太坊区块来计算，每个区块默认挂载 3 个 blob，这样每天将会有 21600 个 blob，节点将会新增 ～2.6 G 的数据。因此，blob 根据其应用场景设计了 ～18 天（4096 epochs）的生命周期，节点将会在 18 天后删掉 blob。因此，存储在 blob 的数据 Gas fee 非常低。',
          })}
        </Typography>
        <Typography
          component="h3"
          fontSize={22}
          lineHeight={'30px'}
          color={'#222935'}
          fontWeight="normal"
          mt={6}
        >
          {T({
            en: 'Compare the differences between the following types of storage',
            zh: '下面简单对比下几类存储的差别：',
          })}
        </Typography>
        <Box mt={3}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Storage</StyledTableCell>
                  <StyledTableCell>Calldate</StyledTableCell>
                  <StyledTableCell>Memory</StyledTableCell>
                  <StyledTableCell>Blod</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{row.storage}</StyledTableCell>
                    <StyledTableCell>{row.calldata}</StyledTableCell>
                    <StyledTableCell>{row.memory}</StyledTableCell>
                    <StyledTableCell>{row.blob}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Typography variant="body1" color={'#5F6D7E'} mt={4}>
          {T({
            en: `Unable to be read and utilized by smart contracts on the EVM, and also subject to deletion after a period of time, what's the use of Blob? Currently, Layer 2 benefits the most from it.`,
            zh: '无法被 EVM 的智能合约读取和使用，而且经过一段时间还会被删除，Blob 有什么用呢？目前受益最大的是 Layer 2。',
          })}
        </Typography>
        <Typography
          component="h3"
          fontSize={22}
          lineHeight={'30px'}
          color={'#222935'}
          fontWeight="normal"
          mt={6}
        >
          {T({
            en: "Let's take a look at how Layer 2 works",
            zh: 'Layer 2 工作原理解读',
          })}
        </Typography>
        <Typography variant="body1" color={'#5F6D7E'} mt={2}>
          {T({
            en: `Taking Optimistic Rollup as an example, transactions that occur on Layer 2 are captured by the Layer 2 Sequencer and merged and compressed (Rollup) into more compact data, typically including the state root, compressed transaction data, proof information, etc., and then uploaded to the Ethereum mainnet. This information is not parsed or read by Ethereum or smart contracts, but is mainly used to ensure the security of L2 data, prove the authenticity and reliability of its transactions, and recover some states in emergencies.`,
            zh: '这里以 Optimistic Rollup 为例，发生在 Layer2 上面的交易，将会被 Layer2 的 Sequencer 抓取并且合并压缩（Rollup）成更为紧凑的数据，通常包括状态根（State root）、压缩的交易数据、证明信息等等，将其上传到以太坊主网上。这些信息并不会被以太坊或者智能合约解析和读取，主要用于确保 L2 的数据安全性，证明其交易真实可靠，同时在一些紧急关头可以恢复一些状态。',
          })}
        </Typography>
        <Typography variant="body1" color={'#5F6D7E'} mt={4}>
          {T({
            en: `For example, in Optimistic Rollup, operations such as withdrawing funds require a waiting period of 7 days. During this time, validators verify the relevant data to discover if the Sequencer has engaged in any malicious behavior. After the seven-day challenge period, the transaction can be deemed secure and confirmed.
            Currently, this information is stored on the Ethereum mainnet in the form of Calldata, which provides the most secure and reliable storage but requires a relatively high Gas fee. Since Ethereum's block capacity is limited, this also restricts the scalability and development of L2. However, blobs can alleviate this issue. L2 can strip the relevant data used for verification and store it in blobs because they do not need to be permanently stored; they only need to be accessible during the challenge period. Therefore, this can greatly reduce Gas fees.`,
            zh: `例如在 Optimistic Rollup 中，提取资金等操作需要等待 7 天的时间，这段时间就是让验证者根据相关数据进行验证，发现 Sequencer 是否存在作恶的情况。经过七天挑战期之后，即可认为这个交易安全且经过确认。
            目前这些信息在以太坊主网以 Calldata 的方式进行存储，这样可以实现最安全可靠的存储，但是需要支付比较多的 Gas fee。因为以太坊每个区块的容量有限，因此也限制了 L2 的扩容和发展。但是 blob 正好可以缓解这个问题。L2 可以将用于验证的相关数据剥离存储到 blob 中，因为它们并不需要永久存储，只需要在挑战期内可以访问即可，因此可以极大的降低 Gas fee。`,
          })}
        </Typography>
        <Typography variant="body1" color={'#5F6D7E'} mt={4}>
          {T({
            en: `Below is a flowchart and comparison of the process before and after the upgrade:
            `,
            zh: '下面是升级前后的流程图和对比：',
          })}
        </Typography>
        <Box mt={4}>
          <Image
            src="/images/dencun/EIP4844_02.jpeg"
            width={605}
            height={641}
            alt="img"
          />
        </Box>
      </Container>
    </Box>
  );
}

export default React.memo(EIP4844);
