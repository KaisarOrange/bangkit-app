import { Box, Button, Spacer, Text } from "@chakra-ui/react";

import Radio from "./Radio";
import uniqid from "uniqid";
import { useState } from "react";
import { useEffect } from "react";

function Bunga({ umkm, setUmkm }) {
  const [value, setValue] = useState("1");
  const [value2, setValue2] = useState("1");
  const [date, setDatee] = useState([]);
  const [bunga, setBunga] = useState(3);
  const itt = Number(value);
  const convert = (n) => {
    const a = parseInt(n);
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const angsuranBunga = () => {
    if (value2 === "3") {
      setBunga(3);
    } else if (value2 === "6") {
      setBunga(6);
    } else if (value2 === "12") {
      setBunga(12);
    }
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
  };
  useEffect(() => {
    angsuranBunga();
    setPaymentDate(value);
    setUmkm({ ...umkm, date: date });
  }, [value, value2]);
  return (
    <Box>
      <Radio
        value={value}
        setValue={setValue}
        setValue2={setValue2}
        value2={value2}
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
        Rp. {convert((((100000000 * itt) / 3) * bunga) / 100 / 4)}
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
      <Button onClick={() => console.log(umkm)}></Button>
    </Box>
  );
}

export default Bunga;
