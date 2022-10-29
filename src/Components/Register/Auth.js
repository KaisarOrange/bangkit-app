import {
  Box,
  FormControl,
  Input,
  InputGroup,
  Stack,
  Spacer,
  Text,
  FormLabel,
  Avatar,
} from "@chakra-ui/react";
import { auth, db, storage } from "../../firebase-config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import React, { useState } from "react";
import { useEffect } from "react";

function Auth({ formData, setFormData }) {
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(storage, "profile/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.trunc(progress));
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
            setFormData({ ...formData, imageUrl: url });
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  return (
    <Box>
      <Stack mb={10}>
        <FormControl isRequired>
          <InputGroup>
            <Input
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
              placeholder="Email"
              type="email"
              bg="white"
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <Input
              value={formData.password}
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
              placeholder="Password"
              type="password"
              bg="white"
            />
          </InputGroup>
        </FormControl>
        <Spacer />
        <Spacer />
        <FormControl isRequired>
          <InputGroup mb={7}>
            <Input
              onChange={(event) =>
                setFormData({ ...formData, name: event.target.value })
              }
              value={formData.name}
              placeholder="Nama"
              type="text"
              bg="white"
            />
          </InputGroup>
        </FormControl>
        <Text textAlign="center" fontWeight="bold">
          Pilih foto profil-mu!
        </Text>
        <FormLabel textAlign="center" cursor="pointer">
          <Box m={3} border={2} borderColor="black">
            <Avatar size="lg" src={formData.imageUrl} />
          </Box>
          <FormControl isRequired>
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
        <Box>
          <Box rounded="md" bg="#14BBC6" w={uploadProgress + "%"} h={1.5}></Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default Auth;
