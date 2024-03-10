import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import useLang, { useT } from '@/hooks/useGetLang';

export default function DencunBanner() {
  const lang = useLang();
  const T = useT();
  return (
    <Container sx={{ py: 8, height: 320 }}>
      <Box
        display={'flex'}
        sx={{
          background:
            'url(/images/dencun/dencun_bg.png) no-repeat center right/contain',
          borderRadius: 1,
        }}
      >
        <Box pl={8}>
          <Typography
            fontWeight={600}
            fontSize={18}
            color={'#437EF7'}
            component="h3"
            mt={5}
            textTransform={'uppercase'}
          >
            {T({ en: 'Dencun Upgrade', zh: '坎昆升级' })}
          </Typography>
          <Typography
            width={524}
            component="h2"
            fontSize={32}
            color={'#272D37'}
            fontWeight={600}
            lineHeight={'42px'}
            mt={1}
          >
            {T({
              en: 'A Crucial Step in Ethereum Scalability',
              zh: '以太坊扩容的关键一步',
            })}
          </Typography>
        </Box>
        <Box flex={1} textAlign={'right'}>
          <Button
            variant="contained"
            size="small"
            sx={{ px: 2.25, mt: 6.75, mr: 5.75 }}
            href={lang === 'en' ? '/dencun' : '/zh/dencun'}
          >
            {T({ en: 'Learn More', zh: '了解更多' })}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
