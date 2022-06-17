import {
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  ChatIcon,
  HamburgerIcon,
  StarIcon,
  BellIcon,
  AddIcon,
} from '@chakra-ui/icons';
import React from 'react';

interface WidgetProps {
  display?: string;
}

const Widgets: React.FC<WidgetProps> = ({...rest}) => {
  return (
    <Box {...rest}>
      <HStack display={{base: 'none', md: 'flex'}}>
        <IconButton
          variant="ghost"
          aria-label="nav to pouplar posts"
          icon={<StarIcon />}
        />
        <IconButton
          variant="ghost"
          aria-label="new posts"
          icon={<BellIcon />}
        />
        <IconButton variant="ghost" aria-label="chatroom" icon={<ChatIcon />} />
        <IconButton
          variant="ghost"
          aria-label="create post"
          icon={<AddIcon />}
        />
      </HStack>
      <Box display={{md: 'none'}}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<StarIcon />}>Pouplar</MenuItem>
            <MenuItem icon={<BellIcon />}>Notification</MenuItem>
            <MenuItem icon={<ChatIcon />}>Chat</MenuItem>
            <MenuItem icon={<AddIcon />}>New Post</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Widgets;
