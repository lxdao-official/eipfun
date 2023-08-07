import { Box, Typography, Link, Icon } from '@mui/material';
import useGetLang from '@/hooks/useGetLang';
import Logo32 from 'public/images/logo32.svg';
import Telegram from 'public/images/telegram.svg';
import Twitter from 'public/images/twitter.svg';
import {
  Telegram as TelegramLink,
  Twitter as TwitterLink,
} from '@/common/config';

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
  { con: 'Community', conZh: '社区', href: TelegramLink },
];

const footerList2: footerItem[] = [
  { con: 'LXDAO', conZh: 'LXDAO', href: 'https://lxdao.io' },
  {
    con: 'PlanckerDAO',
    conZh: 'PlanckerDAO',
    href: 'https://www.plancker.org',
  },
];

export default function Footer() {
  const lang = useGetLang();

  const t = ({ en, zh }: { en: string; zh: string }) => {
    if (lang === 'en') {
      return en;
    } else if (lang === 'zh') {
      return zh;
    }
    return en;
  };

  return (
    <Box bgcolor={'#f8f9fb'} py={[5, 5, 8, 8]}>
      <Box
        maxWidth={1280}
        width={0.9}
        margin="0 auto"
        sx={{ '&::after': { content: '""', display: 'table', clear: 'both' } }}
      >
        <Box
          sx={{ float: 'left' }}
          width={[1, 1, 0.5, 0.5]}
          mb={[4, 4, 0, 0, 0]}
        >
          <Box pb={2}>
            <Logo32 />
          </Box>

          <Typography component={Box} pb={2} variant="body1">
            {t({
              en: 'Serve EIP builders, scale Ethereum.',
              zh: '聚集 EIP 贡献者, 扩展以太坊',
            })}
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
            <Link href={TwitterLink} target="_blank" color={'#101828'} mr={1.5}>
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
          </Box>
        </Box>

        <Box sx={{ float: 'right' }} width={[1, 1, 320, 390]}>
          <Box display="inline-block" width={[0.5, 0.5, 150, 270]}>
            <Typography
              variant="subtitle1"
              color="#272D37"
              fontWeight="bold"
              lineHeight="24px"
            >
              {t({ en: 'Resources', zh: '资源' })}
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
          <Box display="inline-block" width={[0.5, 0.5, 170, 120]}>
            <Typography
              variant="subtitle1"
              color="#272D37"
              fontWeight="bold"
              lineHeight="24px"
            >
              {t({ en: 'Supported by', zh: '支持社区' })}
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
    </Box>
  );
}
