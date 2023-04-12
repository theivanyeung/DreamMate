import { Box, Flex, Heading, Input, Button } from "@chakra-ui/react";

const RegisterLayoutFooter = (props) => {
  return (
    <Flex
      mb={"100px"}
      h={"75px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {props.register ? (
        <Button
          variant={"link"}
          color={"#000000"}
          onClick={() => props.chooseRegisterHandler(false)}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"xl"}
            letterSpacing={"0.05em"}
          >
            Already have an account?
          </Heading>
        </Button>
      ) : (
        <Button
          variant={"link"}
          color={"#000000"}
          onClick={() => props.chooseRegisterHandler(true)}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"xl"}
            letterSpacing={"0.05em"}
          >
            Create an account!
          </Heading>
        </Button>
      )}
    </Flex>
  );
};

export default RegisterLayoutFooter;
