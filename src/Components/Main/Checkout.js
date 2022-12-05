import {
  Input,
  Box,
  Stack,
  Image,
  FormControl,
  InputGroup,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from '@tanstack/react-query';

function Checkout({ id, refetchUmkm }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [user] = useAuthState(auth);
  const [invest, setInvest] = useState(0);
  const { data } = useQuery(['check'], async () => {
    const ref = doc(db, 'umkm', id);
    try {
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      return data;
    } catch (err) {
      console.log(err);
    }
  });

  const filter = (arr) => {
    const newArray = [];
    arr.forEach((e) => {
      if (!newArray.includes(e)) {
        newArray.push(e);
      }
    });
    return newArray;
  };

  const { data: userData } = useQuery(['userData'], async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);

      return doc.docs[0].data();
    } catch (err) {
      console.error(err);
    }
  });

  const { data: userDataId } = useQuery(['userDataId'], async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);

      return doc.docs[0].id;
    } catch (err) {
      console.error(err);
    }
  });
  const pushInvestor = () => {
    const investor = data?.investor;
    const exist =
      data.investor.findIndex((e) => e.investorId === user.uid) > -1;
    const index = data.investor.findIndex((e) => e.investorId === user.uid);

    if (investor.length === 0 || !exist) {
      investor.push(...investor, {
        investorId: user.uid,
        investorInvestedAmount: invest,
      });
    } else {
      investor[index] = {
        ...investor[index],
        investorId: user.uid,
        investorInvestedAmount:
          data.investor[index].investorInvestedAmount + invest,
      };
    }
    return filter(investor);
  };

  const pushInvest = () => {
    const investor = userData?.invested;
    const exist = userData?.invested.findIndex((e) => e.umkmId === id) > -1;
    const index = userData?.invested.findIndex((e) => e.umkmId === id);

    if (investor.length === 0 || !exist) {
      investor.push(...investor, {
        umkmId: id,
        investedAmount: invest,
        profit: 0,
        investorId: user.uid,
      });
    } else {
      investor[index] = {
        umkmId: id,
        investorId: user.uid,
        investedAmount: userData.invested[index].investedAmount + invest,
        profit: userData.invested[index].profit,
      };
    }

    return filter(investor);
  };

  const checkOut = async (event) => {
    event.preventDefault();

    const umkmDoc = doc(db, 'umkm', id);
    const userDoc = doc(db, 'users', userDataId);
    const newField = {
      danaRecieved: data.danaRecieved + invest,
      investor: pushInvestor(),
    };
    const newUserField = {
      invested: pushInvest(),
    };
    await updateDoc(umkmDoc, newField);
    await updateDoc(userDoc, newUserField);
    //window.location.reload();
    refetchUmkm();
  };

  return (
    <>
      <Button bg='#14BBC6' mt={4} onClick={onOpen}>
        Bayar
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Masukan Jumlah!</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={checkOut}>
            <ModalBody>
              <FormControl isRequired>
                <InputGroup>
                  <Input
                    type='number'
                    placeholder='Dana'
                    bg='white'
                    onChange={(event) => {
                      setInvest(event.target.valueAsNumber);
                    }}
                  ></Input>
                </InputGroup>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type='submit' colorScheme='blue' mr={3} onClick={onClose}>
                Invest
              </Button>
              <Button
                onClick={() => {
                  console.log(userData.id);
                }}
              ></Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Checkout;
