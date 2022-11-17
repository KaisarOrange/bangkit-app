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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

function Checkout(props) {
  const { umkm, id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [invest, setInvest] = useState(0);

  const checkOut = async (event) => {
    event.preventDefault();
    const userDoc = doc(db, "umkm", id);
    const newField = { danaRecieved: umkm.danaRecieved + invest };
    await updateDoc(userDoc, newField);
    window.location.reload();
  };

  return (
    <>
      <Button bg="#14BBC6" mt={4} onClick={onOpen}>
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
                    type="number"
                    placeholder="Dana"
                    bg="white"
                    onChange={(event) => {
                      setInvest(event.target.valueAsNumber);
                    }}
                  ></Input>
                </InputGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} onClick={onClose}>
                Invest
              </Button>
              <Button onClick={() => console.log(umkm)}></Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Checkout;
