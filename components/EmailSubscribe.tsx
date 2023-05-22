import React, { useState } from 'react';
import {
  Link,
  Box,
  TextField,
  TextFieldProps,
  Typography,
  styled,
  Button,
} from '@mui/material';

import EastIcon from '@mui/icons-material/East';

import MuiAlert, { AlertProps } from '@mui/material/Alert';

const SubInput = styled(TextField)<TextFieldProps>(({theme}) => ({
  background: '#fff',
  '.MuiInputBase-root': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  [theme.breakpoints.down('md')]: {
      width: '67%',
  },
  
}));
const EmailSubscribe = (): JSX.Element => {

  return (
    <>
      <Box className="contentleft">
        <Typography variant="h3">
          Not miss a beat of EIPs&rsquo; update?
        </Typography>
        <Typography variant="body1" marginBottom='10px' marginTop='10px'>
          Subscribe EIPs Fun to receive the latest updates of EIPs Good for
          Buidlers to follow up.
        </Typography>
        <Link href="#" color="#437EF7" fontWeight={600} underline="hover">
          View all <EastIcon sx={{ width: 14, verticalAlign: 'middle' }} />
        </Link>
      </Box>
      <Box className="contentRight">
      <form action="https://gmail.us11.list-manage.com/subscribe/post?u=d991f001a9a6097d6659412d6&amp;id=8be65ec859&amp;f_id=00a495e0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"  target="_blank" >
        {/* <form onSubmit={handleSubmit(onSubmit)} > */}
          <SubInput
            type="email"
            name="EMAIL"
            placeholder="Enter your email"
            size="small"
       
          />
          
          <Button
            variant="contained"
           
            size="medium"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    
    </>
  );
};

export default EmailSubscribe;
