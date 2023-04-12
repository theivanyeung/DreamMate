import { useState } from "react";

import { Flex, Box, Heading, Button, Input } from "@chakra-ui/react";

import OptionsAccountPageModalEmailChangeEmail from "./ChangeEmail";

const OptionsAccountPageModalEmailVerifyCode = () => {
  const [modal, setModal] = useState(false);

  const clickHandler = () => {
    setModal(true);
  };

  return (
    <>
      {modal === false ? (
        <Flex justifyContent={"center"} h={"265px"}>
          <Box align={"center"} w={"90%"}>
            <Flex alignItems={"center"} h={"50px"}>
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                lineHeight={"20px"}
                letterSpacing={"0.1em"}
                color={"#FFFFFF"}
              >
                Change Email
              </Heading>
            </Flex>

            <Heading
              fontWeight={"medium"}
              fontSize={"xs"}
              lineHeight={"17px"}
              letterSpacing={"0.1em"}
              color={"#C9C9C9"}
            >
              A verification code was sent to your email.
            </Heading>

            <Flex
              flexDirection={"column"}
              alignItems={"flex-start"}
              gap={"10px"}
              my={"25px"}
            >
              <Heading
                ml={"20px"}
                fontWeight={"medium"}
                fontSize={"md"}
                lineHeight={"24px"}
                letterSpacing={"0.1em"}
                color={"#C9C9C9"}
              >
                Verification Code
              </Heading>
              <Input borderRadius={"8px"} color={"#FFFFFF"} />
            </Flex>

            <Box align={"right"} w={"90%"}>
              <Button
                background={"#FFD39F"}
                borderRadius={"12px"}
                bgColor={"#000000"}
                colorScheme={"whiteAlpha"}
                onClick={clickHandler}
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"md"}
                  letterSpacing={"0.05em"}
                  color={"#FFFFFF"}
                >
                  Next
                </Heading>
              </Button>
            </Box>
          </Box>
        </Flex>
      ) : (
        <OptionsAccountPageModalEmailChangeEmail />
      )}
    </>
  );
};

export default OptionsAccountPageModalEmailVerifyCode;
