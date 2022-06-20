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
  useToast,
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
      props: {user},
    };
  }
  return {
    props: {user},
  };
};

const SignUp: React.FC = (props) => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [isValidData, setIsValidData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {handleUserSignUp} = useAuth();

  const handleSignUp: React.FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (pwd.length < 6 || email.length == 0) {
      setIsValidData(false);
      setPwd('');
      setIsLoading(false);
      setEmail('');
      return;
    }

    handleUserSignUp(email, pwd)
      .then((user) => {
        setIsValidData(true);
        toast({
          title: 'Account created.',
          description: "We've created your account for you. Please check your email to confirm your signup",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
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
          borderColor={useColorModeValue('orange.600', 'orange.300')}
          borderWidth="thin"
          p={8}
          borderRadius={10}
        >
          <Heading size="xl" color="orange.300" mb={2}>
            Sign up to Reddit Clone
          </Heading>
          <form onSubmit={handleSignUp}>
            <FormControl isRequired my={2}>
            <FormLabel>Email</FormLabel>
            <Input
              as="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              borderColor={useColorModeValue('orange.600', 'orange.300')}
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
              borderColor={useColorModeValue('orange.600', 'orange.300')}
            />
            </FormControl>
            <Button
              isLoading={isLoading}
              as="button"
              colorScheme="orange"
              onClick={handleSignUp}
              type='submit'
            >
              SignUp
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
