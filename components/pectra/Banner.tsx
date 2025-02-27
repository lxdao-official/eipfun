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
          {T({ en: 'Pectra Upgrade', zh: '' })}
        </Typography>

        <Typography
          width={[1, 1, 824, 824]}
          component="h2"
          fontSize={[24, 24, 48, 48]}
          color={'#272D37'}
          fontWeight={700}
          lineHeight={['30px', '60px']}
          mt={2.75}
        >
          {T({
            en: "Enhancements to Ethereum's Performance and User Experience",
            zh: '',
          })}
        </Typography>

        <Typography
          width={[0.8, 0.8, 824, 824]}
          fontWeight={400}
          lineHeight={'26px'}
          fontSize={[16, 16, 18, 18]}
          component="h4"
          mt={3}
        >
          {T({
            en: 'The Pectra upgrade includes several key EIPs such as EIP-7251, EIP-7702, and EIP-7002. These improvements aim to optimize Ethereum staking management, simplify account interactions, and lay the foundation for more complex operations.',
            zh: '',
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
