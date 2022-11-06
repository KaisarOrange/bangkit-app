import { Box, Image, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase-config";
import UpdateModal from "./UpdateModal";

function UmkmDash() {
  const [user, loading, error] = useAuthState(auth);

  const [data, setData] = useState({
    nama: "",
    deskripsi: "",
    ownerName: "",
    imageUrl: "",
    uid: "",
    id: "",
  });

  async function fetchUMKM() {
    try {
      const q = query(
        collection(db, "umkm"),
        where("ownerUid", "==", user?.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log();
      setData((prev) => ({
        ...prev,
        name: data.name,
        imageUrl: data.imageUrl,
        uid: user.uid,
        deskripsi: data.deskripsi,
        id: doc.docs[0].id,
      }));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUMKM();
  }, []);

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box
        h={650}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        w="50vw"
        rounded="20px"
        overflow="hidden"
        boxShadow="md"
        bg="gray.100"
        fontSize="14px"
        fontFamily="helvetica"
        mt={10}
      >
        <Box>
          <Image m={0} h="400px" w="100vh" src={data?.imageUrl} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          h="100%"
          p="0px 15px"
        >
          <Text as="h1" m={2} fontSize="2rem" fontWeight="bold">
            {data?.nama}
          </Text>
          <Text m={3} fontWeight="small">
            {data?.deskripsi}
          </Text>
        </Box>
        <UpdateModal id={data.id} />
      </Box>
    </Box>
  );
}

export default UmkmDash;
