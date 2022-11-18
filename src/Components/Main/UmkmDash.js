import { Avatar, Box, Button, Image, Stack, Text } from "@chakra-ui/react";

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
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

function UmkmDash() {
  const [user, loading, error] = useAuthState(auth);
  const [truee, setTrue] = useState(false);

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
    investor: [],
  });

  const { data: umkm, isLoading } = useQuery(["dash"], async () => {
    try {
      const q = query(
        collection(db, "umkm"),
        where("ownerUid", "==", user?.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      return data;
    } catch (err) {
      console.log(err);
    }
  });

  const {
    data: userInfo,
    isLoading: userLoad,
    status,
  } = useQuery(["dashUser"], async () => {
    try {
      const arr = [];
      if (!isLoading) {
        for (let i = 0; i < umkm?.investor.length; i++) {
          const q = query(
            collection(db, "users"),
            where("uid", "==", umkm?.investor[i].investorId)
          );

          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          arr.push(data);
          console.log(data);
        }
      }
      return arr;
    } catch (err) {
      console.error(err);
    }
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box>
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
          {status}
          <Box>
            <Image m={0} h="400px" w="100vh" src={umkm?.imageUrl} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            h="100%"
            p="0px 15px"
          >
            <Text as="h1" m={2} fontSize="2rem" fontWeight="bold">
              {umkm?.nama}
            </Text>
            <Box m={3} fontWeight="small">
              {userLoad
                ? "Hello"
                : userInfo?.map((e, index) => {
                    return <Box key={index}>{e.email}</Box>;
                  })}
            </Box>
          </Box>
          <UpdateModal />
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
              {umkm?.date[0]}
            </Text>
          </Box>
          <Box>
            <Text textAlign="start" fontWeight="semibold">
              Bunga yang harus dibayar
            </Text>
            <Text mt={5} color="teal" fontWeight="bold" fontSize="1.2rem">
              Rp.
              {convert(
                (((umkm?.danaRecieved * umkm?.bunga) / 3) *
                  Number(umkm?.angsuran)) /
                  100 /
                  4
              )}
            </Text>
          </Box>
          <Button bg="#14BBC6">Bayar</Button>
        </Box>
      </Box>
      <Stack mt={20} justifyContent="center" alignItems="center">
        <Button onClick={() => console.log(userInfo)}>Hello</Button>
      </Stack>
    </Box>
  );
}

export default UmkmDash;
