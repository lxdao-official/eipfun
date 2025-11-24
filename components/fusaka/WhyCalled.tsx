import React from 'react';
import { Container, Typography } from '@mui/material';
// import Image from 'next/image';
import { useT } from '@/hooks/useGetLang';

function WhyCalled() {
  const T = useT();
  return (
    <Container sx={{ py: 8 }}>
      <Typography
        id="anchor"
        component="h2"
        fontSize={32}
        color={'#272D37'}
        align="center"
        lineHeight={'40px'}
        fontWeight={700}
        mt={1}
      >
        {T({
          en: 'What is the Fusaka Upgrade?',
          zh: '什么是 Fusaka 升级？',
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
          en: 'Fusaka enhances Ethereum’s ability to handle high-throughput Layer 2 applications, reduces transaction costs, and strengthens the network’s readiness for future scaling solutions. The name “Fusaka” is a combination of Fulu and Osaka: Fulu is a star representing the consensus layer upgrade, while Osaka is the city representing the execution layer upgrade.',
          zh: 'Fusaka 加强了以太坊处理高吞吐 Layer 2 应用的能力，降低交易成本，并提升网络未来扩容方向的准备度。“Fusaka”名称由 Fulu 与 Osaka 组合而成：Fulu 代表共识层升级所对应的星宿名称，Osaka 则代表执行层升级所在的城市。',
        })}
      </Typography>
    </Container>
  );
}

export default React.memo(WhyCalled);
