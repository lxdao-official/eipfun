import { Container, Grid, Box, Typography, Link, Icon } from '@mui/material';
import useGetLang from '@/hooks/useGetLang';
import Logo from 'public/logo.svg';
import LogoS from 'public/images/logo_s.svg';
import Telegram from 'public/images/telegram.svg';
import Twitter from 'public/images/twitter.svg';
import Discord from 'public/images/discord.svg';

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
  const lang = useGetLang();

  return (
    <Box bgcolor={'#f8f9fb'} py={8}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={4} mb={[2, 2, 0, 0, 0]}>
            <Box pb={2.5}>
              <Logo />
            </Box>

            <Typography component={Box} pb={2} variant="body1">
              Serve EIP builders, scale Ethereum.
            </Typography>

            <Box>
              <Link href="#" color={'#101828'} mr={1.5}>
                <Icon
                  sx={{
                    display: 'inline-block',
                    width: '48px',
                    height: '48px',
                    lineHeight: '48px',
                    textAlign: 'center',
                    borderRadius: '50%',
                    bgcolor: '#fff',
                  }}
                >
                  <Telegram />
                </Icon>
              </Link>
              <Link href="#" color={'#101828'} mr={1.5}>
                <Icon
                  sx={{
                    display: 'inline-block',
                    width: '48px',
                    height: '48px',
                    lineHeight: '48px',
                    textAlign: 'center',
                    borderRadius: '50%',
                    bgcolor: '#fff',
                  }}
                >
                  <Twitter />
                </Icon>
              </Link>
              <Link href="#" color={'#101828'}>
                <Icon
                  sx={{
                    display: 'inline-block',
                    width: '48px',
                    height: '48px',
                    lineHeight: '48px',
                    textAlign: 'center',
                    borderRadius: '50%',
                    bgcolor: '#fff',
                  }}
                >
                  <Discord />
                </Icon>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={4} sm={4} md={2.5} lg={2.5}>
            <Typography variant="h6">Products</Typography>
            <Box pb={7.25}>
              {footerList1.map((item) => (
                <Box key={item.con} height={30} sx={{ lineHeight: '30px' }}>
                  <Link href={item.href} underline="hover" color="inherit">
                    {lang === 'en' ? item.con : item.conZh}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={4} sm={4} md={2.5} lg={2.5}>
            <Typography variant="h6">Resources</Typography>
            <Box pb={7.25}>
              {footerList2.map((item) => (
                <Box key={item.con} height={30} sx={{ lineHeight: '30px' }}>
                  <Link href={item.href} underline="hover" color="inherit">
                    {lang === 'en' ? item.con : item.conZh}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={4} sm={4} md={2.5} lg={2.5}>
            <Typography variant="h6">Company</Typography>
            <Box pb={7.25}>
              {footerList3.map((item) => (
                <Box height={30} key={item.con} sx={{ lineHeight: '30px' }}>
                  <Link href={item.href} underline="hover" color="inherit">
                    {lang === 'en' ? item.con : item.conZh}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Typography component={Box} height={60} mb={2} align="center">
          <LogoS />
        </Typography>

        <Typography component={Box} variant="subtitle2" align="center">
          &copy; {new Date().getFullYear()} EIP.Fun. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
