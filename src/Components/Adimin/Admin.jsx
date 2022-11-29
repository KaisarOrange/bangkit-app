import { DeleteIcon } from '@chakra-ui/icons';
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

function Admin() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const kasus = [
    'Data Finansial UMKM direkayasa',
    'Pemilik tidak jujur',
    'UMKM tidak ada',
  ];

  const check = () => {
    if (user?.uid !== 'ARZsztwYV0NjXxaAXMd6Hef8k5Z2') {
      navigate('/login');
    } else {
      return;
    }
  };

  const { data, isLoading, refetch } = useQuery(['report'], async () => {
    const umkmCollectionRef = collection(db, 'report');
    try {
      const data = await getDocs(umkmCollectionRef);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      console.log(err);
    }
  });

  const banUser = async (user) => {
    const q = query(collection(db, 'users'), where('uid', '==', user));
    const h = query(collection(db, 'report'), where('userId', '==', user));

    const doca = await getDocs(q);

    const docb = await getDocs(h);
    console.log(docb?.docs[0].id);
    await updateDoc(doc(db, 'users', doca?.docs[0].id), {
      isBan: 1,
    });

    await updateDoc(doc(db, 'report', docb?.docs[0].id), {
      isBan: 1,
    });
    refetch();
  };

  const unBanUser = async (user) => {
    const q = query(collection(db, 'users'), where('uid', '==', user));
    const h = query(collection(db, 'report'), where('userId', '==', user));

    const doca = await getDocs(q);

    const docb = await getDocs(h);
    console.log(docb?.docs[0].id);
    await updateDoc(doc(db, 'users', doca?.docs[0].id), {
      isBan: 0,
    });

    await updateDoc(doc(db, 'report', docb?.docs[0].id), {
      isBan: 0,
    });
    refetch();
  };

  useEffect(() => {
    console.log(data);

    check();
  });
  return (
    <Box display='flex' flexDir='column' mt={150}>
      <Navbar />

      <Text fontWeight='bold' mt={5} textAlign='center'>
        UMKM yang dilaporkan oleh user
      </Text>
      <TableContainer
        w='80vw'
        rounded='md'
        m='auto'
        mt={5}
        minH='30vh'
        p={30}
        display='flex'
        flexDirection='column'
        alignItems='center'
        bg='blue.100'
      >
        <Table variant='simple' color='black'>
          <Thead>
            <Tr>
              <Th>Nama reported UMKM </Th>
              <Th>Dilapor oleh</Th>
              <Th>Kasus</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody color='teal'>
            {data
              ?.filter((e) => e.isBan !== 1)
              .map((e, index) => {
                return (
                  <Tr key={index} cursor='default'>
                    <Td>
                      <Box
                        fontWeight='semibold'
                        display='flex'
                        alignItems='center'
                        gap={2}
                      >
                        <Avatar src={e.umkmImage} />
                        {e.umkmName}
                      </Box>
                    </Td>
                    <Td>
                      <Box
                        fontWeight='semibold'
                        display='flex'
                        alignItems='center'
                        gap={2}
                      >
                        {' '}
                        <Avatar src={e.userImage} />
                        {e.userName}
                      </Box>
                    </Td>
                    <Td>
                      {e.reportedCase.map((e) => {
                        return (
                          <Text fontWeight='semibold' m={1}>
                            {' '}
                            {kasus[e - 1]}
                          </Text>
                        );
                      })}
                    </Td>
                    <Td>
                      <DeleteIcon
                        cursor='pointer'
                        onClick={() => banUser(e.userId)}
                      />
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      <Text fontWeight='bold' mt={20} textAlign='center'>
        UMKM gagal bayar
      </Text>
      <TableContainer
        w='80vw'
        rounded='md'
        bg='blue.100'
        m='auto'
        mt={5}
        minH='30vh'
        p={30}
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Nama reported UMKM </Th>
              <Th>Dilapor oleh</Th>
              <Th>Kasus</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody color='teal'>
            {data
              ?.filter((e) => e.isBan === 1)
              .map((e, index) => {
                return (
                  <Tr key={index} cursor='default'>
                    <Td>
                      <Box
                        fontWeight='semibold'
                        display='flex'
                        alignItems='center'
                        gap={2}
                      >
                        <Avatar src={e.umkmImage} />
                        {e.umkmName}
                      </Box>
                    </Td>
                    <Td>
                      <Box
                        fontWeight='semibold'
                        display='flex'
                        alignItems='center'
                        gap={2}
                      >
                        {' '}
                        <Avatar src={e.userImage} />
                        {e.userName}
                      </Box>
                    </Td>
                    <Td>
                      {e.reportedCase.map((e) => {
                        return (
                          <Text fontWeight='semibold' m={1}>
                            {' '}
                            {kasus[e - 1]}
                          </Text>
                        );
                      })}
                    </Td>
                    <Td>
                      <DeleteIcon
                        cursor='pointer'
                        onClick={() => unBanUser(e.userId)}
                      />
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      <Text fontWeight='bold' mt={20} textAlign='center'>
        Banned users
      </Text>
      <TableContainer
        w='80vw'
        rounded='md'
        bg='red.100'
        m='auto'
        mt={5}
        minH='30vh'
        p={30}
        display='flex'
        flexDirection='column'
        alignItems='center'
        mb={20}
      >
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Nama reported UMKM </Th>
              <Th>Dilapor oleh</Th>
              <Th>Kasus</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody color='teal'>
            {data
              ?.filter((e) => e.isBan === 1)
              .map((e, index) => {
                return (
                  <Tr key={index} cursor='default'>
                    <Td>
                      <Box
                        fontWeight='semibold'
                        display='flex'
                        alignItems='center'
                        gap={2}
                      >
                        <Avatar src={e.umkmImage} />
                        {e.umkmName}
                      </Box>
                    </Td>
                    <Td>
                      <Box
                        fontWeight='semibold'
                        display='flex'
                        alignItems='center'
                        gap={2}
                      >
                        {' '}
                        <Avatar src={e.userImage} />
                        {e.userName}
                      </Box>
                    </Td>
                    <Td>
                      {e.reportedCase.map((e) => {
                        return (
                          <Text fontWeight='semibold' m={1}>
                            {' '}
                            {kasus[e - 1]}
                          </Text>
                        );
                      })}
                    </Td>
                    <Td>
                      <DeleteIcon
                        cursor='pointer'
                        onClick={() => unBanUser(e.userId)}
                      />
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Admin;
