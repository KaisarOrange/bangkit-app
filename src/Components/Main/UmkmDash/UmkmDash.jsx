import { Alert, AlertIcon, Box, Image, Stack, Text } from '@chakra-ui/react';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../firebase-config';
import UpdateModal from './UpdateModal';
import { useQuery } from '@tanstack/react-query';
import AlertDialogExample from '../beranda menu/Dialogue';
import converter from '../fun/converter';
import month from '../fun/getMonth';
import updateJatuhTempo from '../fun/updateJatuhTempo';
import PayDebtModal from './PayDebtModal';

function UmkmDash() {
  const [user] = useAuthState(auth);
  const {
    data: umkm,
    refetch,
    isSuccess,
  } = useQuery(
    ['dash'],
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

  const { data: userInfo } = useQuery(
    ['dashUser'],
    async () => {
      try {
        const arr = [];
        console.log(arr);
        for (let i = 0; i < umkm?.investor.length; i++) {
          const doc = await getDocs(
            query(
              collection(db, 'users'),
              where('uid', '==', umkm?.investor[i].investorId)
            )
          );

          arr.push(doc.docs[0].data());
        }
        return arr;
      } catch (err) {
        console.error(err);
      }
    },
    { enabled: Boolean(umkm) }
  );

  const updateInvestor = async (e) => {
    const q = query(collection(db, 'users'), where('uid', '==', e.uid));

    const doca = await getDocs(q);

    const second = async (e) => {
      try {
        await updateDoc(doc(db, 'users', doca?.docs[0].id), {
          invested: e.invested,
        });
      } catch (err) {
        console.error(err);
      }
    };
    second(e);
  };

  const canPayDate = new Date();
  const dDay = new Date();
  const paymentDate = new Date(umkm?.date.seconds * 1000);
  canPayDate.setDate(canPayDate.getDate() + 7);

  const bayar = async () => {
    const userPay = userInfo?.map((e) =>
      e.invested.filter((e) => e.umkmId === umkm.umkmId)
    );
    userPay
      .map((e) => e[0])
      .map(
        (e) => (e.profit = e.profit + (e.investedAmount * umkm.bunga) / 100)
      );

    userInfo?.forEach((e) => {
      updateInvestor(e);
    });
    await updateDoc(doc(db, 'umkm', umkm.umkmId), {
      hasPay: 1,
    });
    refetch();
  };

  const updateSaldo = async (e, newSaldo) => {
    console.log(newSaldo);
    const q = query(collection(db, 'users'), where('uid', '==', e.investorId));
    console.log(userInfo[0].saldo);
    const doca = await getDocs(q);
    await updateDoc(doc(db, 'users', doca?.docs[0].id), {
      saldo: userInfo[0].saldo + Number(newSaldo),
    });
  };

  const bayarHutang = async (amountPaid) => {
    const userPay = userInfo?.map((e) =>
      e.invested.filter((e) => e.umkmId === umkm.umkmId)
    );
    userPay
      .map((e) => e[0])
      .map((e) => {
        updateSaldo(
          e,
          amountPaid * (e.investedAmount / umkm?.danaRecieved),
          userInfo
        );
        e.investedAmount =
          e.investedAmount -
          amountPaid * (e.investedAmount / umkm?.danaRecieved);
      });

    userInfo?.forEach((e) => {
      updateInvestor(e);
    });
    await updateDoc(doc(db, 'umkm', umkm.umkmId), {
      danaRecieved: umkm?.danaRecieved - amountPaid,
    });
    // await updateDoc(doc(db, 'umkm', umkm.umkmId), { hasPay: 1,});
    refetch();
  };

  useEffect(() => {
    if (isSuccess === true) {
      updateJatuhTempo(umkm, refetch, dDay, paymentDate);
    }
  });
  return (
    <Stack justifyContent='center' alignItems='center'>
      <Box
        display='flex'
        alignItems='center'
        justifyContent={{ base: 'center', lg: 'center' }}
        flexDirection='column'
      >
        <Box
          h={{ base: 400, lg: 600 }}
          w={{ base: '65vw', lg: '45vw' }}
          mt={{ base: 0, lg: 10 }}
          mb={{ base: 10 }}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          rounded='20px'
          boxShadow='md'
          overflow='hidden'
          bg='gray.100'
          fontSize='14px'
          fontFamily='helvetica'
        >
          <Box display='flex' justifyContent='center'>
            {umkm?.isValidated === 1 ? (
              <Alert
                status='success'
                transition='ease 0.5s'
                position='absolute'
                mt={3}
                w='14vw'
                h={10}
                rounded='md'
                py={2}
              >
                <AlertIcon />
                UMKM sudah divalidasi
              </Alert>
            ) : (
              <Alert
                py={7}
                status='warning'
                transition='ease 0.5s'
                position='absolute'
                mt={3}
                w='14vw'
                h={10}
                rounded='md'
              >
                <AlertIcon />
                UMKM belum divalidasi Admin
              </Alert>
            )}
            <Image
              m={0}
              h={{ base: '200px', lg: '400px' }}
              w='100vh'
              src={umkm?.imageUrl}
            />
          </Box>
          <Box
            display='flex'
            flexDirection='column'
            gap={2}
            h='100%'
            p='0px 15px'
          >
            <Text as='h1' m={2} fontSize='2rem' fontWeight='bold'>
              {umkm?.nama}
            </Text>
            <Box m={3} fontWeight='small'>
              {umkm?.deskripsi}
            </Box>
          </Box>
          <UpdateModal id={umkm?.umkmId} refetch={refetch} />
        </Box>
        <Box
          position={{ base: '-moz-initial', lg: 'fixed' }}
          right={{ base: 0, lg: 0 }}
          left={{ base: 0, lg: 1200 }}
          top={{ base: '12vh', lg: '35vh' }}
          display='flex'
          flexDirection='column'
          bg='gray.100'
          p={25}
          w={{ base: '80vw', lg: 280 }}
          gap={5}
          justifyContent='center'
          textAlign='center'
          rounded='md'
          boxShadow='sm'
        >
          <Box alignItems='center'>
            <Text textAlign='center ' fontWeight='semibold'>
              Jatuh tempo pembayaran
            </Text>
          </Box>
          <Box>
            <Text
              color='teal'
              fontWeight='bold'
              fontSize={{ base: '1rem', lg: '1.2rem' }}
            >
              {paymentDate.getDate()} {month(paymentDate.getMonth())}{' '}
              {paymentDate.getFullYear()}
            </Text>
          </Box>
          <Box>
            <Text textAlign='center' fontWeight='semibold'>
              Bunga yang harus dibayar
            </Text>

            <Box
              mt={0}
              color='teal'
              fontWeight='bold'
              fontSize={{ base: '1rem', lg: '1.2rem' }}
            >
              {umkm?.hasPay !== 0 ? (
                'Lunas 😁👍'
              ) : (
                <Text>
                  Rp.{' '}
                  {converter(
                    (((umkm?.danaRecieved * umkm?.bunga) / 3) *
                      Number(umkm?.angsuran)) /
                      100 /
                      4
                  )}
                </Text>
              )}
            </Box>
          </Box>
          <AlertDialogExample
            angsuran={umkm?.angsuran}
            id={umkm?.umkmId}
            BtnText={'Bayar bunga'}
            title={'Membayar Bunga'}
            hasPay={umkm?.hasPay}
            datea={paymentDate}
            canPay={canPayDate.getTime()}
            pesan={
              'Anda akan membayar bunga sebesar Rp. ' +
              converter(
                (((umkm?.danaRecieved * umkm?.bunga) / 3) *
                  Number(umkm?.angsuran)) /
                  100 /
                  4
              )
            }
            bayar={bayar}
          />
        </Box>
      </Box>
      <Box
        rounded='20px'
        boxShadow='md'
        display='flex'
        alignItems='center'
        w={{ base: '65vw', lg: '45vw' }}
        bg='gray.100'
        mt={0}
        p={15}
        py={10}
        flexDirection='column'
        gap={4}
      >
        <Text fontWeight='bold' fontSize='lg'>
          Dana yang diterima
        </Text>
        <Text fontSize='2xl' fontWeight='bold' color='teal'>
          Rp. {converter(umkm?.dana)} / Rp.{converter(umkm?.danaRecieved)}
        </Text>
        <Box bg='white' w='60vh' rounded='md' overflow='hidden'>
          <Box
            bg='#14BBC6'
            w={(umkm?.danaRecieved / umkm?.dana) * 100 + '%'}
            h={4}
          ></Box>
        </Box>
        <PayDebtModal bayarHutang={bayarHutang} />
      </Box>
    </Stack>
  );
}

export default UmkmDash;

//  <Button ml={700} onClick={() => {}}>Umkm</Button>
