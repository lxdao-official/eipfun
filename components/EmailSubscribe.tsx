import Link, { LinkProps } from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import {
  Button,
  ButtonProps,
  TextField,
  TextFieldProps,
  styled,
} from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import Snackbar from '@mui/material/Snackbar';
import { useForm, SubmitHandler } from 'react-hook-form';
const ADDR = process.env.NEXT_PUBLIC_BACKEND_ADDR;

type FormValues = {
  email: string;
};
import MuiAlert, { AlertProps } from '@mui/material/Alert';
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
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertErrorOpen, setAlertErrorOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [mailAddress, setMailAddress] = useState<string>('');
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log({ address: data.email });
    let sendData = { address: data.email };
    axios
      .post(`${ADDR}/email/subscribe`, sendData)
      .then((res) => {
        console.log(res);
        if (res.data && res.data.data) {
          setAlertOpen(true);
        } else {
          setErrorMessage(res.data.message);
          setAlertErrorOpen(true);
        }
      })
      .catch((err) => {
        setAlertErrorOpen(true);
      });
  };

  const SubButton = styled(Button)<ButtonProps>(({ theme }) => ({
    height: 40,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  }));
  const EipsLink = styled(Link)<LinkProps>(({ theme }) => ({
    // color: theme.palette.primary.main,
    color: '#437EF7',
    display: 'inline-flex',
    alignItems: 'center',
  }));

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
      <div className="contentleft">
        <h3>Not miss a beat of EIPs update? </h3>
        <p>
          Subscribe EIPs Fun to receive the latest updates of EIPs Good for
          Buidlers to follow up.{' '}
        </p>
        <EipsLink href="#">
          View all <EastIcon sx={{ width: 14, marginLeft: '10px' }} />
        </EipsLink>
      </div>
      <div className="contentRight">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SubInput
            type="email"
            {...register('email')}
            placeholder="Enter your email"
            size="small"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMailAddress(event.target.value);
            }}
          />
          <SubButton variant="contained" size="medium" type="submit">
            Submit
          </SubButton>
        </form>
      </div>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Subscribed
        </Alert>
      </Snackbar>
      <Snackbar
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
