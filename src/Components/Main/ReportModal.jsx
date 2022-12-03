import {
  background,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../firebase-config';

function ReportModal({ user, umkm }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [value, setValue] = useState([]);

  const pushValue = (n) => {
    if (value.includes(n)) {
      setValue(value.filter((e) => e !== n));
    } else {
      setValue([...value, n]);
    }
  };
  const submit = async () => {
    await addDoc(collection(db, 'report'), {
      userName: user?.name,
      userId: user?.uid,
      userImage: user?.picture,
      umkmName: umkm?.nama,
      umkmImage: umkm?.imageUrl,
      reportedCase: value,
      ownerId: umkm?.ownerUid,
    });
  };

  return (
    <>
      <Box
        onClick={onOpen}
        cursor='pointer'
        userSelect='none'
        bg='red.400'
        borderRadius='50% '
        textAlign='center'
        w='40px'
        p='1'
        mb={2}
      >
        <Text fontWeight='bold' fontSize='xl'>
          !
        </Text>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lapor UMKM</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display='flex' flexDir='column' gap={3}>
              <Box
                boxShadow='sm'
                userSelect='none'
                cursor='pointer'
                border='1px'
                borderColor='gray.200'
                p={2}
                rounded={5}
                onClick={() => pushValue(1)}
                bg={value.includes(1) ? 'red.100' : ''}
                _active={{ background: 'red.300' }}
              >
                <Text>Data Finansial UMKM direkayasa</Text>
              </Box>
              <Box
                boxShadow='sm'
                userSelect='none'
                cursor='pointer'
                border='1px'
                borderColor='gray.200'
                p={2}
                rounded={5}
                onClick={() => pushValue(2)}
                bg={value.includes(2) ? 'red.100' : ''}
                _active={{ background: 'red.300' }}
              >
                <Text>UMKM tidak ada</Text>
              </Box>
              <Box
                boxShadow='sm'
                userSelect='none'
                cursor='pointer'
                border='1px'
                borderColor='gray.200'
                p={2}
                rounded={5}
                onClick={() => pushValue(3)}
                bg={value.includes(3) ? 'red.100' : ''}
                _active={{ background: 'red.400' }}
              >
                <Text>Pemilik tidak jujur</Text>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={value.length < 1}
              colorScheme='red'
              mr={3}
              onClick={() => {
                submit();
                onClose();
              }}
            >
              Lapor
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ReportModal;
