import { Avatar, Box, Button, Image, Stack, Text } from '@chakra-ui/react';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase-config';
import UpdateModal from './UpdateModal';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import AlertDialogExample from './Dialogue';
import converter from './converter';
import month from './getMonth';

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

        for (let i = 0; i < umkm?.investor.length; i++) {
          const doc = await getDocs(
            query(
              collection(db, 'users'),
              where('uid', '==', umkm?.investor[i].investorId)
            )
          );
          const data = doc.docs[0].data();
          arr.push(data);
        }
        return arr;
      } catch (err) {
        console.error(err);
      }
    },
    { enabled: Boolean(umkm) }
  );

  //Payment interest due date
  const canPayDate = new Date();
  const dDay = new Date();
  const paymentDate = new Date(umkm?.date.seconds * 1000);
  canPayDate.setDate(canPayDate.getDate() + 7);

  const updateJatuhTempo = async () => {
    const setNextPaymentDate = () => {
      const nextPaymentDate = paymentDate;
      nextPaymentDate.setDate(nextPaymentDate.getDate() + umkm?.angsuran * 30);
      return nextPaymentDate;
    };

    if (dDay.getTime() > paymentDate.getTime()) {
      if (umkm?.hasPay === 0) {
        await updateDoc(doc(db, 'umkm', umkm?.umkmId), {
          late: 1,
        });
      } else {
        await updateDoc(doc(db, 'umkm', umkm?.umkmId), {
          hasPay: 0,
          date: setNextPaymentDate(),
        });
      }
      refetch();
    } else {
      console.log('fail or either you paid');
    }
  };

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

  const updateInvestor = async (e) => {
    const q = query(collection(db, 'users'), where('uid', '==', e.uid));

    const doca = await getDocs(q);

    const second = async (e) => {
      console.log(e);
      try {
        await updateDoc(doc(db, 'users', doca?.docs[0].id), {
          name: e.name,
          invested: e.invested,
        });
      } catch (err) {
        console.error(err);
      }
    };
    second(e);
  };

  useEffect(() => {
    if (isSuccess === true) {
      updateJatuhTempo();
    }
  });
  return (
    <Box>
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Box
          h={600}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          w='45vw'
          rounded='20px'
          overflow='hidden'
          boxShadow='md'
          bg='gray.100'
          fontSize='14px'
          fontFamily='helvetica'
          mt={10}
        >
          <Box>
            <Image m={0} h='400px' w='100vh' src={umkm?.imageUrl} />
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
          position='fixed'
          right={10}
          top='35vh'
          mr={6}
          display='flex'
          flexDirection='column'
          bg='gray.100'
          p={25}
          w={280}
          gap={5}
          justifyContent='center'
          textAlign='center'
          rounded='md'
          boxShadow='sm'
        >
          <Box display='flex' alignItems='center'>
            <Text textAlign='start' fontWeight='semibold'>
              Jatuh tempo pembayaran
            </Text>
          </Box>
          <Box>
            <Text color='teal' fontWeight='bold' fontSize='1.2rem'>
              {paymentDate.getDate()} {month(paymentDate.getMonth())}{' '}
              {paymentDate.getFullYear()}
            </Text>
          </Box>
          <Box>
            <Text textAlign='start' fontWeight='semibold'>
              Bunga yang harus dibayar
            </Text>

            <Box mt={5} color='teal' fontWeight='bold' fontSize='1.2rem'>
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
      <Stack mt={20} justifyContent='center' alignItems='center'>
        {userInfo?.map((e, index) => {
          return <Box key={index}>{e.email}</Box>;
        })}
      </Stack>
    </Box>
  );
}

export default UmkmDash;

//  <Button ml={700} onClick={() => {}}>Umkm</Button>
