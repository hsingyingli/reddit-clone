import {GetServerSideProps} from 'next';
import React, {useState, useEffect} from 'react';
import {supabase} from '../lib/supabase-client';
import {getProfile, updateProfile} from '../lib/auth';
import {ProfileType} from '../@types/auth';
import {PostgrestError} from '@supabase/supabase-js';
import useAuth from '../hooks/useAuth';
import PersonalAvatar from '../components/Avatar';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

type ProfileProps = {
  profile: ProfileType | null;
  error: PostgrestError | null;
};

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const {user} = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
      props: {},
    };
  }

  const {data: profile, error: getError} = await getProfile(user.id);

  if (profile)
    return {
      props: {profile, error: getError},
    };

  const {data, error: InsertError} = await supabase
    .from('profiles')
    .insert({id: user?.id, updated_at: new Date()});

  if (InsertError) throw InsertError;

  return {
    props: {profile: data, error: InsertError},
  };
};

const Profile: React.FC<ProfileProps> = ({profile, error}) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(profile?.username);
  const [website, setWebsite] = useState(profile?.website);
  const [avatar_url, setAvatarUrl] = useState(profile?.avatar_url);
  const {handleUserLogout, authState, handleUpdateUser} = useAuth();
  const toast = useToast();
  const handleUpdateProfile = async () => {
    if (
      username === undefined &&
      website === undefined &&
      avatar_url === undefined
    )
      return;

    try {
      setLoading(true);

      const updates = {
        id: authState.user?.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let {error} = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) throw error;

      toast({
        title: 'Profile updated.',
        position: 'top',
        variant: 'subtle',
        description: '',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      handleUpdateUser();

    } catch (error: any) {
      toast({
        title: 'Profile updated.',
        position: 'top',
        variant: 'subtle',
        description: JSON.stringify(error),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      h="100vh"
      w="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
        justifyItems={'center'}
        justifyContent={'center'}
      >
        <PersonalAvatar
          url={avatar_url}
          onUpload={(url: any) => {
            setAvatarUrl(url);
            updateProfile({username, website, avatar_url: url});
          }}
        />

        <Stack spacing={4} p={4}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type={'text'}
              value={username || ''}
              onChange={(e: any) => setUsername(e.target.value)}
              placeholder={username || 'username'}
              color={useColorModeValue('gray.800', 'gray.200')}
              bg={useColorModeValue('gray.100', 'gray.600')}
              rounded={'full'}
              border={0}
              _focus={{
                bg: useColorModeValue('gray.200', 'gray.800'),
                outline: 'none',
              }}
            />
          </FormControl>
        </Stack>
        <Stack spacing={4} p={4}>
          <FormControl>
            <FormLabel>Website</FormLabel>
            <Input
              type={'text'}
              value={website || ''}
              onChange={(e: any) => setWebsite(e.target.value)}
              placeholder={website || 'website'}
              color={useColorModeValue('gray.800', 'gray.200')}
              bg={useColorModeValue('gray.100', 'gray.600')}
              rounded={'full'}
              border={0}
              _focus={{
                bg: useColorModeValue('gray.200', 'gray.800'),
                outline: 'none',
              }}
            />
          </FormControl>
        </Stack>
        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            onClick={handleUserLogout}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}
          >
            Logout
          </Button>
          <Button
            isLoading={loading}
            loadingText="Updating ..."
            onClick={handleUpdateProfile}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'green.400'}
            color={'white'}
            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{
              bg: 'green.500',
            }}
            _focus={{
              bg: 'green.500',
            }}
          >
            {loading || 'Update'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Profile;
