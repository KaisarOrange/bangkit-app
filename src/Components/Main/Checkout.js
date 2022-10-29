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
    console.log(umkm.dana);
    const num = invest;
    const userDoc = doc(db, "umkm", id);
    const newField = { danaRecieved: umkm.danaRecieved + invest };
    console.log(typeof num);
    await updateDoc(userDoc, newField);
  };

  return (
    <>
      <Button mt={4} onClick={onOpen}>
        Invest
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
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
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Checkout;
