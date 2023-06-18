import React from 'react';
import { Box, Button } from '@mui/material';

export default function OriginalLink({
  eip,
  discussions,
}: {
  eip: string;
  discussions?: string;
}) {
  return (
    <Box pt={3} pb={3}>
      {discussions && (
        <Button
          sx={{ marginRight: '16px', borderRadius: '6px', padding: '0 16px' }}
          variant="contained"
          startIcon={
            <span
              style={{
                display: 'inline-block',
                width: '22px',
                height: '22px',
                background:
                  "url('/images/eip_details_discussions.png') center center no-repeat",
              }}
            />
          }
          size="large"
          href={discussions}
        >
          Discussions
        </Button>
      )}

      <Button
        variant="outlined"
        size="large"
        sx={{
          color: '#272D37',
          borderColor: '#DAE0E6',
          borderRadius: '6px',
          padding: '0 16px',
          '&:hover': {
            color: '#437ef7',
          },
        }}
        href={`https://eips.ethereum.org/EIPS/eip-${eip}`}
      >
        Original link
      </Button>
    </Box>
  );
}
