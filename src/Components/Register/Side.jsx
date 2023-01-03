import React from "react";
import { Box, Stack, Image, Fade, useDisclosure } from "@chakra-ui/react";
import img from "../../img/warren.jpg";
import img2 from "../../img/umkm.png";

function Side({ nextDisplay, formData, setFormData }) {
  const { isOpen: Alip, onToggle: Ganteng } = useDisclosure();

  const { isOpen: pinter, onToggle: tekun } = useDisclosure();

  const fade = (image, text, isOpen, onToggle, side) => {
    const choice = () => {
      if (side === "1") {
        setFormData({ ...formData, isUMKM: "1", isInvestor: "0" });
        nextDisplay();
      } else {
        setFormData({ ...formData, isInvestor: "1", isUMKM: "0" });
        nextDisplay();
      }
    };
    return (
      <Box
        cursor="pointer"
        onClick={choice}
        onMouseEnter={onToggle}
        onMouseLeave={onToggle}
        position="relative"
        className="Card"
      >
        <Image
          onClick={nextDisplay}
          className="Card"
          boxShadow="md"
          rounded="md"
          src={image}
        />
        <Fade in={isOpen}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontSize="2rem"
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            color="white"
            bg="blackAlpha.600"
            rounded="md"
            shadow="md"
          >
            {text}
          </Box>
        </Fade>
      </Box>
    );
  };
  return (
    <Box>
      <Stack spacing={5}>
        {fade(img, "Investor", Alip, Ganteng, "0")}
        {fade(img2, "UMKM", pinter, tekun, "1")}
      </Stack>
    </Box>
  );
}

export default Side;
