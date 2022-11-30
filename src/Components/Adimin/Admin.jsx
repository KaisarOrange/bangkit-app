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

function Admin() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const date = new Date();

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

  const { data: userData, refetch: refetchUser } = useQuery(
    ['userDataAdmin'],
    async () => {
      const arr = [];
      const q = query(collection(db, 'users'), where('isBan', '==', 1));

      try {
        const doc = await getDocs(q);
        doc.forEach((doc) => {
          arr.push(doc.data());
        });
        return arr;
      } catch (err) {
        console.error(err);
      }
    }
  );

  const {
    data: umkm,
    isSuccess,
    refetch: refetchUmkm,
  } = useQuery(
    ['umkmAdmin'],
    async () => {
      const arr = [];
      const q = query(collection(db, 'umkm'), where('late', '==', 1));

      try {
        const doc = await getDocs(q);
        doc.forEach((doc) => {
          arr.push(doc.data());
        });
        return arr;
      } catch (err) {
        console.error(err);
      }
    },
    {
      enabled: Boolean(user),
    }
  );

  const banUser = async (user, kasus) => {
    const h = query(collection(db, 'report'), where('ownerId', '==', user));

    const docb = await getDocs(h);
    docb.forEach((doca) => {
      updateDoc(doc(db, 'report', doca.id), {
        isBan: 1,
      });
    });

    const q = query(collection(db, 'users'), where('uid', '==', user));

    const e = query(collection(db, 'umkm'), where('ownerUid', '==', user));
    const docc = await getDocs(e);
    await updateDoc(doc(db, 'umkm', docc?.docs[0].id), {
      isBan: 1,
    });

    const doca = await getDocs(q);

    await updateDoc(doc(db, 'users', doca?.docs[0].id), {
      isBan: 1,
    });

    refetch();
    refetchUser();
    refetchUmkm();
  };

  const unBanUser = async (user) => {
    const q = query(collection(db, 'users'), where('uid', '==', user));

    const h = query(collection(db, 'report'), where('ownerId', '==', user));

    const docb = await getDocs(h);
    docb.forEach((doca) => {
      updateDoc(doc(db, 'report', doca.id), {
        isBan: 0,
      });
    });

    const doca = await getDocs(q);

    await updateDoc(doc(db, 'users', doca?.docs[0].id), {
      isBan: 0,
    });

    const e = query(collection(db, 'umkm'), where('ownerUid', '==', user));
    const docc = await getDocs(e);
    await updateDoc(doc(db, 'umkm', docc?.docs[0].id), {
      isBan: 0,
    });

    refetch();
    refetchUser();
    refetchUmkm();
  };
  const banUsers = userData?.filter((e) => e.isBan === 1).map((e) => e.uid);

  useEffect(() => {
    console.log(banUsers);
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
        key={uniqid()}
      >
        <Table variant='simple' color='black' key={uniqid()}>
          <Thead key={uniqid()}>
            <Tr key={uniqid()}>
              <Th>Nama reported UMKM </Th>
              <Th>Pemilik </Th>
              <Th>Dilapor oleh</Th>
              <Th>Kasus</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody color='teal' key={uniqid()}>
            {data
              ?.filter((e) => e.isBan !== 1)
              .map((e, index) => {
                return (
                  <Tr key={uniqid()} cursor='default'>
                    <Td key={uniqid()}>
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
                    <Td key={uniqid()}>
                      <Box
                        fontWeight='semibold'
                        display='flex'
                        alignItems='center'
                        gap={2}
                        key={uniqid()}
                      >
                        {' '}
                        <Avatar src={e.userImage} />
                        {e.userName}
                      </Box>
                    </Td>
                    <Td key={uniqid()}>
                      {e.reportedCase.map((e) => {
                        return (
                          <Text key={uniqid()} fontWeight='semibold' m={1}>
                            {' '}
                            {kasus[e - 1]}
                          </Text>
                        );
                      })}
                    </Td>
                    <Td key={uniqid()}>
                      <DeleteIcon
                        cursor='pointer'
                        onClick={() => banUser(e.ownerId, 1)}
                      />
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      <Text fontWeight='bold' mt={20} textAlign='center' key={uniqid()}>
        Umkm telat bayar
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
        key={uniqid()}
      >
        <Table variant='simple' key={uniqid()}>
          <Thead key={uniqid()}>
            <Tr key={uniqid()}>
              <Th>Nama UMKM </Th>
              <Th>pemilik</Th>
              <Th>Telat</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody color='teal ' key={uniqid()}>
            {umkm
              ?.filter((e) => e.late === 1 && e.isBan !== 1)
              .map((e, index) => {
                return (
                  <Tr key={uniqid()} cursor='default'>
                    <Td key={uniqid()}>
                      <Box
                        fontWeight='semibold'
                        display='flex'
                        alignItems='center'
                        gap={2}
                        key={uniqid()}
                      >
                        <Avatar src={e.imageUrl} />
                        {e.nama}
                      </Box>
                    </Td>
                    <Td key={uniqid()}>
                      <Box
                        fontWeight='semibold'
                        display='flex'
                        alignItems='center'
                        gap={2}
                        key={uniqid()}
                      >
                        {' '}
                        <Avatar src={e.ownerPhoto} />
                        {e.ownerName}
                      </Box>
                    </Td>
                    <Td key={uniqid()}>{date.getDate()}</Td>
                    <Td key={uniqid()}>
                      <DeleteIcon
                        cursor='pointer'
                        onClick={() => banUser(e.ownerUid)}
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
        key={uniqid()}
      >
        <Table variant='simple' key={uniqid()}>
          <Thead key={uniqid()}>
            <Tr key={uniqid()}>
              <Th>Nama reported UMKM </Th>
              <Th>Dilapor oleh</Th>
              <Th>Kasus</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody color='teal'>
            {userData
              ?.filter((e) => e.isBan === 1)
              .map((e, index) => {
                return (
                  <Tr key={uniqid()} cursor='default'>
                    <Td key={uniqid()}>
                      <Box
                        fontWeight='semibold'
                        display='flex'
                        alignItems='center'
                        gap={2}
                        key={uniqid()}
                      >
                        <Avatar src={e.picture} />
                        {e.name}
                      </Box>
                    </Td>
                    <Td key={uniqid()}>
                      <DeleteIcon
                        cursor='pointer'
                        onClick={() => unBanUser(e.uid)}
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
