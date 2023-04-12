import { useState } from "react";

import { Flex, Box, Heading, Button } from "@chakra-ui/react";

import OptionsAccountPageModalEmailVerifyCode from "./VerifyCode";

const OptionsAccountPageModalEmailSendCode = () => {
  const [modal, setModal] = useState(false);

  const clickHandler = () => {
    setModal(true);
  };

  return (
    <>
      {modal === false ? (
        <Flex justifyContent={"center"} h={"325px"}>
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
              my={"20px"}
              w={"95%"}
              fontWeight={"medium"}
              fontSize={"lg"}
              lineHeight={"27px"}
              letterSpacing={"0.1em"}
              color={"#C9C9C9"}
            >
              To update your email address, we’ll need to verify your old email,
              nuurpenguin@gmail.com in order to change it.
            </Heading>

            <Box mt={"50px"} w={"100%"}>
              <Button
                w={"80%"}
                bgColor={"#000000"}
                borderRadius={"12px"}
                colorScheme={"whiteAlpha"}
                onClick={clickHandler}
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"md"}
                  letterSpacing={"0.05em"}
                  color={"#FFFFFF"}
                >
                  Send Verification Code
                </Heading>
              </Button>
            </Box>

            <Box mt={"25px"}>
              <Button variant={"link"} borderRadius={"12px"}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Flex>
      ) : (
        <OptionsAccountPageModalEmailVerifyCode />
      )}
    </>
  );
};

export default OptionsAccountPageModalEmailSendCode;
