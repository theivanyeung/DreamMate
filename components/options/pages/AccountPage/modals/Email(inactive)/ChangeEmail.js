import { Flex, Box, Heading, Button, Input } from "@chakra-ui/react";

const OptionsAccountPageModalEmailChangeEmail = () => {
  return (
    <Flex justifyContent={"center"} h={"350px"}>
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
          To change your email, enter a new email and your current password.
        </Heading>

        <Box align={"left"} my={"25px"}>
          <Heading
            ml={"20px"}
            mb={"5px"}
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"24px"}
            letterSpacing={"0.1em"}
            color={"#C9C9C9"}
          >
            New Email
          </Heading>
          <Input borderRadius={"8px"} color={"#FFFFFF"} />
        </Box>

        <Box align={"left"} my={"25px"}>
          <Heading
            ml={"20px"}
            mb={"5px"}
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"24px"}
            letterSpacing={"0.1em"}
            color={"#C9C9C9"}
          >
            Current Password
          </Heading>
          <Input borderRadius={"8px"} color={"#FFFFFF"} />
        </Box>

        <Box align={"right"} w={"90%"}>
          <Button
            background={"#FFD39F"}
            borderRadius={"12px"}
            colorScheme={"whiteAlpha"}
            bgColor={"#000000"}
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
  );
};

export default OptionsAccountPageModalEmailChangeEmail;
