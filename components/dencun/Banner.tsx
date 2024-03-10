import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { useT } from '@/hooks/useGetLang';

function Banner() {
  const T = useT();
  const readMore = () => {
    window.scrollTo({
      top: (document.querySelector('#anchor') as HTMLElement).offsetTop,
      behavior: 'smooth',
    });
  };
  return (
    <Box
      height={656}
      sx={{
        background: 'url(/images/dencun/banner.png) center right no-repeat',
        backgroundSize: 'contain',
      }}
    >
      <Container sx={{ pt: [1, 1, 6, 6] }}>
        <Typography
          fontWeight={600}
          fontSize={24}
          color={'#437EF7'}
          component="h3"
          mt={5}
        >
          {T({ en: 'Dencun Upgrade', zh: '坎昆升级' })}
        </Typography>

        <Typography
          width={[1, 1, 524, 524]}
          component="h2"
          fontSize={[24, 24, 52, 52]}
          color={'#272D37'}
          fontWeight={700}
          lineHeight={['30px', '60px']}
          mt={2.75}
        >
          {T({
            en: 'A Crucial Step in Ethereum Scalability',
            zh: '以太坊扩容的关键一步',
          })}
        </Typography>

        <Typography
          width={[0.8, 0.8, 524, 524]}
          fontWeight={400}
          lineHeight={'26px'}
          fontSize={[16, 16, 18, 18]}
          component="h4"
          mt={3}
        >
          {T({
            en: 'The Dencun upgrade is a major upcoming upgrade to the Ethereum mainnet, featuring several new functionalities, with the most crucial being Proto-Danksharding (via EIP-4844). This feature will reduce the storage costs on Layer 2 (L2), consequently lowering L2 transaction gas fees and enabling the acceptance of more complex applications.',
            zh: '坎昆（Dencun）升级是即将到来的以太坊主网的一个大升级，它包含了若干个新的功能以及最为重要的 Proto-Danksharding（通过 EIP-4844），该功能将会降低 L2 的存储成本，因而可以降低 L2 的交易 Gas Fee 以及接受更高复杂度的应用。',
          })}
        </Typography>

        <Box mt={6}>
          <Button variant="contained" onClick={readMore}>
            {T({ en: 'Read more', zh: '阅读更多' })}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default React.memo(Banner);
