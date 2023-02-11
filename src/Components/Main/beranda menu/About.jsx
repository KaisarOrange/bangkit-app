import React from 'react';
import { Avatar, Box, Image, Text } from '@chakra-ui/react';
import {
  doc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
} from 'firebase/firestore';
import { auth, db } from '../../../firebase-config';
import { useParams } from 'react-router-dom';

import Checkout from './Checkout';
import { useQuery } from '@tanstack/react-query';

import InfoTab from '../fun/InfoTab';
import converter from '../fun/converter';

import ReportModal from './ReportModal';
import { useAuthState } from 'react-firebase-hooks/auth';

function About() {
  let { id } = useParams();
  const [user] = useAuthState(auth);
  const {
    data,

    refetch: refetchUmkm,
  } = useQuery(['about'], async () => {
    const ref = doc(db, 'umkm', id);
    try {
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      return data;
    } catch (err) {
      console.log(err);
    }
  });
  const { data: userData } = useQuery(
    ['userDataAbout'],
    async () => {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
        const doc = await getDocs(q);

        return doc.docs[0].data();
      } catch (err) {
        console.error(err);
      }
    },
    { enabled: Boolean(user) }
  );

  return (
    <Box
      m='auto'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      gap={10}
    >
      <Box
        h={{ base: 400, lg: 600 }}
        w={{ base: '65vw', lg: '45vw' }}
        mt={{ base: 0, lg: 10 }}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        rounded='20px'
        overflow='hidden'
        boxShadow='md'
        bg='gray.100'
        fontSize='14px'
        fontFamily='helvetica'
      >
        <Box>
          <Image
            m={0}
            h={{ base: '200px', lg: '400px' }}
            w='100vh'
            src={data?.imageUrl}
          />
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          gap={2}
          h='100%'
          p='0px 15px'
        >
          <Text as='h1' m={2} fontSize='2rem' fontWeight='bold'>
            {data?.nama}
          </Text>
          <Text m={3} fontWeight='small'>
            {data?.deskripsi}
          </Text>
        </Box>
        <Box display='flex' justifyContent='end' p={3} px={5}>
          <ReportModal user={userData} umkm={data} />
        </Box>
      </Box>
      <Box
        position={{ base: '-moz-initial', lg: 'fixed' }}
        right={10}
        top={{ base: '12vh', lg: '35vh' }}
        display='flex'
        flexDirection='column'
        bg='gray.100'
        p={25}
        w={{ base: '80%', lg: 280 }}
        gap={5}
        justifyContent='center'
        textAlign='center'
        rounded='md'
        boxShadow='sm'
      >
        <Box gap={4} display='flex' alignItems='center'>
          <Avatar size='lg' src={data?.ownerPhoto} />
          <Text fontWeight='semibold'>{data?.ownerName}</Text>
        </Box>
        <Box mt={5} bg='white'>
          <Box
            w={(data?.danaRecieved / data?.dana) * 100 + '%'}
            rounded='md'
            bg='#14BBC6'
            h={1.5}
          ></Box>
        </Box>
        <Text>Dana terkumpul</Text>
        <Text fontWeight='semibold'>Rp. {converter(data?.danaRecieved)}</Text>

        <Checkout refetchUmkm={refetchUmkm} id={id} />
      </Box>
      <Box w={{ base: '80vw', lg: '100vh' }}>
        <InfoTab umkm={data || ''} />
      </Box>
    </Box>
  );
}

export default About;
/*

 */
