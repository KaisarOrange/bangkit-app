import {
  Button,
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
          <ModalHeader>Modal Title</ModalHeader>
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
              onClick={() => bayarHutang(amountPaid)}
            >
              bayar
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PayDebtModal;
