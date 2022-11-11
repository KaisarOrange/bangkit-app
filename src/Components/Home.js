import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Image,
  Button,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import logo from "../img/logo.png";
import petani from "../img/ef.png";

function Home() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (user) return navigate("/main/card");
  });

  return (
    <Box
      pt={5}
      h="100vh"
      bg="linear-gradient(to bottom left, #14BBC6 0%, white 80%)"
      pb={50}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        fontSize="1.5rem"
        alignItems="center"
        mb={10}
        ml="70px"
        mr="70px"
      >
        <Box cursor="pointer" onClick={() => navigate("/")}>
          <Image w="12vw" src={logo} />
        </Box>
      </Box>

      <Box
        backgroundImage={petani}
        display="flex"
        justifyContent="start"
        alignItems="center"
        gap={20}
        w="70vw"
        h={580}
        m="auto"
        rounded="lg"
      >
        <Box m={10} mt={16} display="flex" flexDirection="column">
          <Text fontSize="1.3rem" fontWeight="bold">
            Halo, selamat datang
          </Text>
          <Text fontSize="2rem" fontWeight="bold">
            Ayo! Bangkit bersama UMKM
          </Text>
          <Text fontWeight="semibold" mt={2}>
            Aplikasi platform pendanaan UMKM
          </Text>
          <Box display="flex" gap={5} mt={10}>
            <Button
              color="white"
              bg="#319795"
              onClick={() => navigate("/daftar")}
            >
              Mulai Sekarang
            </Button>
            <Button
              onClick={() => navigate("/login")}
              color="white"
              bg="#236463"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
