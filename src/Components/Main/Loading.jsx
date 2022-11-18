import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

function Loading() {
  return (
    <Box
      boxSize="sm"
      display="flex"
      justifyContent="center"
      alignItems="center"
      m="auto"
      mt={200}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#14BBC6"
        size="xl"
      />
    </Box>
  );
}

export default Loading;
