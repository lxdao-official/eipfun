import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Image from 'next/image';
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
          zh: '',
        })}
      </Typography>
    </Container>
  );
}

export default React.memo(WhyCalledDencun);
