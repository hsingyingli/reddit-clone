import React from 'react';
import {Box, InputGroup, InputLeftElement, Input} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';

const SearchBar: React.FC = () => {
  return (
    <Box maxW="40%" flexGrow={1}>
      <InputGroup >
        <InputLeftElement pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>
        <Input placeholder="search reddit" />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
