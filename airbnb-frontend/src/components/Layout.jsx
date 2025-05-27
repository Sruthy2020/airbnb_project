import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex="1">{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
