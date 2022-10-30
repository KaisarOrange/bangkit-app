import { Avatar, Box, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import uniqid from "uniqid";
import { query, collection, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cardd from "../../styles/Card.css";

function Card(props) {
  let navigate = useNavigate();

  const {
    umkm: [umkm],
    fetchUMKM: [fetchUMKM],
  } = useOutletContext();
  //const { umkm, image } = props;
  const convert = (n) => {
    const a = parseInt(n);
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <Box
      mt={20}
      ml="auto"
      mr="auto"
      w="50vh"
      display="grid"
      gridTemplate="auto auto/1fr 1fr 1fr"
      gap="16"
      justifyContent="center"
    >
      {umkm.map((element) => {
        return (
          <div key={uniqid()}>
            <Box
              onClick={() =>
                navigate(`/main/${element.id}`, {
                  state: { umkm: [umkm], fetchUMKM: fetchUMKM },
                })
              }
              className="Card"
              h={450}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              w="300px"
              rounded="20px"
              overflow="hidden"
              boxShadow="sm"
              bg="gray.200"
              cursor="pointer"
              fontSize="14px"
              fontFamily="helvetica"
            >
              <Box boxSize="md">
                <Image m={0} h="200px" w="400px" src={element.imageUrl} />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                h="100%"
                p="0px 15px"
              >
                <Text fontWeight="bold">{element.nama}</Text>
                <Box gap={2} display="flex" alignItems="center">
                  <Avatar size="sm" src={element.ownerPhoto} />
                  <Text>{element.ownerName}</Text>
                </Box>
                <Text mt={1} fontWeight="small">
                  {element.deskripsi}
                </Text>
                <Box mt={5} bg="gray.100">
                  <Box
                    rounded="md"
                    bg="#14BBC6"
                    w={(element.danaRecieved / element.dana) * 100 + "%"}
                    h={1.5}
                  ></Box>
                </Box>
                <Text>Dana terkumpul</Text>
                <Text fontWeight="semibold">
                  Rp {convert(element.danaRecieved)}
                </Text>
              </Box>
            </Box>
          </div>
        );
      })}
    </Box>
  );
}

export default Card;
/*
 */
