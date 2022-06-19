import {
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
} from '@chakra-ui/react';
import {
  ChatIcon,
  HamburgerIcon,
  StarIcon,
  BellIcon,
  AddIcon,
} from '@chakra-ui/icons';
import React from 'react';
import useAuth from '../../../hooks/useAuth';

const Widgets: React.FC = () => {
  const {authState} = useAuth();
  return (
    <Box display={authState.isAuth ? 'inline' : 'none'}>
      <HStack display={{base: 'none', md: 'flex'}}>
        <Tooltip label='Popular Posts'>
          <IconButton
            variant="ghost"
            aria-label="nav to pouplar posts"
            icon={<StarIcon />}
          />
        </Tooltip>
        <Tooltip label='Notification'>
        <IconButton
          variant="ghost"
          aria-label="notification"
          icon={<BellIcon />}
        />
        </Tooltip>
        <Tooltip label='Chat room'>
        <IconButton variant="ghost" aria-label="chatroom" icon={<ChatIcon />} />
        </Tooltip>
        <Tooltip label='Create Post'>
        <IconButton
          variant="ghost"
          aria-label="create post"
          icon={<AddIcon />}
        />
        </Tooltip>
      </HStack>
      <Box display={{md: 'none'}}>
        <Menu>
          <MenuButton
            size='sm'
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<StarIcon />}>Pouplar</MenuItem>
            <MenuItem icon={<BellIcon />}>Notification</MenuItem>
            <MenuItem icon={<ChatIcon />}>Chat</MenuItem>
            <MenuItem icon={<AddIcon />}>Create Post</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Widgets;
