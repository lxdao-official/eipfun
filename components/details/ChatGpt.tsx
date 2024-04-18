import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { useT } from '@/hooks/useGetLang';

export default function ChatGpt({
  summary,
  url,
}: {
  summary?: string;
  url: string;
}) {
  const T = useT();
  if (!summary) {
    return (
      <Box
        mt={3}
        borderRadius={1.5}
        px={2.5}
        pt={5}
        pb={3.75}
        border={1}
        borderColor={'#D9D9D9'}
        textAlign={'center'}
      >
        <Typography
          variant="subtitle2"
          component={Box}
          color={'#5F6D7E'}
          lineHeight={'20px'}
          mb={1}
        >
          {T({
            en: 'Anyone may contribute to propose contents.',
            zh: '欢迎补充好内容',
          })}
        </Typography>
        <Link
          display={'block'}
          href={url}
          color={'#437EF7'}
          lineHeight={'22px'}
          fontSize={'15px'}
          underline="none"
          target="_blank"
        >
          {T({
            en: 'Go propose',
            zh: '去提交',
          })}
          <EastIcon
            sx={{
              width: 14,
              height: 14,
              marginLeft: 0.5,
              verticalAlign: 'middle',
            }}
          />
        </Link>
      </Box>
    );
  }

  return (
    <Box
      px={4}
      pt={3}
      pb={5}
      border={1}
      borderColor="#f5f5f5"
      borderRadius="6px"
      sx={{ boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.06)' }}
    >
      {summary ? (
        <Typography
          color="#24292f"
          variant="body1"
          lineHeight={1.5}
          dangerouslySetInnerHTML={{
            __html: summary,
          }}
        ></Typography>
      ) : (
        <></>
      )}
    </Box>
  );
}
