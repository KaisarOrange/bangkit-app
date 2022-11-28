import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../../firebase-config';
import Navbar from './Navbar';

function Admin() {
  const [user] = useAuthState(auth);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const check = () => {
    if (user?.uid !== 'ARZsztwYV0NjXxaAXMd6Hef8k5Z2') {
      navigate('/login');
    } else {
      console.log('hai');
    }
  };
  useEffect(() => {
    console.log(user?.uid);

    check();
  });
  return (
    <Box display='flex' flexDir='column'>
      <Navbar />
      <TableContainer
        w='60vw'
        rounded='md'
        bg='red.100'
        m='auto'
        mt={150}
        minH='30vh'
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
              <DeleteIcon cursor='pointer' mt='18px' />
            </Tr>
            <Tr cursor='default'>
              <Td>Ketoprak kematian</Td>
              <Td isNumeric>2</Td>
              <Td isNumeric>2.000.000.000</Td>
              <Td isNumeric>UMKM tidak jujur</Td>
              <DeleteIcon cursor='pointer' mt='18px' />
            </Tr>
            <Tr cursor='default'>
              <Td>Sate Andrew</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>1.500.000.000</Td>
              <Td isNumeric>Data finansial palsu</Td>
              <DeleteIcon cursor='pointer' mt='18px' />
            </Tr>
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
              <DeleteIcon cursor='pointer' mt='18px' />
            </Tr>
            <Tr cursor='default'>
              <Td>Ketoprak kematian</Td>
              <Td isNumeric>2</Td>
              <Td isNumeric>2.000.000.000</Td>
              <Td isNumeric>UMKM tidak jujur</Td>
              <DeleteIcon cursor='pointer' mt='18px' />
            </Tr>
            <Tr cursor='default'>
              <Td>Sate Andrew</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>1.500.000.000</Td>
              <Td isNumeric>Data finansial palsu</Td>
              <DeleteIcon cursor='pointer' mt='18px' />
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Admin;
