import React, { useEffect } from "react";
import { logout, db, auth } from "../../firebase-config";
import { query, collection, getDocs, where, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
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
        <Link to="/main/card" onClick={() => props.setFilterUmkm("")}>
          <Image cursor="pointer" w="10rem" src={logo} />{" "}
        </Link>
      </Box>
      <Spacer />
      <Box>
        <form onSubmit={submit}>
          <Input
            onChange={(event) => props.setFilterUmkm(event.target.value)}
            value={props.filterUmkm}
            w="50vw"
            placeholder="Ketoprak"
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
        <Link to="umkm-dashboard">
          <Avatar size="lg" bg="gray" name="U M" src={props.umkmImage} />
        </Link>
        <Link to="/main/portofolio">
          <Avatar size="lg" src={props.image} />
        </Link>
      </Box>
    </Flex>
  );
}

export default Navbar;
