import React, {useEffect, useState} from 'react';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {
  Box,
  Avatar,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
  Button,
} from '@chakra-ui/react';
import useAuth from '../../../hooks/useAuth';
import useAvatar from '../../../hooks/useAvatar';
import {ProfileType} from '../../../@types/auth';
import {getProfile} from '../../../lib/auth';

const UserInfo: React.FC = () => {
  const router = useRouter();
  const {authState, handleUserLogout} = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const avatarUrl = useAvatar(profile?.avatar_url || '');

  useEffect(() => {
    const read = async () => {
      const {data, error} = await getProfile(authState?.user?.id || '');
      setProfile(data);
    };
    read();
  }, [authState]);

  const RedirectToLogin = () => {
    router.push('/login');
  };

  return (
    <Box>
      <Menu>
        <MenuButton aria-label="Profile">
          {authState.isAuth ? (
            <Avatar size="sm" name={profile?.username} src={avatarUrl} />
          ) : (
            <Avatar size="sm" />
          )}
        </MenuButton>
        <MenuList>
          <NextLink href="/profile">
            <MenuItem fontWeight="bold">Profile</MenuItem>
          </NextLink>
          <MenuDivider />
          {authState.isAuth ? (
            <MenuItem mx={2} onClick={handleUserLogout}>
              Logout
            </MenuItem>
          ) : (
            <>
              <NextLink href="/login">
                <MenuItem mx={2}>Login</MenuItem>
              </NextLink>
              <NextLink href="/signup">
                <MenuItem mx={2}>signup</MenuItem>
              </NextLink>
            </>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default UserInfo;
