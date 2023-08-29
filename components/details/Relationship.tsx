import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';

function Relationship({
  eip,
  data,
  T,
}: {
  eip: string;
  data?: { title: string; link: string; imgSrc: string; alt: string }[];
  T: Function;
}) {
  if (!data || !data.length) {
    return null;
  }

  return (
    <>
      <Typography
        component={Box}
        variant="h6"
        fontSize="22px"
        lineHeight="30px"
        fontWeight="bold"
      >
        {T({ en: 'EIP relationship and deps', zh: 'EIP关系及依赖关系' })}
      </Typography>

      <Box
        mt={3}
        mb={3}
        sx={{ '&::after': { content: '""', display: 'table', clear: 'both' } }}
      >
        {data.map((item) => (
          <Link
            sx={{
              float: 'left',
              boxSizing: 'border-box',
              borderBottom: '1px solid #EAEBF0',
              padding: '0 0 26px',
              marginRight: '32px',
              overflow: 'hidden',
              '&:nth-of-type(3n)': {
                marginRight: '0',
              },
            }}
            width={254}
            mb={3}
            border={1}
            borderColor={'#EAEBF0'}
            borderRadius={1.5}
            key={item.title}
            href={item.link}
            underline="none"
          >
            <Box
              height={84}
              sx={{
                position: 'relative',
                background:
                  "#272D37 url('/images/eip_details_bg.png') no-repeat top left/contain",
              }}
            >
              <Box
                sx={(theme) => ({
                  position: 'absolute',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#fff',
                  [theme.breakpoints.down('md')]: { fontSize: '20px' },
                })}
                right={[12, 12, 15, 15]}
                bottom={10}
              >
                {eip}
              </Box>
            </Box>
            <Typography
              component={Box}
              variant="h6"
              px={3}
              my={2}
              fontWeight={600}
              fontSize={18}
              lineHeight={'30px'}
              color={'var(--gray-700, #272D37)'}
            >
              {eip}
            </Typography>
            <Typography
              component={Box}
              variant="body1"
              height={120}
              px={3}
              mb={2}
              lineHeight={'24px'}
              color={'var(--gray-50, #5F6D7E)'}
            >
              {item.title}
            </Typography>

            <Typography
              component={Box}
              variant="body1"
              height={'22px'}
              lineHeight={'22px'}
              borderRadius={'5px'}
              px={3}
              color="#437EF7"
              fontSize={15}
            >
              Learn more{' '}
              <EastIcon
                sx={{
                  width: 20,
                  height: 20,
                  marginLeft: 0.5,
                  verticalAlign: 'middle',
                }}
              />
            </Typography>
          </Link>
        ))}
      </Box>
    </>
  );
}

export default React.memo(Relationship);
