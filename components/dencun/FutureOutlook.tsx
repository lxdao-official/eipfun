import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useT } from '@/hooks/useGetLang';

const Item = function Item({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="body1"
      lineHeight={'24px'}
      color={'#5F6D7E'}
      sx={{
        position: 'relative',
        mb: 1.25,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: 0,
          zIndex: 1,
          marginTop: '-9px',
          display: 'block',
          width: '18px',
          height: '18px',
          background: "url('/images/dencun/check.jpg') center center no-repeat",
          backgroundSize: '80%',
        },
      }}
      pl={3.25}
    >
      {children}
    </Typography>
  );
};

function FutureOutlook() {
  const T = useT();
  return (
    <Container sx={{ py: 8 }}>
      <Box
        sx={{
          overflow: 'hidden',
          '&::after': { content: '""', display: 'table', clear: 'both' },
        }}
      >
        <Box sx={{ float: 'left' }}>
          <Typography
            fontWeight="bold"
            fontSize={32}
            lineHeight={'42px'}
            color={'#437EF7'}
            component="h2"
            mt={7.5}
          >
            {T({
              en: 'Future Outlook',
              zh: '未来展望',
            })}
          </Typography>

          <Typography
            variant="body1"
            lineHeight={'24px'}
            maxWidth={532}
            color={'#5F6D7E'}
            mt={2}
          >
            {T({
              en: 'Although the Gas fees on L2 have already decreased several times compared to the Ethereum mainnet, the Cancun upgrade will further reduce L2 by 10 times (estimated). This will greatly promote the activity and innovation of the application layer on L2:',
              zh: '虽然 L2 的 Gas fee 已经相比以太坊主网降低了数倍，坎昆升级将 L2 继续降低 10 倍（估算），这将极大的促进 L2 上面的应用层的活动和创新：',
            })}
          </Typography>

          <Box pt={3} pb={1.75} maxWidth={532}>
            <Item>
              {T({
                en: `DeFi transaction efficiency improvement and reduction in transaction fees`,
                zh: 'DeFi 交易效率提升，交易手续费下降',
              })}
            </Item>
            <Item>
              {T({
                en: `Better performance, gaming experience, and gameplay for blockchain games`,
                zh: '全链游戏的性能、游戏体验、玩法更好',
              })}
            </Item>
            <Item>
              {T({
                en: `Developers can develop more complex applications without worrying about the fees paid by users`,
                zh: '开发者可以开发更加复杂应用而无需在乎用户使用的手续费',
              })}
            </Item>
            <Item>
              {T({
                en: `Large-scale transactions (such as Visa) become achievable`,
                zh: '大规模交易（例如 Visa）变得可实现',
              })}
            </Item>
          </Box>

          <Typography variant="body1">
            {T({
              en: `Let's look forward to and witness the future of Ethereum together!`,
              zh: '让我们期待和一起见证以太坊的未来！',
            })}
          </Typography>
        </Box>

        <Box
          sx={{ float: 'right' }}
          width={560}
          height={560}
          bgcolor={'#F4F4F4'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Image
            src="/images/dencun/future_right.png"
            width={462}
            height={462}
            alt="future outlook dencun"
          />
        </Box>
      </Box>
    </Container>
  );
}

export default React.memo(FutureOutlook);
