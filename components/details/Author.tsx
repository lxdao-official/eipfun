import React from 'react';
import { Box } from '@mui/material';
import FormatLink from '@/components/FormatLink';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Author({ authors }: { authors: string }) {
  let author = '',
    authorArr: string[] | undefined,
    authorArrL: number;
  if (authors.includes(', ')) {
    authorArr = authors.split(', ');
    authorArrL = authorArr.length - 1;
  } else {
    author = authors;
  }

  return (
    <Box
      position="relative"
      py={1}
      sx={(theme) => ({
        lineHeight: '24px',
        fontSize: '14px',
        [theme.breakpoints.up('md')]: { paddingLeft: '44px' },
      })}
    >
      <Box
        position="absolute"
        top="50%"
        marginTop="-18px"
        left={[9999, 9999, 0, 0]}
      >
        <AccountCircleIcon
          sx={{
            width: 36,
            height: 36,
            color: '#5F6D7E',
            verticalAlign: 'middle',
          }}
        />
      </Box>

      {authorArr?.length &&
        authorArr.map((item: string, i: number) => (
          <React.Fragment key={item}>
            <FormatLink author={item} />
            {i === authorArrL ? '' : ', '}
          </React.Fragment>
        ))}

      {author && <FormatLink author={author} />}
    </Box>
  );
}
