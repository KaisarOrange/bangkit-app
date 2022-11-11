import { Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React from "react";

function RadioExample() {
  const [value, setValue] = React.useState("1");
  return (
    <RadioGroup onChange={setValue} value={value}>
      <Text>Jatuh tempo per</Text>
      <Stack direction="row">
        <Radio bg="white" value="1">
          3 Bulan
        </Radio>
        <Radio bg="white" value="2">
          6 Bulan
        </Radio>
        <Radio bg="white" value="3">
          12 Bulan
        </Radio>
      </Stack>
    </RadioGroup>
  );
}

export default RadioExample;
