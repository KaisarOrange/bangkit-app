import {
  Box,
  Button,
  Divider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase-config";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function Portofolio() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const signOut = () => {
    logout();
    navigate("/");
  };

  const { data: userData } = useQuery(["userDataPorto"], async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);

      return doc.docs[0].data();
    } catch (err) {
      console.error(err);
    }
  });

  const { data: umkmData, isLoading } = useQuery(["umkmDataPorto"], () => {
    const umkm = [];
    try {
      userData?.invested.map(async (e) => {
        const ref = doc(db, "umkm", e.umkmId);
        const data = await getDoc(ref);

        umkm.push(...umkm, data.data());
        console.log(umkm);
      });
      return umkm;
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <Box mt={70}>
      <Text m={7} as="h1" fontSize="1.5rem" textAlign="center">
        Portofolio
      </Text>
      <Box
        display="flex"
        gap={5}
        flexDirection="column"
        w="50vw"
        m="auto"
        bg="rgba(75, 192, 192, 0.2)"
        pl={12}
        pr={12}
        pt={10}
        pb={10}
        fontWeight="semibold"
        rounded="md"
      >
        <Box>
          <Text>Jumlah investasi</Text>
          <Text>
            Rp.
            {userData?.invested.reduce((total, num) => {
              return total + num.investedAmount;
            }, 0)}{" "}
          </Text>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Text>Saldo</Text>
            <Text>Rp. 0</Text>
          </Box>
          <Box>
            <Text>Imbal Hasil</Text>
            <Text>Rp. 0</Text>
          </Box>
        </Box>
      </Box>
      <TableContainer
        w="50vw"
        rounded="md"
        bg="gray.100"
        m="auto"
        mt={12}
        minH="30vh"
        p={30}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nama UMKM</Th>
              <Th>Yield Bunga</Th>
              <Th>Jumlah Investasi</Th>
              <Th>Nilai Investasi</Th>
            </Tr>
          </Thead>
          <Tbody color="teal">
            {userData?.invested.map((e, index) => {
              return (
                <Tr key={index} cursor="default">
                  <Td>Bugatti Showroom</Td>
                  <Td isNumeric>8%</Td>
                  <Td isNumeric>{e.investedAmount}</Td>
                  <Td isNumeric>80.000.000</Td>
                  <Td>
                    <DeleteIcon cursor="pointer" />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Box
        display="flex"
        justifyContent="end"
        alignItems="center"
        w="50vw"
        m="auto"
      >
        <Button mt={5} fontSize="0.9rem" px={2} bg="#14BBC6" onClick={signOut}>
          Keluar akun
        </Button>
      </Box>
      <Button onClick={() => console.log(umkmData)}>helo</Button>
    </Box>
  );
}

export default Portofolio;
/*<Box
        w="50vw"
        rounded="md"
        bg="gray.100"
        m="auto"
        mt={12}
        minH="30vh"
        p={30}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box color="gray.500" display="flex" gap={16}>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text>Nilai Investasi</Text>
        </Box>
        <Divider height={2} color="black" />
        <Box mt={3} display="flex">
          <Box display="flex">
            <Text></Text>
            <Text></Text>
            <Text>1.000.000.000</Text>
            <Text>80.000.000</Text> 
          </Box>
        </Box>
      </Box> */
