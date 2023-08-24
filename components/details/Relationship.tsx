import React from 'react';
import { Box, Link, Typography } from '@mui/material';

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

      <Box mt={3} mb={6} border={1} borderColor={'#EAEBF0'} borderRadius={1.25}>
        {data.map((item) => (
          <Link
            display={'flex'}
            sx={{
              boxSizing: 'border-box',
              borderBottom: '1px solid #EAEBF0',
              '&:last-child': { border: 0 },
            }}
            py={2.5}
            key={item.title}
            href={item.link}
            underline="none"
          >
            <Typography
              flex={1}
              px={4}
              component={Box}
              variant="h6"
              fontWeight={500}
              fontSize={16}
              lineHeight={'48px'}
            >
              <Typography
                component={Box}
                variant="h6"
                fontWeight={500}
                fontSize={18}
                lineHeight={'28px'}
                color={'var(--gray-700, #272D37)'}
              >
                {eip}
              </Typography>
              <Typography
                component={Box}
                variant="body1"
                fontWeight={500}
                fontSize={16}
                lineHeight={'24px'}
                color={'var(--gray-50, #5F6D7E)'}
              >
                {item.title}
              </Typography>
            </Typography>

            <Typography
              component={Box}
              variant="body1"
              height={'28px'}
              mx={4}
              px={1.5}
              py={0}
              mt={2}
              bgcolor={'var(--primary-25, #F5FAFF)'}
              lineHeight={'28px'}
              borderRadius={'5px'}
              color="#437EF7"
              fontSize={14}
            >
              Learn more
            </Typography>
          </Link>
        ))}
      </Box>
    </>
  );
}

export default React.memo(Relationship);
