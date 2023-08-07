import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import useGetLang from '@/hooks/useGetLang';

export default function Requires({ data }: { data?: string }) {
  const lang = useGetLang();
  if (!data || data === '0') {
    return null;
  }

  return (
    <Box pb={[1, 1, 2, 2]} sx={{ fontSize: '14px' }}>
      <Typography fontWeight="bold" fontSize={14} component="span">
        {lang === 'en' ? 'Requires' : '关联 EIP'}:{' '}
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
