import { Box, Button, Spinner, Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { db, auth, storage, logout } from "../../firebase-config";
import { query, collection, getDocs, where } from "firebase/firestore";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { signOut } from "firebase/auth";

function Main() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [image, setImage] = useState();
  const [filterUmkm, setFilterUmkm] = useState("");
  const signOut = () => {
    logout();
    navigate("/");
  };
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

  const { data: userData, refetch } = useQuery(
    ["userDataNav"],
    async () => {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      try {
        const doc = await getDocs(q);
        return doc.docs[0].data();

        //  const image = await getDownloadURL(ref(storage, data.picture));
      } catch (err) {
        console.error(err);
      }
    },
    { enabled: Boolean(user) }
  );

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box pt={100} pb={10}>
      <Navbar
        filterUmkm={filterUmkm}
        setFilterUmkm={setFilterUmkm}
        name={userData?.name}
        image={userData?.picture}
      />
      <Outlet context={{ fetchUMKM: [fetchUMKM], filterUmkm: [filterUmkm] }} />
      <Button mt={5} fontSize="0.9rem" px={2} bg="#14BBC6" onClick={signOut}>
        Keluar akun
      </Button>
    </Box>
  );
}

export default Main;

//<Button onClick={() => console.log(filterUmkm)}>Hello</Button>
