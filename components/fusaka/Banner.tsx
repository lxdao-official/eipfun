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
          {T({ en: 'Fusaka Upgrade', zh: '' })}
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
            en: "Enhancements to Ethereum's Scalability and Data Availability",
            zh: '提升以太坊的可扩展性与数据可用性',
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
            en: 'The Fusaka upgrade introduces foundational improvements to Ethereum, focusing on data availability, Layer 2 scaling, and preparing the network for full Danksharding. Key components include technologies such as PeerDAS, which allow nodes to specialize in storing different pieces of data while still verifying overall availability, significantly increasing Layer 2 network capacity while maintaining security.',
            zh: 'Fusaka 升级为以太坊带来关键的底层改进，重点围绕数据可用性、Layer 2 扩容，并为全面实现 Danksharding 做准备。核心技术之一 PeerDAS 允许节点各自存储不同的数据片段，同时仍能验证整体数据可用性，大幅提升 Layer 2 网络吞吐量，并确保安全性。',
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
