import { DeleteIcon } from '@chakra-ui/icons';
import uniqid from 'uniqid';
import {
  Avatar,
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db, logout } from '../../firebase-config';
import Navbar from './Navbar';
import Reported from './Reported';
import Validate from './Validate';

function Admin() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const check = () => {
    if (user?.uid !== 'ARZsztwYV0NjXxaAXMd6Hef8k5Z2') {
      navigate('/login');
    } else {
      return;
    }
  };

  // const banUsers = userData?.filter((e) => e.isBan === 1).map((e) => e.uid);

  useEffect(() => {
    //console.log(banUsers);
    check();
  });
  return (
    <Box display='flex' flexDir='column' mt={150}>
      <Navbar setPage={setPage} />
      {page === 0 ? <Reported user={user} /> : <Validate />}
    </Box>
  );
}

export default Admin;
