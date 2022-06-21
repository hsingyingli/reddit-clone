import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {GetServerSideProps} from 'next';
import {
  Box,
  Input,
  Button,
  Heading,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  useColorModeValue,
} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import {supabase} from '../lib/supabase-client';

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const {user} = await supabase.auth.api.getUserByCookie(req);
  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [isValidData, setIsValidData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {handleUserLogin} = useAuth();

  const handleLogin: React.FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (pwd.length < 6 || email.length == 0) {
      setIsValidData(false);
      setPwd('');
      setIsLoading(false);
      setEmail('');
      return;
    }

    handleUserLogin(email, pwd)
      .then((user) => {
        setIsValidData(true);
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
        setIsValidData(false);
      })
      .finally(() => {
        setEmail('');
        setPwd('');
        setIsLoading(false);
      });
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
      <Box p={5}>
        {!isValidData && (
          <Alert
            status="error"
            borderRadius={5}
            mb={3}
            fontWeight="bold"
            fontSize="sm"
          >
            <AlertIcon />
            Make sure <br />
            1. valid email <br /> 2. length of password must greater than 6.
          </Alert>
        )}
        <Box
          bg={useColorModeValue('white', 'gray.900')}
          borderWidth="thin"
          p={8}
          boxShadow={'2xl'}
          rounded={'lg'}
        >
          <Heading
            size="xl"
            color={useColorModeValue('gray.800', 'gray.200')}
            mb={2}
          >
            Login to Reddit Clone
          </Heading>
          <form onSubmit={handleLogin}>
            <FormControl isRequired my={2}>
              <FormLabel>Email</FormLabel>
              <Input
                as="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <FormControl isRequired my={2}>
              <FormLabel>Password</FormLabel>
              <Input
                as="input"
                type="password"
                placeholder="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
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
            <Button
              isLoading={isLoading}
              as="button"
              onClick={handleLogin}
              type="submit"
              rounded={'full'}
              _hover={{
                bg: 'gray.400',
              }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
