import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";

function AlertDialogExample({ BtnText, title, pesan, bayar, hasPay, date }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const today = new Date();
  return (
    <>
      <Button
        cursor="pointer"
        disabled={date > today.getTime() || hasPay === 1}
        colorScheme="teal"
        onClick={onOpen}
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
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{pesan}</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="teal"
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
