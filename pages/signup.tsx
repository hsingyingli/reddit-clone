import {useRouter} from 'next/router';
import React, {useState, useRef, useEffect} from 'react';
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
  useToast,
} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';

const SignUp: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [isValidData, setIsValidData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {authState, handleUserSignUp} = useAuth();

  useEffect(()=> {
    const handleComplete = () => {
      setIsLoading(false)
    }
    router.events.on('routeChangeComplete', handleComplete);
    return ()=> {
      router.events.off('routeChangeComplete', handleComplete)
    }
  }, [router])

  useEffect(() => {
    if (authState.isAuth) {
      router.push('/');
    }
    inputRef.current?.focus()

  }, [authState, router]);

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
      .then(() => {
        setIsValidData(true);
        toast({
          title: 'Account created.',
          description: "We've created your account for you. Please check your email to comfirm sign up!!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        router.push('/login');
      })
      .catch((error) => {
        setIsValidData(false);
        setIsLoading(false);
      })
      .finally(() => {
        setEmail('');
        setPwd('');
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
            Sign up to Reddit Clone
          </Heading>
          <form onSubmit={handleSignUp}>
            <FormControl isRequired my={2}>
              <FormLabel>Email</FormLabel>
              <Input
                ref={inputRef}
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
              onClick={handleSignUp}
              type="submit"
              rounded={'full'}
              _hover={{
                bg: 'gray.400',
              }}
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
