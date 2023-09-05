import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function ChatGpt({
  chatgpt4,
  summary,
}: {
  chatgpt4: string;
  summary?: string;
}) {
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
      {summary ? null : (
        <Box mb={2.5}>
          <Image
            width={26}
            height={26}
            alt="chatGpt icon"
            src="/images/eip_details_chatgpt.png"
            loading="lazy"
            style={{
              verticalAlign: 'middle',
              marginRight: '18px',
            }}
          />

          <Typography
            sx={{ background: '#F5FAFF' }}
            display="inline-block"
            px={1.5}
            variant="subtitle2"
            lineHeight="28px"
            borderRadius={1.5}
            border={1}
            borderColor="#F5F5F5"
            color="#437EF7"
            fontSize={14}
            fontWeight="bold"
          >
            By ChatGPT-4
          </Typography>
        </Box>
      )}

      <Typography
        color="#24292f"
        variant="body1"
        lineHeight={1.5}
        dangerouslySetInnerHTML={{
          __html: summary || chatgpt4,
        }}
      ></Typography>
    </Box>
  );
}
