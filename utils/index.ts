import React from 'react';

export const flatten = (text: string, child: React.ReactNode): string => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(
        (child as React.ReactElement).props.children
      ).reduce(flatten, text);
};
