import React, { useEffect } from 'react';
import { Link, Box, Typography } from '@mui/material';

import EastIcon from '@mui/icons-material/East';
import Script from 'next/script';
import useGetLang from '@/hooks/useGetLang';

const EmailSubscribe = (): JSX.Element => {
  const lang = useGetLang();
  useEffect(() => {
    if ((window as any).CustomSubstackWidget) {
      return;
    }
    (window as any).CustomSubstackWidget = {
      substackUrl: 'eipfun.substack.com',
      placeholder: 'example@gmail.com',
      buttonText: lang === 'en' ? 'Submit' : '邮件订阅',
      theme: 'custom',
      colors: {
        primary: '#437EF7',
        input: '#fff',
        email: '#333',
        text: '#fff',
      },
    };
  }, [lang]);
  const t = ({ en, zh }: { en: string; zh: string }): string => {
    if (lang === 'en') {
      return en;
    } else if (lang === 'zh') {
      return zh;
    }
    return en;
  };

  return (
    <>
      <Script src="https://substackapi.com/widget.js" async></Script>

      <Box className="contentleft">
        <Typography variant="h3">
          {t({
            en: "Not miss a beat of EIPs' update?",
            zh: '不想错过最新的 EIP 动态？',
          })}
        </Typography>
        <Typography variant="body1" marginBottom="10px" marginTop="10px">
          {t({
            en: `Subscribe EIPs Fun to receive the latest updates of EIPs Good for
          Buidlers to follow up.`,
            zh: '订阅 EIPs Fun 周刊以跟进相关更新，建⽴你与 EIP 之间的连接 ，更好地建设以太坊。',
          })}
        </Typography>
        <Link
          href="https://eipfun.substack.com"
          target="_blank"
          color="#437EF7"
          fontWeight={600}
          underline="hover"
        >
          {t({ en: ' View all ', zh: '详情' })}
          <EastIcon sx={{ width: 14, verticalAlign: 'middle' }} />
        </Link>
      </Box>
      <Box className="contentRight">
        {/* <form
          action="https://gmail.us11.list-manage.com/subscribe/post?u=d991f001a9a6097d6659412d6&id=8be65ec859&f_id=00a495e0f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_blank"
        >
          <SubInput
            type="email"
            name="EMAIL"
            placeholder="Enter your email"
            size="small"
          />
          <Button
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              height: 40,
            }}
            variant="contained"
            size="medium"
            type="submit"
          >
            Submit
          </Button>
        </form> */}
        <div id="custom-substack-embed"></div>
      </Box>
    </>
  );
};

export default EmailSubscribe;
