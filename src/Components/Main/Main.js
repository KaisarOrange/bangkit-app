import { Box, Button, Spinner, Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { db, auth, storage } from "../../firebase-config";
import { query, collection, getDocs, where } from "firebase/firestore";
import Navbar from "./Navbar";
import Loading from "./Loading";

function Main() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [image, setImage] = useState();
  const [filterUmkm, setFilterUmkm] = useState("");

  const fetchUMKM = async () => {
    const umkmCollectionRef = collection(db, "umkm");
    try {
      const data = await getDocs(umkmCollectionRef);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      //setUmkm(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isLoading, status } = useQuery(["umkm"], fetchUMKM);

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

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box pt={100} pb={10}>
      <Navbar
        filterUmkm={filterUmkm}
        setFilterUmkm={setFilterUmkm}
        name={name}
        image={image}
      />
      <Outlet context={{ fetchUMKM: [fetchUMKM], filterUmkm: [filterUmkm] }} />
      <Button onClick={() => console.log(data.map((e) => e.id))}>Hello</Button>
    </Box>
  );
}

export default Main;

//<Button onClick={() => console.log(filterUmkm)}>Hello</Button>
