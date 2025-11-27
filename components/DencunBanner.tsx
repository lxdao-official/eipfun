import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import useLang, { useT } from '@/hooks/useGetLang';

export default function DencunBanner() {
  const lang = useLang();
  const T = useT();
  return (
    <Container sx={{ py: 8 }}>
      <Box
        display={'flex'}
        alignItems="center"
        sx={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(255,217,130,0.25), transparent 32%), radial-gradient(circle at 70% 30%, rgba(127,90,240,0.26), transparent 35%), linear-gradient(120deg, #0f101d 0%, #191b2c 40%, #0f101d 100%)',
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          minHeight: 280,
          px: { xs: 3, md: 6 },
          py: { xs: 4, md: 5 },
        }}
      >
        <Box flex={1} maxWidth={620} zIndex={1}>
          <Typography
            fontWeight={700}
            fontSize={18}
            color={'#f9e67a'}
            component="h3"
            textTransform={'uppercase'}
            letterSpacing={1}
            sx={{ textShadow: '0 0 16px rgba(249,230,122,0.4)' }}
          >
            {T({ en: 'Fusaka Upgrade', zh: 'Fusaka 升级' })}
          </Typography>
          <Typography
            component="h2"
            fontSize={{ xs: 30, md: 36 }}
            color={'#f4f6ff'}
            fontWeight={800}
            lineHeight={1.2}
            mt={1}
          >
            {T({
              en: 'PeerDAS & eth/69: explore Fusaka key EIPs and mint the Fusaka NFT',
              zh: 'PeerDAS 与 eth/69：了解 Fusaka 核心 EIP，领取 Fusaka NFT',
            })}
          </Typography>
          <Typography
            color="#c9cfe8"
            fontSize={15}
            lineHeight={1.6}
            mt={2}
            maxWidth={540}
          >
            {T({
              en: 'PeerDAS (EIP-7594) boosts data availability for rollups, while eth/69 (EIP-7642) streamlines EL networking by dropping pre-merge fields and advertising served history. Catch up on the Fusaka fork highlights and join the commemorative mint.',
              zh: 'PeerDAS（EIP-7594）提升 Rollup 的数据可用性，eth/69（EIP-7642）通过移除合并前字段并声明可提供的历史范围来精简执行层网络。快速了解 Fusaka 分叉亮点并参与纪念 NFT 铸造。',
            })}
          </Typography>
          <Box mt={3} display="flex" gap={2} flexWrap="wrap">
            <Button
              variant="contained"
              size="medium"
              sx={{
                px: 2.5,
                background: 'linear-gradient(135deg, #f9e67a, #ff8dd2)',
                color: '#0f101d',
                fontWeight: 700,
                boxShadow:
                  '0 12px 24px rgba(255,141,210,0.35), 0 0 16px rgba(249,230,122,0.45)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ffef9a, #ffa5dd)',
                  boxShadow:
                    '0 14px 26px rgba(255,141,210,0.45), 0 0 18px rgba(249,230,122,0.6)',
                },
              }}
              href={lang === 'en' ? '/fusaka' : '/zh/fusaka'}
            >
              {T({ en: 'Fusaka Details', zh: '查看 Fusaka' })}
            </Button>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                px: 2.5,
                borderColor: 'rgba(249,230,122,0.6)',
                color: '#f9e67a',
                '&:hover': { borderColor: '#f9e67a', background: 'rgba(249,230,122,0.08)' },
              }}
              href={lang === 'en' ? '/fusaka#mint-nft' : '/zh/fusaka#mint-nft'}
            >
              {T({ en: 'Mint Fusaka NFT', zh: '铸造 Fusaka NFT' })}
            </Button>
          </Box>
        </Box>
        <Box
          flex={1}
          position="relative"
          minHeight={220}
          display={{ xs: 'none', md: 'block' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              right: '8%',
              transform: 'translateY(-50%)',
              width: 260,
              height: 260,
              background:
                'radial-gradient(circle, rgba(255,141,210,0.35) 0%, rgba(15,16,29,0) 65%)',
              filter: 'blur(10px)',
            }}
          />
          <Box
            component="img"
            src="/images/fusaka/fusaka.png"
            alt="Fusaka NFT"
            sx={{
              position: 'absolute',
              top: '50%',
              right: '6%',
              transform: 'translateY(-50%)',
              width: 280,
              height: 280,
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 25px rgba(255,141,210,0.35))',
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}
