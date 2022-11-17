import { Avatar, Box, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import uniqid from "uniqid";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cardd from "../../styles/Card.css";
import { useQuery } from "@tanstack/react-query";

function Card(props) {
  let navigate = useNavigate();
  const {
    fetchUMKM: [fetchUMKM],
    filterUmkm: [filterUmkm],
  } = useOutletContext();

  const { data, isLoading } = useQuery(["card"], fetchUMKM);

  const convert = (n) => {
    const a = parseInt(n);
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box
      mt={20}
      ml="auto"
      mr="auto"
      w="50vh"
      display="grid"
      gridTemplate="auto /1fr 1fr 1fr 1fr"
      gap="16"
      justifyContent="center"
    >
      {data
        ?.filter((e) => {
          if (filterUmkm == "") {
            return e;
          } else if (e.nama.toLowerCase().includes(filterUmkm.toLowerCase())) {
            return e;
          }
        })
        .map((element) => {
          return (
            <div key={uniqid()}>
              <Box
                onClick={() => navigate(`/main/${element.id}`)}
                className="Card"
                h={450}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                w="300px"
                rounded="20px"
                overflow="hidden"
                boxShadow="md"
                bg="gray.100"
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
                  <Box color="teal" gap={2} display="flex">
                    <Text fontWeight="semibold">Bunga {element.bunga} % </Text>
                    <Text fontWeight="semibold">
                      {" "}
                      . {element.angsuran} Bulan
                    </Text>
                  </Box>

                  <Box mt={3} bg="white">
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
