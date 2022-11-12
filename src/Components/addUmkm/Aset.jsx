import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { Doughnut } from "react-chartjs-2";

function Aset({ setUmkm, umkm }) {
  return (
    <Box>
      <FormControl>
        <FormLabel>Modal</FormLabel>
        <Input
          onChange={(e) => setUmkm({ ...umkm, modal: Number(e.target.value) })}
          bg="white"
          type="number"
          min="1900"
          max="2099"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Hutang</FormLabel>
        <Input
          onChange={(e) => setUmkm({ ...umkm, hutang: Number(e.target.value) })}
          bg="white"
          type="number"
        />
      </FormControl>
      <Box w="14rem" m="auto" mt={2}>
        <Doughnut
          data={{
            labels: ["hutang", "modal"],
            datasets: [
              {
                label: "Profit",
                data: [umkm.hutang, umkm.modal],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: ["rgb(75, 192, 192)"],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            animation: {
              duration: 800,
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default Aset;
