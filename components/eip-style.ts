import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Line = styled(Box)({
  height: '1px',
  background: '#EAEBF0',
});

export const Banner = styled(Box)({
  position: 'relative',
  height: '310px',
  lineHeight: '310px',
  background: "#333 url('/images/eip_details_bg.png') no-repeat top left",
  color: '#fff',
  borderRadius: '4px',
  border: '1px solid #f3f3f3',
});

export const BannerText = styled(Box)({
  position: 'absolute',
  right: '50px',
  bottom: '55px',
  height: '80px',
  lineHeight: '80px',
  fontSize: '80px',
  fontWeight: '600',
  color: '#fff',
});

export const PageTitle = styled(Box)({
  lineHeight: '48px',
  padding: '32px 0 16px',
  fontSize: '40px',
  fontWeight: '600',
  color: '#272D37',
});

export const PageDescribe = styled(Box)({
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '24px',
  paddingBottom: '18px',
});
