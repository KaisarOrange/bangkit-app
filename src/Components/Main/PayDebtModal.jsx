import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';

function PayDebtModal({ bayarHutang }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amountPaid, setAmountPaid] = useState(0);

  return (
    <>
      <Button colorScheme='teal' onClick={onOpen}>
        Bayar Pinjaman
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bayar Pinjaman</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type='number'
              placeholder='jumlah yang ingin dibayar'
              onChange={(event) => {
                setAmountPaid(event.target.valueAsNumber);
              }}
            ></Input>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              disabled={amountPaid === 0 || isNaN(amountPaid)}
              onClick={() => bayarHutang(amountPaid)}
            >
              bayar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PayDebtModal;
