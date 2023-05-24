import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function Custom404() {
  return (
    <Box
      display="flex"
      height={596}
      bgcolor="#fff"
      alignItems="center"
      justifyContent="center"
    >
      <Box textAlign="center">
        <Image
          width={65}
          height={81}
          src="/images/404.png"
          alt="img no found"
        />
        <Typography
          component={Box}
          pt={3}
          variant="subtitle1"
          lineHeight="24px"
        >
          Not Found...
        </Typography>
      </Box>
    </Box>
  );
}
