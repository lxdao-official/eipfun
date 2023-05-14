import React, { useState } from 'react';
import axios from 'axios';
import {
  Link,
  Box,
  Button,
  TextField,
  TextFieldProps,
  Typography,
  styled,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import EastIcon from '@mui/icons-material/East';
import Snackbar from '@mui/material/Snackbar';
import { useForm, SubmitHandler } from 'react-hook-form';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const ADDR = process.env.NEXT_PUBLIC_BACKEND_ADDR;

type FormValues = {
  email: string;
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SubInput = styled(TextField)<TextFieldProps>(({ theme }) => ({
  background: '#fff',

  '.MuiInputBase-root': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
}));
const EmailSubscribe = (): JSX.Element => {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertErrorOpen, setAlertErrorOpen] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let sendData = { address: data.email };
    setSubmitLoading(true)
    axios
      .post(`${ADDR}/email/subscribe`, sendData)
      .then((res) => {
        setSubmitLoading(false)
        if (res.data && res.data.data) {
          setAlertOpen(true);
        } else {
          setErrorMessage(res.data.message);
          setAlertErrorOpen(true);
        }
      })
      .catch((err) => {
        setSubmitLoading(false)

        setAlertErrorOpen(true);
      });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
    setAlertErrorOpen(false);
  };
  return (
    <>
      <Box className="contentleft">
        <Typography variant="h3">Not miss a beat of EIPs' update? </Typography>
        <Typography variant="body1" marginBottom={'10px'} marginTop={'10px'}>
          Subscribe EIPs Fun to receive the latest updates of EIPs Good for
          Buidlers to follow up.
        </Typography>
        <Link href="#" color="#437EF7" fontWeight={600} underline="hover">
          View all <EastIcon sx={{ width: 14, verticalAlign: 'middle' }} />
        </Link>
      </Box>
      <Box className="contentRight">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SubInput
            type="email"
            {...register('email')}
            placeholder="Enter your email"
            size="small"
          />
          <LoadingButton
            size="medium"
            type="submit"
            loading={submitLoading}
            loadingPosition="start"
            variant="contained"
            startIcon={<SubscriptionsIcon />}
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              height: 40,
            }}
          >
            <span>Submit</span>
          </LoadingButton>
          {/* <Button
            variant="contained"
           
            size="medium"
            type="submit"
          >
            Submit
          </Button> */}
        </form>
      </Box>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Subscribed
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={alertErrorOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EmailSubscribe;
