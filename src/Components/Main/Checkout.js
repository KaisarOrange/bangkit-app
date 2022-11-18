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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "@tanstack/react-query";

function Checkout(props) {
  const { umkm, id, fetchUMKM } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [user] = useAuthState(auth);
  const [invest, setInvest] = useState(0);
  const { data, isLoading } = useQuery(["check"], fetchUMKM);
  const [investor, setInvestor] = useState([]);

  const pushInvestor = () => {
    const exist = investor.findIndex((e) => e.investorId === user.id) > -1;
    const index = investor.findIndex((e) => e.investorId === user.id);

    if (investor.length === 0) {
      setInvestor([
        ...investor,
        { investorId: user.uid, investorInvestedAmount: invest },
      ]);
    } else if (!exist || investor.length === 0) {
      setInvestor([
        ...investor,
        { investorId: user.uid, investorInvestedAmount: invest },
      ]);
    } else {
      investor[index] = {
        ...investor[index],
        investorId: user.uid,
        investorInvestedAmount: invest,
      };
    }
    console.log(investor);
  };

  const checkOut = async (event) => {
    event.preventDefault();
    pushInvestor();
    const userDoc = doc(db, "umkm", id);
    const newField = {
      danaRecieved: umkm.danaRecieved + invest,
      investor: investor,
    };
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
              <Button onClick={() => console.log(data)}></Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Checkout;
