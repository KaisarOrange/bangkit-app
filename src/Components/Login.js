import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import logo from '../img/logo.png';

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const signIn = (event) => {
    event.preventDefault();
    logInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user?.uid === 'Y7MrD3c4KNTFSXDTQEIS06V8ZpC2') {
      navigate('/admin');
    }
    if (user && user?.uid !== 'Y7MrD3c4KNTFSXDTQEIS06V8ZpC2')
      navigate('/main/card');
  }, [user, loading]);

  return (
    <Box pt={5} h='100vh'>
      <Box
        display='flex'
        justifyContent='space-between'
        fontSize='1.5rem'
        alignItems='center'
        mb={20}
        ml='70px'
        mr='70px'
      >
        <Box cursor='pointer' onClick={() => navigate('/')}>
          <Button bg='teal.400'>Kembali</Button>
        </Box>
      </Box>
      <Box
        boxShadow='sm'
        bg='gray.200'
        pt='10'
        pb='10'
        pl='5'
        pr='5'
        w='350px'
        mt={100}
        ml='auto'
        mr='auto'
        rounded='md'
      >
        <form onSubmit={signIn}>
          <Stack spacing={3}>
            <Image m='auto' w='10rem' src={logo} />
            <FormControl isRequired>
              <InputGroup>
                <Input
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  bg='white'
                  type='email'
                  placeholder='Email'
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <Input
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  bg='white'
                  type='password'
                  placeholder='Password'
                />
              </InputGroup>
            </FormControl>
            <Button
              type='submit'
              boxShadow='sm'
              _hover={{ boxShadow: 'md' }}
              _active={{ boxShadow: 'lg' }}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
