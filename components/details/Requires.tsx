import React from 'react';
import { Box, Link, Typography } from '@mui/material';

export default function Requires({ data, T }: { data?: string; T: Function }) {
  if (!data || data === '0') {
    return null;
  }

  return (
    <Box pb={[1, 1, 1.5, 1.5]} sx={{ fontSize: '14px' }}>
      <Typography fontWeight="bold" fontSize={14} component="span">
        {T({ en: 'Requires', zh: '关联 EIP' })}:{' '}
      </Typography>
      {data.includes(', ') ? (
        data.split(', ').map((item: string, i: number) => (
          <React.Fragment key={item}>
            {i !== 0 ? ', ' : ''}
            <Link underline="none" href={`/eips/eip-${item}`}>
              EIP-{item}
            </Link>
          </React.Fragment>
        ))
      ) : (
        <Link underline="none" href={`/eips/eip-${data}`}>
          EIP-{data}
        </Link>
      )}
    </Box>
  );
}
