import React, { useEffect, useState } from 'react';
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
  useQuery,
} from '@chakra-ui/react';
import logo from '../../img/logo.png';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from '../../firebase-config';
import { useQueryClient } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Navbar(props) {
  const navigate = useNavigate();

  return (
    <Flex
      bg='white'
      position='fixed'
      w='100%'
      padding={5}
      boxShadow='md'
      alignItems='center'
      top='0'
      zIndex={100}
      justifyContent='space-between'
      px={10}
    >
      <Box display='flex'>
        <Link to='/main/card' onClick={() => props.setFilterUmkm('')}>
          <Image cursor='pointer' w='8rem' src={logo} />{' '}
        </Link>
      </Box>
      <Box display='flex' gap={5} m='auto'>
        <Button bg='transparent' fontWeight='semibold'>
          Validasi Umkm
        </Button>{' '}
        <Button bg='transparent' fontWeight='semibold'>
          Reported UMKM
        </Button>
      </Box>
      <Button
        fontSize='0.9rem'
        px={2}
        bg='#14BBC6'
        onClick={() => {
          logout();
          navigate('/');
        }}
      >
        Keluar Admin
      </Button>
    </Flex>
  );
}

export default Navbar;
