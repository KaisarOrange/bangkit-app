import { Box, Text, Image, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import logo from '../img/logo.png';
import petani from '../img/ef.png';

function Home() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (user && user?.uid !== 'ARZsztwYV0NjXxaAXMd6Hef8k5Z2')
      return navigate('/main/card');
  });

  return (
    <Box
      pt={5}
      bg='linear-gradient(to bottom left, #14BBC6 0%, white 80%)'
      pb={50}
    >
      <Box
        display='flex'
        justifyContent='center'
        fontSize='1.5rem'
        alignItems='center'
        mb={10}
        ml='70px'
        mr='70px'
      >
        <Box
          w='15rem'
          display='flex'
          alignItems='center'
          cursor='pointer'
          onClick={() => navigate('/')}
        >
          <Image src={logo} />
        </Box>
      </Box>

      <Box
        backgroundImage={petani}
        backgroundPosition='center'
        backgroundSize='cover'
        display='flex'
        justifyContent='start'
        alignItems='center'
        gap={20}
        w={{ base: '80vw', lg: '70vw' }}
        h={{ base: 450, lg: 580 }}
        m='auto'
        rounded='lg'
      >
        <Box
          m={10}
          mt={16}
          display='flex'
          flexDirection='column'
          bg='whiteAlpha.700'
          boxShadow='md'
          p={15}
          rounded='md'
        >
          <Text fontSize={{ base: '1rem', lg: '1.3rem' }} fontWeight='bold'>
            Halo, selamat datang
          </Text>
          <Text fontSize={{ base: '1.2rem', lg: '2rem' }} fontWeight='bold'>
            Ayo! Bangkit bersama UMKM
          </Text>
          <Text fontWeight='semibold' mt={2}>
            Aplikasi platform pendanaan UMKM
          </Text>
          <Box display='flex' gap={5} mt={10}>
            <Button
              size={{ base: 'sm', lg: 'md' }}
              color='white'
              bg='#319795'
              onClick={() => navigate('/daftar')}
            >
              Mulai Sekarang
            </Button>
            <Button
              size={{ base: 'sm', lg: 'md' }}
              onClick={() => navigate('/login')}
              color='white'
              bg='#236463'
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
