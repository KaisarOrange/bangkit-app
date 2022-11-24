import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { db, storage } from "../../firebase-config";
import camera from "../../img/camera.png";

function UpdateModal({ id }) {
  const [file, setFile] = useState("");
  const [umkmImage, setUmkmImage] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  async function updateUmkm() {
    try {
      updateDoc(doc(db, "umkm", id), {
        deskripsi: deskripsi,
        imageUrl: umkmImage,
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(storage, "umkm/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
            default:
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUmkmImage(url);
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);
  return (
    <Box w="30vh" textAlign="center" m="auto" mb={5}>
      <Button colorScheme="teal" onClick={onOpen} pr={10} pl={10}>
        Ubah
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mengubah Informasi UMKM</ModalHeader>
          <FormLabel textAlign="center" cursor="pointer">
            <Box
              h="30vh"
              overflow="hidden"
              m={3}
              border="1px"
              rounded="md"
              borderColor="black"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {file ? (
                <Image src={umkmImage} />
              ) : (
                <Image w="10vh" h="10vh" src={camera} />
              )}
            </Box>
            <FormControl>
              <InputGroup>
                <Input
                  display="none"
                  type="file"
                  id="file"
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                  }}
                  placeholder="Deskripsi UMKM"
                  size="sm"
                  bg="transparent"
                />
              </InputGroup>
            </FormControl>
          </FormLabel>
          <FormControl>
            <InputGroup p={4}>
              <Textarea
                h={180}
                value={deskripsi}
                onChange={(event) => {
                  setDeskripsi(event.target.value);
                }}
                placeholder="Deskripsi UMKM"
                size="sm"
                bg="white"
              />
            </InputGroup>
          </FormControl>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                updateUmkm();
                onClose();
              }}
            >
              Simpan
            </Button>
            <Button onClick={() => console.log(id)}>hello</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default UpdateModal;
