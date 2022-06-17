import React from "react";
import {Box, Container} from '@chakra-ui/react';
import Header from './Header'


interface LayputProps {
  children: React.ReactNode;
  }

const Layout: React.FC<LayputProps> = ({children}) => {
  return (
    <Box as='main' w='100%'>
      <Header/>
      <Container maxW='container.xl' pt={16}>
        {children}
      </Container>
    </Box>
  )
}

export default Layout;
