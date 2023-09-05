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
    <Box mt={[1, 1, 3, 3]}>
      <Typography
        display="inline-block"
        component="span"
        variant="body2"
        color="#FF8A00"
        fontSize={14}
        borderRadius="5px"
        px={1}
        mr={2}
        mt={0}
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
        mt={0}
        style={{ background: '#F5FAFF' }}
      >
        {type}
        {category ? ': ' + category : ''}
      </Typography>
    </Box>
  );
}
