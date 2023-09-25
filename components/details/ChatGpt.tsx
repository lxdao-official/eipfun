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
