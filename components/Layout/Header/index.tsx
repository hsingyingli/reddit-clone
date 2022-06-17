import {Box, Container, HStack} from '@chakra-ui/react';
import React from 'react';

import Logo from './Logo';
import SearchBar from './SearchBar';
import ThemeButton from './ThemeButton';
import Widgets from './Widgets';

const Header: React.FC = () => {
  const isLoggin = true;
  return (
    <Box
      position="fixed"
      width="100%"
      top={0}
      left={0}
      zIndex={1}
      bgColor="transparent"
      backdropBlur="sm"
      boxShadow="sm"
    >
      <Container
        display="flex"
        maxW="container.xl"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        {/*logo*/}
        <Logo />
        {/*search bar*/}
        <SearchBar />
        {/*widgets*/}
        <HStack ml={1}>
          <Widgets display={isLoggin ? 'inline' : 'none'} />
          <ThemeButton />
        </HStack>
      </Container>
    </Box>
  );
};
export default Header;
