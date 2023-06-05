import { Box, Typography, Link, Icon } from '@mui/material';
import useGetLang from '@/hooks/useGetLang';
import Logo32 from 'public/images/logo32.svg';
import LogoS from 'public/images/logo_s.svg';
import Telegram from 'public/images/telegram.svg';
import Twitter from 'public/images/twitter.svg';
import Discord from 'public/images/discord.svg';
import { Telegram as TelegramLink } from '@/common/config';

type footerItem = {
  con: string;
  conZh: string;
  href: string;
};

const footerList1: footerItem[] = [
  {
    con: 'Github',
    conZh: 'Github',
    href: 'https://github.com/lxdao-official/eipsfun',
  },
  { con: 'Community', conZh: '社区', href: '/' },
];

const footerList2: footerItem[] = [
  { con: 'LXDAO', conZh: '合作伙伴', href: 'https://lxdao.io' },
  { con: 'PlanckerDAO', conZh: '社区', href: '/' },
];

export default function Footer() {
  const lang = useGetLang();

  return (
    <Box bgcolor={'#f8f9fb'} py={[5, 5, 8, 8]}>
      <Box maxWidth={1280} width={0.9} margin="0 auto">
        <Box
          sx={{ float: 'left' }}
          width={[1, 1, 0.5, 0.5]}
          mb={[4, 4, 0, 0, 0]}
        >
          <Box pb={2}>
            <Logo32 />
          </Box>

          <Typography component={Box} pb={2} variant="body1">
            Serve EIP builders, scale Ethereum.
          </Typography>

          <Box>
            <Link
              href={TelegramLink}
              target="_blank"
              color={'#101828'}
              mr={1.5}
            >
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
        </Box>

        <Box sx={{ float: 'right' }} width={[1, 1, 320, 390]}>
          <Box display="inline-block" width={[0.5, 0.5, 150, 290]}>
            <Typography
              variant="subtitle1"
              color="#272D37"
              fontWeight="bold"
              lineHeight="24px"
            >
              Products
            </Typography>
            <Box pb={7.25} pt={2}>
              {footerList1.map((item) => (
                <Box key={item.con} height={36} sx={{ lineHeight: '36px' }}>
                  <Link href={item.href} underline="hover" color="#5F6D7E">
                    {lang === 'en' ? item.con : item.conZh}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
          <Box display="inline-block" width={[0.5, 0.5, 170, 100]}>
            <Typography
              variant="subtitle1"
              color="#272D37"
              fontWeight="bold"
              lineHeight="24px"
            >
              Resources
            </Typography>
            <Box pb={7.25} pt={2}>
              {footerList2.map((item) => (
                <Box key={item.con} height={36} sx={{ lineHeight: '36px' }}>
                  <Link href={item.href} underline="hover" color="#5F6D7E">
                    {lang === 'en' ? item.con : item.conZh}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'table', clear: 'both' }}></Box>

      <Typography component={Box} height={60} mb={2} align="center">
        <LogoS />
      </Typography>

      <Typography component={Box} variant="subtitle2" align="center">
        &copy; {new Date().getFullYear()} EIP.Fun. All Rights Reserved.
      </Typography>
    </Box>
  );
}
