import Head from 'next/head';
import React from 'react';
import {Box, Container, Spinner} from '@chakra-ui/react';
import Header from './Header';
import useAuth from '../../hooks/useAuth';

interface LayputProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayputProps> = ({children}) => {
  const {isLoading} = useAuth();

  if (isLoading) {
    return (
      <Box
        as="main"
        w="100vw"
        h="100vh"
        display="grid"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Box>
    );
  }

  return (
    <Box as="main" w="100%">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Reddit Clone" />
        <meta name="author" content="Hsing Ying Li" />
        <title>Reddit Clone</title>
      </Head>
      <Header />
      <Container maxW="container.lg" pt={16}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
