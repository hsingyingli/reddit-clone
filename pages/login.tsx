import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {
  Box,
  Input,
  Button,
  Heading,
  Alert,
  AlertIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const {handleUserLogin} = useAuth();

  const handleOnSubmit: React.FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (email.length == 0) {
      setIsValidEmail(false);
      return;
    }

    handleUserLogin(email)
      .then((isSuccess) => {
        if (isSuccess) router.push('/');
      })
      .finally(() => {
        setEmail('') 
        setIsValidEmail(false)
      });
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
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
      <Box>
        {!isValidEmail && (
          <Alert status="error" borderRadius={5} mb={3}>
            <AlertIcon />
            Email is not validated, or something is wrong!!
          </Alert>
        )}
        <Box
          borderColor={useColorModeValue('orange.600', 'orange.300')}
          borderWidth="thin"
          p={5}
          borderRadius={5}
        >
          <Heading size="lg" color="orange.300" mb={2}>
            Login to Reddit Clone
          </Heading>
          <form onSubmit={handleOnSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleOnChange}
              borderColor={useColorModeValue('orange.600', 'orange.300')}
            />
            <Button as="button" colorScheme="orange" mt={2} onClick={handleOnSubmit}>
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
