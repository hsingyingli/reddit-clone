import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import theme from '../lib/theme'

interface ChakraProps {
  children: React.ReactNode;
}

const Chakra: React.FC<ChakraProps> = ({children}) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Chakra;
