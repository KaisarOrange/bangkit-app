import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import RadioCard from './Radio';
import uniqid from 'uniqid';

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

  useEffect(() => {
    console.log(finance);
    setUmkm({ ...umkm, finance: finance });
  }, [finance]);
  return (
    <Box display='flex' flexDirection='column' gap={1}>
      <FormControl>
        <FormLabel>Tahun</FormLabel>
        <Input
          onChange={(e) => setData({ ...data, year: Number(e.target.value) })}
          bg='white'
          type='number'
          min='1900'
          max='2099'
        />
      </FormControl>
      <FormControl>
        <FormLabel>Omset</FormLabel>
        <Input
          onChange={(e) => setData({ ...data, omset: Number(e.target.value) })}
          bg='white'
          type='number'
        />
      </FormControl>
      <FormControl>
        <FormLabel>Beban Pengeluaran</FormLabel>
        <Input
          onChange={(e) => setData({ ...data, beban: Number(e.target.value) })}
          bg='white'
          type='number'
        />
      </FormControl>
      <Button
        _hover={{ backgroundColor: 'gray.300' }}
        onClick={() => {
          console.log(data);
          pushFinance(data.year);
        }}
        mt={5}
      >
        Input data
      </Button>
      <Box
        mt={4}
        display='flex'
        gap={2}
        justifyContent='center'
        flexWrap='wrap'
      >
        {finance.map((e) => {
          return (
            <Text
              key={uniqid()}
              onClick={() => {}}
              bg='gray.300'
              p={2}
              px={3}
              rounded='md'
              userSelect='none'
            >
              {e.year}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
}

export default Finance;
