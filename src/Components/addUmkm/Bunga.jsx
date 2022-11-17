import { Box, Button, Spacer, Text } from "@chakra-ui/react";

import Radio from "./Radio";
import uniqid from "uniqid";
import { useState } from "react";
import { useEffect } from "react";

function Bunga({ umkm, setUmkm }) {
  const [value, setValue] = useState("3");
  const [value2, setValue2] = useState("3");
  const [date, setDatee] = useState([]);
  const [bunga, setBunga] = useState([]);

  const convert = (n) => {
    const a = parseInt(n);
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const setPaymentDate = (value) => {
    const data = new Date();
    const date = [];
    const days = Number(value) * 30;
    for (let i = 0; i < 3; i++) {
      const hello = data.toLocaleDateString(
        "en-Uk",
        data.setDate(data.getDate() + days)
      );
      date.push(hello);
    }
    setDatee(date);
    return date;
  };

  useEffect(() => {
    setUmkm({
      ...umkm,
      date: setPaymentDate(value),
      bunga: Number(value2),
      angsuran: value,
    });
  }, [value, value2]);
  return (
    <Box>
      <Radio
        value={value}
        setValue={setValue}
        optionOne={"3"}
        optionTwo={"6"}
        optionThree={"12"}
        option={"Bulan"}
      />
      <Radio
        value={value2}
        setValue={setValue2}
        optionOne={"3"}
        optionTwo={"6"}
        optionThree={"12"}
        option={"%"}
      />
      <Text mt={5} textAlign="center" fontWeight="semibold">
        Simulasi angsuran
      </Text>
      <Text fontSize="0.9rem" textAlign="center" color="gray.400">
        (Dana diterima Rp. 100.000.000)
      </Text>
      <Text
        fontSize="1.2rem"
        color="teal"
        mt={4}
        textAlign="center"
        fontWeight="bold"
      >
        Rp.{" "}
        {convert(
          (((100000000 * Number(value)) / 3) * Number(value2)) / 100 / 4
        )}
      </Text>
      <Text fontWeight="semibold" textAlign="center" mt={5}>
        Pembayaran setiap{" "}
      </Text>
      <Box
        fontSize="1.2rem"
        color="teal"
        fontWeight="bold"
        mt={4}
        textAlign="center"
      >
        <Box gap={2}>
          {date.map((e) => {
            return <Text key={uniqid()}>{e}</Text>;
          })}
        </Box>
      </Box>
      <Button onClick={() => console.log(umkm)}>Hello</Button>
    </Box>
  );
}

export default Bunga;
