import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
