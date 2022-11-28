import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Image, Text } from '@chakra-ui/react';
import { doc, getDoc, query, where, collection } from 'firebase/firestore';
import { db, storage } from '../../firebase-config';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import Checkout from './Checkout';
import { useQuery } from '@tanstack/react-query';

import InfoTab from './InfoTab';
import converter from './converter';
import Loading from './Loading';

function About() {
  let { id } = useParams();

  const {
    data,
    isLoading,
    refetch: refetchUmkm,
    isFetching,
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
  if (isFetching) {
    return <Loading />;
  }

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
        h={600}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        w='45vw'
        rounded='20px'
        overflow='hidden'
        boxShadow='md'
        bg='gray.100'
        fontSize='14px'
        fontFamily='helvetica'
        mt={50}
      >
        <Box>
          <Image m={0} h='400px' w='100vh' src={data?.imageUrl} />
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
      </Box>
      <Box
        position='fixed'
        right={10}
        top='35vh'
        mr={6}
        display='flex'
        flexDirection='column'
        bg='gray.100'
        p={25}
        w={280}
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
      <Box w='100vh'>
        <InfoTab umkm={data} />
      </Box>
    </Box>
  );
}

export default About;
/*

 */
