import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function Finance({ setUmkm, umkm }) {
  const [data, setData] = useState({
    year: 0,
    omset: 0,
    beban: 0,
    profit: 0,
  });
  const [finance, setFinance] = useState([]);

  const pushFinance = (tahun) => {
    const exist = finance.findIndex((e) => e.year === tahun) > -1;
    const index = finance.findIndex((e) => e.year === tahun);

    if (!exist) {
      setFinance([
        ...finance,
        {
          year: data.year,
          beban: data.beban,
          omset: data.omset,
          profit: data.omset - data.beban,
        },
      ]);
    } else {
      finance[index] = {
        ...finance[index],
        omset: data.omset,
        beban: data.beban,
        profit: data.omset - data.beban,
      };
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <FormControl>
        <FormLabel>Tahun</FormLabel>
        <Input
          onChange={(e) => setData({ ...data, year: Number(e.target.value) })}
          bg="white"
          type="number"
          min="1900"
          max="2099"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Omset</FormLabel>
        <Input
          onChange={(e) => setData({ ...data, omset: Number(e.target.value) })}
          bg="white"
          type="number"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Beban Pengeluaran</FormLabel>
        <Input
          onChange={(e) => setData({ ...data, beban: Number(e.target.value) })}
          bg="white"
          type="number"
        />
      </FormControl>
      <Button
        onClick={() => {
          console.log(data);
          pushFinance(data.year);
        }}
        mt={5}
      >
        Input data
      </Button>
      <Button
        onClick={() => {
          setUmkm({ ...umkm, finance: finance });
        }}
      ></Button>
      <Button onClick={() => console.log(umkm)}></Button>
    </Box>
  );
}

export default Finance;
