import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { db } from '../../firebase-config';

function AlertDialogExample({
  BtnText,
  title,
  pesan,
  bayar,
  hasPay,
  datea,
  canPay,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {}, []);

  return (
    <>
      <Button
        cursor='pointer'
        disabled={datea.getTime() > canPay || hasPay === 1}
        colorScheme='teal'
        onClick={onOpen}
        size={{ base: 'sm', lg: 'md' }}
      >
        {BtnText}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{pesan}</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme='teal'
                onClick={() => {
                  bayar();
                  onClose();
                }}
                ml={3}
              >
                Bayar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
export default AlertDialogExample;
