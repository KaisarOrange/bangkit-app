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
import { collection, getDocs } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db, logout } from '../../firebase-config';
import Navbar from './Navbar';

function Admin() {
  const [user] = useAuthState(auth);
  const [modal, setModal] = useState(false);
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

  const { data, isLoading } = useQuery(['report'], async () => {
    const umkmCollectionRef = collection(db, 'report');
    try {
      const data = await getDocs(umkmCollectionRef);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    console.log(data);

    check();
  });
  return (
    <Box display='flex' flexDir='column' mt={100}>
      <Navbar />
      <TableContainer
        w='80vw'
        rounded='md'
        bg='red.100'
        m='auto'
        mt={12}
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
            {data?.map((e, index) => {
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
                    <DeleteIcon cursor='pointer' />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <TableContainer
        w='60vw'
        rounded='md'
        bg='blue.100'
        m='auto'
        minH='30vh'
        mt={10}
        p={30}
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Nama UMKM</Th>
              <Th>Jumlah user yang melapor</Th>
              <Th>Dana yang diterima</Th>
              <Th>Laporan terbanyak</Th>
            </Tr>
          </Thead>
          <Tbody color='black'>
            <Tr cursor='default'>
              <Td>Bugatti Showroom</Td>
              <Td isNumeric>20</Td>
              <Td isNumeric>1.000.000.000</Td>
              <Td isNumeric>UMKM tidak ada</Td>
            </Tr>
            <Tr cursor='default'>
              <Td>Ketoprak kematian</Td>
              <Td isNumeric>2</Td>
              <Td isNumeric>2.000.000.000</Td>
              <Td isNumeric>UMKM tidak jujur</Td>
            </Tr>
            <Tr cursor='default'>
              <Td>Sate Andrew</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>1.500.000.000</Td>
              <Td isNumeric>Data finansial palsu</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Admin;
