import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Image, Text } from "@chakra-ui/react";
import { doc, getDoc, query, where, collection } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import Checkout from "./Checkout";
import { useQuery } from "@tanstack/react-query";

function About() {
  let { id } = useParams();
  const location = useLocation();
  //const [umkm, setUmkm] = useState({});

  async function fetchUMKM() {
    const ref = doc(db, "umkm", id);
    try {
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  const { data, isLoading } = useQuery(["about"], fetchUMKM);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  //const umkm = location.state.umkm[0].find((e) => e.id === id);
  const convert = (n) => {
    const a = parseInt(n);
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Box
      m="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={10}
    >
      <Box
        h={650}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        w="50vw"
        rounded="20px"
        overflow="hidden"
        boxShadow="sm"
        bg="gray.200"
        fontSize="14px"
        fontFamily="helvetica"
        mt={50}
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
      </Box>
      <Box
        position="fixed"
        right={10}
        display="flex"
        flexDirection="column"
        bg="gray.200"
        p={25}
        w={280}
        gap={5}
        justifyContent="center"
        textAlign="center"
        rounded="md"
      >
        <Box gap={4} display="flex" alignItems="center">
          <Avatar size="lg" src={data?.ownerPhoto} />
          <Text fontWeight="semibold">{data?.ownerName}</Text>
        </Box>
        <Box mt={5} bg="gray.100">
          <Box
            w={(data?.danaRecieved / data?.dana) * 100 + "%"}
            rounded="md"
            bg="#14BBC6"
            h={1.5}
          ></Box>
        </Box>
        <Text>Dana terkumpul</Text>
        <Text fontWeight="semibold">Rp {convert(data?.danaRecieved)}</Text>

        <Checkout umkm={data} id={id} />
      </Box>
    </Box>
  );
}

export default About;
/*

 */
