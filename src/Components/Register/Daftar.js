import {
  Box,
  Button,
  Stack,
  Text,
  Image,
  Fade,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase-config';
import logo from '../../img/logo.png';
import Side from './Side';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';
import Auth from './Auth';

function Daftar() {
  const [user, loading, error] = useAuthState(auth);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    imageProfile: '',
    isUMKM: '0',
    isInvestor: '0',
    imageUrl: '',
  });
  const navigate = useNavigate();

  const FormTitles = ['Siapakah kamu?', 'Sign Up'];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <Side
          formData={formData}
          setFormData={setFormData}
          nextDisplay={nextDisplay}
        />
      );
    } else if (page === 1) {
      return <Auth formData={formData} setFormData={setFormData} />;
    }
  };
  const nextDisplay = () => {
    setPage((curr) => curr + 1);
  };
  const registerWithEmailAndPassword = async (
    name,
    email,
    password,
    picture,
    isInvestor,
    isUMKM,
    invested,
    saldo
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name,
        email,
        picture,
        isInvestor,
        isUMKM,
        invested,
        saldo,
      });

      if (formData.isUMKM === '1') {
        navigate('/registerUMKM');
      } else {
        navigate('/main/card');
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) return navigate('/main/card');
  });

  return (
    <Box mt={100}>
      <Box></Box>
      <Box
        pb={10}
        m='auto'
        w={350}
        h={600}
        bg='gray.200'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        rounded='md'
        boxShadow='sm'
      >
        <Stack textAlign='center' spacing={5} mt={8} mb={5}>
          <Image m='auto' w='10rem' src={logo} />
          <Text fontWeight='bold' as='h1'>
            {FormTitles[page]}
          </Text>
        </Stack>
        <Box w={250} h={300}>
          {PageDisplay()}
        </Box>
        <Box mt={10} as='footer'>
          <Button
            size='sm'
            bg='transparent'
            disabled={page == 0}
            onClick={() => setPage((curr) => curr - 1)}
          >
            Kembali
          </Button>
          <Button
            size='sm'
            bg='transparent'
            disabled={page == 0}
            onClick={() => {
              if (page === FormTitles.length - 1) {
                try {
                  registerWithEmailAndPassword(
                    formData.name,
                    formData.email,
                    formData.password,
                    formData.imageUrl,
                    formData.isInvestor,
                    formData.isUMKM,
                    [],
                    0
                  );
                } catch (err) {
                  alert('hello');
                }
              } else {
                setPage((curr) => curr - 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? 'Submit' : 'Selanjutnya'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Daftar;
