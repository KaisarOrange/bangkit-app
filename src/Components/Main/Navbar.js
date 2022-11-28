import React, { useEffect } from 'react';
import { logout, db, auth } from '../../firebase-config';
import { query, collection, getDocs, where, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flex,
  Image,
  Box,
  Spacer,
  Input,
  Button,
  Text,
  Avatar,
} from '@chakra-ui/react';
import logo from '../../img/logo.png';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import DrawerExample from './Drawer';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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

  const submit = (element) => {
    element.preventDefault();
    navigate('/main/card');
  };

  useEffect(() => {
    console.log(umkm?.imageUrl);
  });
  return (
    <Flex
      bg='white'
      position='fixed'
      w='100%'
      padding={5}
      boxShadow='md'
      justifyContent='center'
      alignItems='center'
      top='0'
      zIndex={100}
    >
      <Box>
        <Link to='/main/card' onClick={() => props.setFilterUmkm('')}>
          <Image cursor='pointer' w='10rem' src={logo} />{' '}
        </Link>
      </Box>
      <Spacer />
      <Box>
        <form onSubmit={submit}>
          <Input
            onChange={(event) => props.setFilterUmkm(event.target.value)}
            value={props.filterUmkm}
            w='50vw'
            placeholder='Ketoprak'
          ></Input>
        </form>
      </Box>
      <Spacer />
      <Box
        mr={10}
        display='flex'
        justifyContent='center'
        alignItems='center'
        gap={5}
      >
        <Text fontWeight='medium'>Selamat datang, {props.name}! </Text>
        <Link to='umkm-dashboard'>
          <Avatar size='lg' bg='gray' name='U M' src={umkm?.imageUrl} />
        </Link>
        <Link to='/main/portofolio'>
          <Avatar size='lg' src={props.image} />
        </Link>
      </Box>
    </Flex>
  );
}

export default Navbar;
