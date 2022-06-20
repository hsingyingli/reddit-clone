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
import {ProfileType} from '../../../@types/auth';
import {getProfile} from '../../../lib/auth';

const UserInfo: React.FC = () => {
  const router = useRouter();
  const {authState, handleUserLogout} = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);

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
          <Avatar
            size="sm"
            name={profile?.username}
            src={profile?.avatar_url}
          />
        </MenuButton>
        <MenuList>
          <NextLink href="/profile">
            <MenuItem fontWeight="bold">Profile</MenuItem>
          </NextLink>
          <MenuDivider />
          {authState.isAuth ? (
            <Button mx={2} size="sm" onClick={handleUserLogout}>
              Logout
            </Button>
          ) : (
            <>
              {' '}
              <Button mx={2} size="sm">
                <NextLink href="/login">Login</NextLink>
              </Button>
              <Button mx={2} size="sm">
                <NextLink href="/signup">SignUp</NextLink>
              </Button>
            </>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default UserInfo;
