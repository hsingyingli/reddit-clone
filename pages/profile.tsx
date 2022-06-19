import {GetServerSideProps} from 'next';
import React from 'react';
import {Box} from '@chakra-ui/react';
import {supabase} from '../lib/supabase-client';
import {getProfile} from '../lib/auth';
import {ProfileType} from '../@types/auth';

type ProfileProps = {
  profile: ProfileType
  }

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

  const {data: profile} = await getProfile(user.id)

  return {
    props: {profile},
  };
};


const Profile: React.FC<ProfileProps> = ({profile}) => {
  return (
  <Box>
    <pre>{JSON.stringify(profile, null, 2)}</pre>
  </Box>

  );
};

export default Profile;
