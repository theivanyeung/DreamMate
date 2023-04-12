import { Flex, Heading, Box, Button } from "@chakra-ui/react";

const RegisterLayoutHeaderPageBase = (props) => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"300px"}
      h={"40px"}
      display={props.display}
    >
      <Button
        w={"45%"}
        gap={"25px"}
        bgColor={props.register ? "#151515" : "#EDF2F7"}
        onClick={() => props.chooseRegisterHandler(true)}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"3xl"}
          letterSpacing={"0.05em"}
          color={props.register ? "#FEFEFE" : "#151515"}
        >
          Register
        </Heading>
      </Button>
      <Button
        w={"45%"}
        gap={"25px"}
        bgColor={props.register ? "#EDF2F7" : "#151515"}
        onClick={() => props.chooseRegisterHandler(false)}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"3xl"}
          letterSpacing={"0.05em"}
          color={props.register ? "#151515" : "#FEFEFE"}
        >
          Login
        </Heading>
      </Button>
    </Flex>
  );
};

export default RegisterLayoutHeaderPageBase;
