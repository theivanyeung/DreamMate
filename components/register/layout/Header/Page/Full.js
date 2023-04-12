import { Flex, Heading, Box } from "@chakra-ui/react";

const RegisterLayoutHeaderPageFull = (props) => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={"75px"}
      w={"300px"}
      h={"40px"}
      display={props.display}
    >
      <Flex
        as={"button"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={"25px"}
        onClick={() => props.chooseRegisterHandler(true)}
      >
        <Box
          w={"2px"}
          h={"40px"}
          bgColor={props.register ? "#000000" : "#FFFFFF"}
        />
        <Heading
          fontWeight={"medium"}
          fontSize={"3xl"}
          letterSpacing={"0.05em"}
        >
          Register
        </Heading>
      </Flex>
      <Flex
        as={"button"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={"25px"}
        onClick={() => props.chooseRegisterHandler(false)}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"3xl"}
          letterSpacing={"0.05em"}
        >
          Login
        </Heading>
        <Box
          w={"2px"}
          h={"40px"}
          bgColor={props.register ? "#FFFFFF" : "#000000"}
        />
      </Flex>
    </Flex>
  );
};

export default RegisterLayoutHeaderPageFull;
