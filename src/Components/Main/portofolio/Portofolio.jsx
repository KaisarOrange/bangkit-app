import {
  Box,
  Button,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, logout } from '../../../firebase-config';
import { useQuery } from '@tanstack/react-query';
import converter from '../fun/converter';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../Loading';

function Portofolio() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const signOut = () => {
    logout();
    navigate('/');
  };

  const { data: userData, refetch } = useQuery(
    ['userDataPorto'],
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

  const {
    data: umkmData,
    isLoading,
    isFetching,
    refetch: umkmRefetch,
  } = useQuery(
    ['umkmDataPorto'],
    async () => {
      return Promise.all(
        userData?.invested
          .map((e) => e.umkmId)
          .map((b) => getDoc(doc(db, 'umkm', b)).then((e) => e.data()))
      );
    },
    { enabled: Boolean(userData) }
  );
  if (isFetching) {
    refetch();
    umkmRefetch();
    return <Loading />;
  }
  return (
    <Box mt={35}>
      <Text m={4} as='h1' fontSize='1.5rem' textAlign='center'>
        Portofolio
      </Text>
      <Box
        display='flex'
        gap={5}
        flexDirection='column'
        w={{ base: '80vw', lg: '50vw' }}
        m='auto'
        bg='rgba(75, 192, 192, 0.2)'
        pl={12}
        pr={12}
        pt={10}
        pb={10}
        fontWeight='semibold'
        rounded='md'
      >
        <Box>
          <Text>Jumlah investasi</Text>
          <Text>
            Rp.{' '}
            {converter(
              userData?.invested.reduce((total, num) => {
                return total + num.investedAmount;
              }, 0)
            )}{' '}
          </Text>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Box>
            <Text>Saldo</Text>
            <Text>Rp. {converter(userData?.saldo)}</Text>
          </Box>
          <Box>
            <Text>Imbal Hasil</Text>
            <Text>
              Rp.{' '}
              {converter(
                userData?.invested
                  .map((e) => e.profit)
                  .reduce((total, num, index) => {
                    return total + num;
                  }, 0)
              )}
            </Text>
          </Box>
        </Box>
      </Box>
      <TableContainer
        w={{ base: '80vw', lg: '50vw' }}
        rounded='md'
        bg='gray.100'
        m='auto'
        mt={12}
        minH='30vh'
        p={30}
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <Table variant='simple' size={{ base: 'sm', lg: 'md' }}>
          <Thead>
            <Tr>
              <Th>Nama UMKM</Th>
              <Th>Yield Bunga</Th>
              <Th>Jumlah Investasi</Th>
              <Th>Nilai Investasi</Th>
            </Tr>
          </Thead>
          <Tbody color='teal'>
            {isLoading ? (
              <Tr>
                <Td>
                  <Spinner />
                </Td>
                <Td>
                  <Spinner />
                </Td>
                <Td>
                  <Spinner />
                </Td>
                <Td>
                  <Spinner />
                </Td>
              </Tr>
            ) : (
              umkmData?.map((e, index) => {
                return (
                  <Tr key={index} cursor='default'>
                    <Td>{e.nama}</Td>
                    <Td isNumeric>{e.bunga}</Td>
                    <Td isNumeric>
                      Rp. {converter(userData?.invested[index].investedAmount)}
                    </Td>
                    <Td isNumeric>
                      Rp. {converter(userData?.invested[index].profit)}
                    </Td>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Box
        display='flex'
        justifyContent='end'
        alignItems='center'
        w='50vw'
        m='auto'
      >
        <Button mt={5} fontSize='0.9rem' px={2} bg='#14BBC6' onClick={signOut}>
          Keluar akun
        </Button>
      </Box>
    </Box>
  );
}

export default Portofolio;
/*
 <Td>
 <DeleteIcon cursor='pointer' />
   </Td>
 */
