import { styled } from '@mui/material/styles';
import { Container, Box } from '@mui/material';
import { Title, FooterItem as FooterItemList } from './footerComponent';
import Logo from 'public/logo.svg';

const FooterBox = styled(Box)(({ theme }) => ({
  width: '100%',
  background: '#f8f9fb',
  padding: '64px 0',
}));

const FooterItem = styled(Box)(({ theme }) => ({
  flex: 1,
}));

type footerItem = {
  con: string;
  conZh: string;
  href: string;
};

const footerList1: footerItem[] = [
  { con: 'Features', conZh: '特性', href: '/' },
  { con: 'Solutions', conZh: '解决方案', href: '/' },
  { con: 'Integrations', conZh: '集成', href: '/' },
  { con: 'Enterprise', conZh: '企业', href: '/' },
];

const footerList2: footerItem[] = [
  { con: 'Partners', conZh: '合作伙伴', href: '/' },
  { con: 'Community', conZh: '社区', href: '/' },
  { con: 'Developers', conZh: '开发者', href: '/' },
  { con: 'App', conZh: 'App', href: '/' },
  { con: 'Blog', conZh: '博客', href: '/' },
];

const footerList3: footerItem[] = [
  { con: 'About us', conZh: '关于我们', href: '/' },
  { con: 'News', conZh: '新闻', href: '/' },
  { con: 'Leadership', conZh: '领导', href: '/' },
  { con: 'Media Kit', conZh: '媒体工具包', href: '/' },
];

export default function Footer() {
  return (
    <FooterBox>
      <Container maxWidth="lg" sx={{ display: 'flex' }}>
        <Box sx={{ width: '480px' }}>
          <Box
            sx={{ fontWeight: 'bold', fontSize: '20px', paddingBottom: '20px' }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              width: '240px',
              paddingBottom: '16px',
              fontSize: '16px',
              color: '#5F6D7E',
            }}
          >
            We scale EIPs by being the “layer 2” of eips.ethereum.org
          </Box>
          <Box sx={{ height: '60px' }}>
            <span>icon1 </span>
            <span>icon2 </span>
            <span>icon3 </span>
          </Box>
        </Box>
        <FooterItem>
          <Title>Products</Title>
          <FooterItemList data={footerList1} />
        </FooterItem>
        <FooterItem>
          <Title>Resources</Title>
          <FooterItemList data={footerList2} />
        </FooterItem>
        <FooterItem>
          <Title>Company</Title>
          <FooterItemList data={footerList3} />
        </FooterItem>
      </Container>
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Box sx={{ height: '60px', paddingBottom: '16px' }}>
          {' '}
          <Logo />
        </Box>
        <Box sx={{ height: '24px', lineHeight: '24px' }}>
          &copy; {new Date().getFullYear()} EIP.Fun. All Rights Reserved.
        </Box>
      </Container>
    </FooterBox>
  );
}
