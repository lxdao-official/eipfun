import React from 'react';
import { Box } from '@mui/material';
import FormatLink from '@/components/FormatLink';

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
      sx={(theme) => ({
        [theme.breakpoints.up('md')]: {
          background:
            "url('/images/eip_details_author.png') no-repeat left center/32px",
          paddingLeft: '40px',
        },
        '&::after': {
          content: '""',
          display: 'table',
          clear: 'both',
        },
      })}
      py={0.75}
    >
      {authorArr?.length &&
        authorArr.map((item: string, i: number) => (
          <React.Fragment key={item}>
            <span
              style={{
                float: 'left',
                lineHeight: '24px',
                marginRight: '12px',
                fontSize: '14px',
              }}
            >
              <FormatLink author={item} />
              {i === authorArrL ? '' : ','}
            </span>
          </React.Fragment>
        ))}

      {author && <FormatLink author={author} />}
    </Box>
  );
}
