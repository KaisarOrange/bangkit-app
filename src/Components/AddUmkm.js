import React from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  Stack,
  Text,
  Image,
  Textarea,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  db,
  logInWithEmailAndPassword,
  storage,
} from "../firebase-config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from "../img/logo.png";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";

function AddUmkm() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [owner, setOwner] = useState({
    name: "",
    imageUrl: "",
    uid: "",
  });
  const [umkm, setUmkm] = useState({
    name: "",
    deskripsi: "",
    imageUrl: "",
    danaNeeded: 0,
    danaRecieved: 0,
  });

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      const image = await getDownloadURL(ref(storage, data.picture));
      console.log(data.name);
      setOwner((prev) => ({
        ...prev,
        name: data.name,
        imageUrl: image,
        uid: user.uid,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "umkm"), {
        nama: umkm.name,
        deskripsi: umkm.deskripsi,
        imageUrl: umkm.imageUrl,
        ownerName: owner.name,
        ownerPhoto: owner.imageUrl,
        ownerUid: owner.uid,
        dana: umkm.danaNeeded,
        danaRecieved: umkm.danaRecieved,
      });
    } catch (err) {
      console.log(err);
    }

    navigate("/main/card");
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();

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
            setUmkm({ ...umkm, imageUrl: url });
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  return (
    <Box
      boxShadow="sm"
      bg="gray.200"
      pt="10"
      pb="10"
      pl="5"
      pr="5"
      w="350px"
      mt={100}
      ml="auto"
      mr="auto"
      rounded="md"
    >
      <Button onClick={() => console.log(owner)}></Button>
      <form onSubmit={handleAdd}>
        <Stack spacing={3}>
          <Image m="auto" w="10rem" src={logo} />
          <FormControl isRequired>
            <InputGroup>
              <Input
                onChange={(event) => {
                  setUmkm({ ...umkm, name: event.target.value });
                }}
                bg="white"
                type="text"
                placeholder="Nama UMKM"
                value={umkm.name}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <Textarea
                value={umkm.deskripsi}
                onChange={(event) => {
                  setUmkm({ ...umkm, deskripsi: event.target.value });
                }}
                placeholder="Deskripsi UMKM"
                size="sm"
                bg="white"
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <Input
                type="number"
                onChange={(event) => {
                  setUmkm({ ...umkm, danaNeeded: event.target.valueAsNumber });
                }}
                placeholder="Jumlah dana yang dibutuhkan"
                size="sm"
                bg="white"
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <Input
                type="file"
                id="file"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                }}
                placeholder="Deskripsi UMKM"
                size="sm"
                bg="white"
              />
            </InputGroup>
          </FormControl>
          <Button
            type="submit"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
            _active={{ boxShadow: "lg" }}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default AddUmkm;
