import {useEffect} from 'react';
import {Button} from '@chakra-ui/react';
import type {NextPage} from 'next';
import useAuth from '../hooks/useAuth';
import {getProfile} from '../lib/auth';

const Home: NextPage = () => {
  const {authState, handleUserLogout} = useAuth();

  useEffect(() => {
    getProfile().then(({data, error}) => {
      console.log(data);
      console.log(error);
      console.log(authState)
    });
  }, []);

  return (
    <div>
      Hello<Button onClick={handleUserLogout}>Logout</Button>
    </div>
  );
};

export default Home;
