import { Flex, Heading } from "@chakra-ui/react";

const HomeInformBase = (props) => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      w={"85%"}
      gap={"35px"}
      display={props.display}
    >
      <Heading
        w={"100%"}
        textAlign={"left"}
        fontWeight={"medium"}
        fontSize={"xl"}
      >
        What
      </Heading>
      <Heading
        textAlign={"left"}
        fontWeight={"normal"}
        fontSize={"xl"}
        letterSpacing={"0.05em"}
      >
        DreamMate is centered towards helping college students build startups by
        providing services to make finding the right co-founder and building
        your own team at your local college effortless.
      </Heading>
    </Flex>
  );
};

export default HomeInformBase;
