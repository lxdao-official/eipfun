import React from 'react';
import { Container, Typography } from '@mui/material';
// import Image from 'next/image';
import { useT } from '@/hooks/useGetLang';

function WhyCalledDencun() {
  const T = useT();
  return (
    <Container sx={{ py: 8 }}>
      <Typography
        component="h2"
        fontSize={32}
        color={'#272D37'}
        align="center"
        lineHeight={'40px'}
        fontWeight={700}
        mt={1}
      >
        {T({
          en: 'What is the Pectra Upgrade?',
          zh: '',
        })}
      </Typography>

      <Typography
        variant="body1"
        mx={'auto'}
        lineHeight={'24px'}
        // width={['100%', '100%', '90%', 800]}
        textAlign={'center'}
        mt={2}
        mb={8}
      >
        {T({
          en: 'Pectra follows last year\'s Dencun upgrade. It introduces features to augment Ethereum accounts, improve the validator experience, support L2 scaling, and more. The name "Pectra" is a combination of Prague and Electra. Prague represents the upgrade to the execution layer, named after the city where Ethereum\'s developer conference (Devcon 4) was held, while Electra symbolizes the upgrade to the consensus layer, named after a star corresponding to the letter "E." The core aspects of the Pectra upgrade include: increasing the individual validator staking limit from 32 ETH to 2048 ETH; allowing externally owned accounts (EOA) to temporarily authorize the execution of smart contract code within a single transaction, supporting features such as batch transactions and gas payment delegation; and enabling direct control of validator exits via execution layer addresses, eliminating the need for pre-signed BLS keys.',
          zh: 'Pectra 紧随去年的 Dencun 升级。它引入了增强以太坊账户、改善验证者体验、支持 L2 扩展等功能。名称 "Pectra" 是 Prague 和 Electra 的组合。Prague 代表执行层的升级，以以太坊开发者大会（Devcon 4）的举办城市命名，而 Electra 象征共识层的升级，以字母 "E" 对应的恒星命名。Pectra 升级的核心方面包括：将单个验证者的质押上限从 32 ETH 提高到 2048 ETH；允许外部账户（EOA）在单笔交易中临时授权执行智能合约代码，支持批量交易和 Gas 支付委托等功能；以及通过执行层地址直接控制验证者退出，无需预先签名的 BLS 密钥。',
        })}
      </Typography>
    </Container>
  );
}

export default React.memo(WhyCalledDencun);
