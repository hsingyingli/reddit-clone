import React from 'react';
import {Box, Text} from '@chakra-ui/react';
import {FaReddit} from 'react-icons/fa';

const Logo: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" cursor="pointer" px={2}>
      <FaReddit
        size="2em"
        color="#FD4501"
        style={{backgroundColor: 'white', borderRadius: '50%'}}
      />
      <Text
        mx={2}
        fontSize="1.5rem"
        fontWeight="medium"
        display={{base: 'none', md: 'inline'}}
      >
        reddit
      </Text>
    </Box>
  );
};

export default Logo;
