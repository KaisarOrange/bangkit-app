import { DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

function Admin() {
  return (
    <div>
      <Navbar />
      <TableContainer
        w="60vw"
        rounded="md"
        bg="red.100"
        m="auto"
        mt={190}
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
              <Th>Jumlah user yang melapor</Th>
              <Th>Dana yang diterima</Th>
              <Th>Laporan terbanyak</Th>
            </Tr>
          </Thead>
          <Tbody color="black">
            <Tr cursor="default">
              <Td>Bugatti Showroom</Td>
              <Td isNumeric>20</Td>
              <Td isNumeric>1.000.000.000</Td>
              <Td isNumeric>UMKM tidak ada</Td>
              <DeleteIcon cursor="pointer" mt="18px" />
            </Tr>
            <Tr cursor="default">
              <Td>Ketoprak kematian</Td>
              <Td isNumeric>2</Td>
              <Td isNumeric>2.000.000.000</Td>
              <Td isNumeric>UMKM tidak jujur</Td>
              <DeleteIcon cursor="pointer" mt="18px" />
            </Tr>
            <Tr cursor="default">
              <Td>Sate Andrew</Td>
              <Td isNumeric>100</Td>
              <Td isNumeric>1.500.000.000</Td>
              <Td isNumeric>Data finansial palsu</Td>
              <DeleteIcon cursor="pointer" mt="18px" />
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Admin;
