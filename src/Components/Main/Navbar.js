import React, { useEffect } from "react";
import { logout, db, auth } from "../../firebase-config";
import { query, collection, getDocs, where, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Image,
  Box,
  Spacer,
  Input,
  Button,
  Text,
  Avatar,
} from "@chakra-ui/react";
import logo from "../../img/logo.png";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import DrawerExample from "./Drawer";

function Navbar(props) {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const home = () => {
    props.setFilterUmkm("");
    navigate("/main/card");
  };
  const submit = (element) => {
    element.preventDefault();
    navigate("/main/card");
  };
  return (
    <Flex
      bg="white"
      position="fixed"
      w="100%"
      padding={5}
      boxShadow="md"
      justifyContent="center"
      alignItems="center"
      top="0"
      zIndex={100}
    >
      <Box>
        <Image cursor="pointer" onClick={() => home()} w="10rem" src={logo} />
      </Box>
      <Spacer />
      <Box>
        <form onSubmit={submit}>
          <Input
            onChange={(event) => props.setFilterUmkm(event.target.value)}
            value={props.filterUmkm}
            w="50vw"
            placeholder="Bakmie cina"
          ></Input>
        </form>
      </Box>
      <Spacer />
      <Box
        mr={10}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={5}
      >
        <Text fontWeight="medium">Selamat datang, {props.name}! </Text>
        <DrawerExample image={props.image} />
      </Box>
    </Flex>
  );
}

export default Navbar;
