import React from 'react';
import { Container, Box, Button, ButtonProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useT } from '@/hooks/useGetLang';

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: '#437EF7',
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#fff',
    opacity: 0.8,
  },
}));

function ReferenceLinks() {
  const T = useT();
  const url = 'https://eips.ethereum.org/EIPS/eip-7569';
  return (
    <Box height={288} bgcolor={'#2B63D9'}>
      <Container>
        <Typography
          fontWeight="bold"
          fontSize={32}
          align="center"
          pt={8}
          lineHeight={'42px'}
          color={'#fff'}
          component="h2"
        >
          {T({ en: 'Reference Links', zh: '坎昆升级' })}
        </Typography>

        <Typography
          fontWeight="bold"
          fontSize={16}
          align="center"
          color={'#fff'}
          component="h4"
          mt={2}
          sx={{ opacity: 0.5 }}
        >
          <Link href={url}>
            {T({
              en: 'https://eips.ethereum.org/EIPS/eip-7569',
              zh: 'https://eips.ethereum.org/EIPS/eip-7569',
            })}
          </Link>
        </Typography>

        <Box mt={4} sx={{ textAlign: 'center' }}>
          <ColorButton variant="contained" sx={{ padding: '0 18px' }}>
            <Link href={url} target="_blank">
              {T({ en: 'View', zh: '查看' })}
            </Link>
          </ColorButton>
        </Box>
      </Container>
    </Box>
  );
}

export default React.memo(ReferenceLinks);
