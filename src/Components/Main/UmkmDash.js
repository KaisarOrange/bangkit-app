import { Avatar, Box, Image, Text } from "@chakra-ui/react";
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
import Checkout from "./Checkout";

function UmkmDash() {
  const [user, loading, error] = useAuthState(auth);
  const convert = (n) => {
    const a = parseInt(n);
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const [data, setData] = useState({
    nama: "",
    deskripsi: "",
    ownerName: "",
    imageUrl: "",
    uid: "",
    id: "",
    bunga: 0,
    date: [],
    angsuran: "",
    danaDiterima: 0,
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
        date: data.date,
        danaDiterima: data.danaRecieved,
        bunga: data.bunga,
        angsuran: data.angsuran,
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
      <Box
        position="fixed"
        right={10}
        top="35vh"
        mr={6}
        display="flex"
        flexDirection="column"
        bg="gray.100"
        p={25}
        w={280}
        gap={5}
        justifyContent="center"
        textAlign="center"
        rounded="md"
        boxShadow="sm"
      >
        <Box display="flex" alignItems="center">
          <Text fontWeight="semibold">Pembayaran selanjutnya</Text>
        </Box>
        <Box>
          <Text color="teal" fontWeight="bold" fontSize="1.2rem">
            {data.date[0]}
          </Text>
        </Box>
        <Box>
          <Text textAlign="start" fontWeight="semibold">
            Bunga yang harus dibayar
          </Text>
          <Text mt={5} color="teal" fontWeight="bold" fontSize="1.2rem">
            Rp.
            {convert(
              (((data.danaDiterima * data.bunga) / 3) * Number(data.angsuran)) /
                100 /
                4
            )}
          </Text>
        </Box>
        <Checkout umkm={data} />
      </Box>
    </Box>
  );
}

export default UmkmDash;
