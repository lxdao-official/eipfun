import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Status({
  status,
  type,
  category,
}: {
  status: string;
  type: string;
  category?: string;
}) {
  return (
    <Box pb={4} pt={2}>
      <Typography
        display="inline-block"
        component="span"
        variant="body2"
        color="#FF8A00"
        fontSize={14}
        borderRadius="5px"
        px={1}
        mr={2}
        style={{ background: '#FFF1E4' }}
      >
        {status}
      </Typography>

      <Typography
        display="inline-block"
        component="span"
        variant="body2"
        color="#437EF7"
        fontSize={14}
        borderRadius="5px"
        px={1}
        mr={2}
        style={{ background: '#F5FAFF' }}
      >
        {type}
        {category ? ': ' + category : ''}
      </Typography>
    </Box>
  );
}
