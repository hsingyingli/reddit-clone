import React from 'react';
import {
  Box,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
const ThemeButton: React.FC = () => {
  const {toggleColorMode} = useColorMode();
  return (
    <Box mx={2}>
      <IconButton
        aria-label="theme toggler"
        colorScheme={useColorModeValue('purple', 'orange')}
        icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
        onClick={toggleColorMode}
      />
    </Box>
  );
};

export default ThemeButton;
