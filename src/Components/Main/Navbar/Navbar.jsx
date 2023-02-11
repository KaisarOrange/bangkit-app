import { db, auth } from '../../../firebase-config';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flex,
  Image,
  Box,
  Spacer,
  Input,
  Text,
  Avatar,
} from '@chakra-ui/react';
import logo from '../../../img/logo.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from '@tanstack/react-query';

function Navbar(props) {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const { data: umkm } = useQuery(
    ['navbarUmkm'],
    async () => {
      const q = query(
        collection(db, 'umkm'),
        where('ownerUid', '==', user?.uid)
      );
      try {
        const doc = await getDocs(q);
        return doc.docs[0].data();
      } catch (err) {
        console.log(err);
      }
    },
    {
      enabled: Boolean(user),
    }
  );
  const { data: userData } = useQuery(
    ['userDataPorto'],
    async () => {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
        const doc = await getDocs(q);

        return doc.docs[0].data();
      } catch (err) {
        console.error(err);
      }
    },
    { enabled: Boolean(user) },
    {
      refetchInterval: 1000,
    }
  );

  const submit = (element) => {
    element.preventDefault();
    navigate('/main/card');
  };

  return (
    <Flex
      bg='white'
      position='fixed'
      w='100%'
      px={{ base: 2, lg: 5 }}
      py={5}
      boxShadow='md'
      justifyContent='center'
      alignItems='center'
      top='0'
      zIndex={100}
    >
      <Box>
        <Link to='/main/card' onClick={() => props.setFilterUmkm('')}>
          <Image cursor='pointer' w={{ base: 150 }} src={logo} />{' '}
        </Link>
      </Box>
      <Spacer />
      <Box boxShadow='sm'>
        <form onSubmit={submit}>
          <Input
            onChange={(event) => props.setFilterUmkm(event.target.value)}
            value={props.filterUmkm}
            w={{ base: '50vw', lg: '50vw' }}
            h={{ base: 8, lg: 10 }}
            mx={2}
            placeholder='Ketoprak'
          ></Input>
        </form>
      </Box>
      <Spacer />
      <Box
        mr={{ base: 0, lg: 10 }}
        display='flex'
        justifyContent='center'
        alignItems='center'
        gap={[2, 5]}
      >
        <Text
          display={{ base: 'none', lg: 'inline' }}
          fontSize={[8, 14]}
          fontWeight='medium'
        >
          Selamat datang, {userData?.name}!{' '}
        </Text>
        <Link to='/main/portofolio'>
          <Avatar size={{ base: 'sm', lg: 'lg' }} src={userData?.picture} />
        </Link>
        <Link
          to={userData?.isUMKM === '1' ? 'umkm-dashboard' : '/registerUMKM'}
        >
          <Avatar
            size={{ base: 'sm', lg: 'lg' }}
            bg='gray'
            name='U M'
            src={umkm?.imageUrl}
          />
        </Link>
      </Box>
    </Flex>
  );
}

export default Navbar;
