import { Radio, RadioGroup, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";

function RadioExample({
  setValue,
  value,
  optionOne,
  optionTwo,
  optionThree,
  title,
  option,
}) {
  return (
    <>
      <RadioGroup onChange={setValue} value={value}>
        <Text mb={2} fontWeight="semibold">
          {title}
        </Text>
        <Stack direction="row">
          <Radio bg="white" value={optionOne}>
            3 {option}
          </Radio>
          <Radio bg="white" value={optionTwo}>
            6 {option}
          </Radio>
          <Radio bg="white" value={optionThree}>
            12 {option}
          </Radio>
        </Stack>
      </RadioGroup>
      <Spacer m={5} />
    </>
  );
}

export default RadioExample;
