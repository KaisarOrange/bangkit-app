import {
  Box,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import camera from '../../img/camera.png';
function InfoUmkm({ umkm, setUmkm, setFile, file, umkmImage }) {
  return (
    <Stack justifyContent='center' m='auto' alignItems='center'>
      <FormControl isRequired>
        <InputGroup>
          <Input
            onChange={(event) => {
              setUmkm({ ...umkm, name: event.target.value });
            }}
            bg='white'
            type='text'
            placeholder='Nama UMKM'
            value={umkm.name}
          />
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <InputGroup>
          <Textarea
            rounded='md'
            value={umkm.deskripsi}
            onChange={(event) => {
              setUmkm({ ...umkm, deskripsi: event.target.value });
            }}
            placeholder='Deskripsi UMKM'
            size='sm'
            bg='white'
          />
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <InputGroup>
          <Input
            rounded='md'
            type='number'
            onChange={(event) => {
              setUmkm({ ...umkm, danaNeeded: event.target.valueAsNumber });
            }}
            placeholder='Jumlah dana yang dibutuhkan'
            value={umkm.danaNeeded}
            size='sm'
            bg='white'
          />
        </InputGroup>
      </FormControl>

      <FormLabel textAlign='center' cursor='pointer'>
        <Box
          overflow='hidden'
          m={1}
          h={150}
          w={288}
          border='1px'
          rounded='md'
          borderColor='black'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          {file ? (
            <Image src={umkmImage} />
          ) : (
            <Image w='3rem' h='3rem' src={camera} />
          )}
        </Box>
        <FormControl>
          <InputGroup>
            <Input
              display='none'
              type='file'
              id='file'
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
              placeholder='Deskripsi UMKM'
              size='sm'
              bg='transparent'
            />
          </InputGroup>
        </FormControl>
      </FormLabel>
    </Stack>
  );
}

export default InfoUmkm;
