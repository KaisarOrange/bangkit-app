import {
  Avatar,
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
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
import { db } from '../../firebase-config';
import uniqid from 'uniqid';

function Validate() {
  const { data: umkm, refetch } = useQuery(['umkmAdmin'], async () => {
    const arr = [];
    const q = query(collection(db, 'umkm'), where('isValidated', '==', 0));

    try {
      const doc = await getDocs(q);
      doc.forEach((doc) => {
        arr.push(doc.data());
      });
      return arr;
    } catch (err) {
      console.error(err);
    }
  });

  const validateUmkm = async (id) => {
    await updateDoc(doc(db, 'umkm', id), {
      isValidated: 1,
    });
    refetch();
  };

  return (
    <div>
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
            {umkm?.map((e) => {
              return (
                <Tr key={uniqid()} cursor='default'>
                  <Td key={uniqid()}>
                    <Box
                      fontWeight='semibold'
                      display='flex'
                      alignItems='center'
                      gap={2}
                    >
                      <Avatar src={e.imageUrl} />
                      {e.nama}
                    </Box>
                  </Td>
                  <Td key={uniqid()}>
                    <Button
                      onClick={() => {
                        validateUmkm(e.umkmId);
                      }}
                    >
                      Validate
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Validate;
