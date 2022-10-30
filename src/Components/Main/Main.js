import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  Spacer,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getDownloadURL, list, listAll, ref } from "firebase/storage";
import { logout, db, auth, storage } from "../../firebase-config";
import { query, collection, getDocs, where } from "firebase/firestore";
import Navbar from "./Navbar";

function Main() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [image, setImage] = useState();
  const [umkmImage, setumkmImage] = useState([]);
  const [umkm, setUmkm] = useState([]);
  const imageListRef = ref(storage, "umkm/");

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      const image = await getDownloadURL(ref(storage, data.picture));
      setImage(image);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchUMKM = async () => {
    const umkmCollectionRef = collection(db, "umkm");
    try {
      const data = await getDocs(umkmCollectionRef);

      setUmkm(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
    fetchUMKM();
  }, [user, loading]);

  return (
    <Box pt={100} pb={10}>
      <Navbar name={name} image={image} />
      <Outlet context={{ umkm: [umkm], fetchUMKM: [fetchUMKM] }} />
    </Box>
  );
}

export default Main;
