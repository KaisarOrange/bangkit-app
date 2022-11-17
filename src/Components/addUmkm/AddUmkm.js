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
} from "../../firebase-config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  connectStorageEmulator,
} from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from "../../img/logo.png";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { DuitData } from "../Main/Data";
import Finance from "./Finance";
import InfoUmkm from "./InfoUmkm";
import Aset from "./Aset";
import Bunga from "./Bunga";

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
    finance: [],
    hutang: 0,
    modal: 0,
    date: [],
    angsuran: 0,
    bunga: 0,
  });
  const [page, setPage] = useState(0);

  const FormTitles = [
    "Informasi UMKM",
    "Pendapatan",
    "Neraca",
    "Besaran Bunga",
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <InfoUmkm
          umkm={umkm}
          setUmkm={setUmkm}
          setFile={setFile}
          file={file}
          umkmImage={umkm.imageUrl}
        />
      );
    } else if (page === 1) {
      return <Finance umkm={umkm} setUmkm={setUmkm} />;
    } else if (page === 2) {
      return <Aset umkm={umkm} setUmkm={setUmkm} />;
    } else if (page === 3) {
      return <Bunga umkm={umkm} setUmkm={setUmkm} />;
    }
  };

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      const image = await getDownloadURL(ref(storage, data.picture));

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
        finance: umkm.finance,
        modal: umkm.modal,
        date: umkm.date,
        bunga: umkm.bunga,
        hutang: umkm.hutang,
        angsuran: umkm.angsuran,
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
      w="400px"
      mt={70}
      ml="auto"
      mr="auto"
      rounded="md"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <form>
        <Stack spacing={3}>
          <Stack textAlign="center" spacing={5} mb={5}>
            <Image m="auto" w="10rem" src={logo} />
            <Text fontWeight="bold" as="h1">
              {FormTitles[page]}
            </Text>
          </Stack>
          <Box w={290} h={400}>
            {PageDisplay()}
          </Box>
        </Stack>
        <Box textAlign="center">
          <Button
            size="sm"
            bg="transparent"
            disabled={page == 0}
            onClick={() => {
              setPage((curr) => curr - 1);
            }}
          >
            Kembali
          </Button>
          <Button
            size="sm"
            bg="transparent"
            onClick={() => {
              if (page === FormTitles.length - 1) {
                try {
                  handleAdd();
                } catch (err) {
                  alert(err);
                }
              } else {
                setPage((curr) => curr + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Submit" : "Selanjutnya"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default AddUmkm;
