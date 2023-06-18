import React from 'react';
import { Link } from '@mui/material';

export default function FormatLink({ author }: { author: string }) {
  if (author.includes('<')) {
    let [name, linkText] = author.split('<');
    let link;
    linkText = linkText.replace('>', '');
    link = 'mailto:' + linkText;
    return (
      <>
        {name}
        {'<'}
        <Link underline="hover" href={link}>
          {linkText}
        </Link>
        {'>'}
      </>
    );
  } else if (author.includes('(')) {
    let [name, linkText] = author.split('(');
    let link;
    linkText = linkText.replace(')', '');
    link = 'https://github.com/' + linkText.replace('@', '');
    return (
      <>
        {name}(
        <Link underline="hover" target="_blank" href={link}>
          {linkText}
        </Link>
        )
      </>
    );
  } else {
    return <>{author}</>;
  }
}
