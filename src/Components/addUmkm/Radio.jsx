import { Radio, RadioGroup, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";

function RadioExample({ setValue, value, value2, setValue2 }) {
  return (
    <>
      <RadioGroup onChange={setValue} value={value}>
        <Text mb={2} fontWeight="semibold">
          Lama angsuran
        </Text>
        <Stack direction="row">
          <Radio bg="white" value="3">
            3 Bulan
          </Radio>
          <Radio bg="white" value="6">
            6 Bulan
          </Radio>
          <Radio bg="white" value="12">
            12 Bulan
          </Radio>
        </Stack>
      </RadioGroup>
      <Spacer m={5} />
      <RadioGroup
        onChange={(e) => {
          setValue2(e);
        }}
        value={value2}
      >
        <Text mb={2} fontWeight="semibold">
          Bunga
        </Text>
        <Stack direction="row">
          <Radio bg="white" value="3">
            3%
          </Radio>
          <Radio bg="white" value="6">
            6%
          </Radio>
          <Radio bg="white" value="12">
            12%
          </Radio>
        </Stack>
      </RadioGroup>
    </>
  );
}

export default RadioExample;
