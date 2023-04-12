import { Flex, Heading } from "@chakra-ui/react";

const HomeInformFull = (props) => {
  return (
    <Flex
      alignItems={"flex-start"}
      w={"85%"}
      gap={"50px"}
      display={props.display}
    >
      <Heading
        textAlign={"left"}
        fontWeight={"medium"}
        fontSize={"2xl"}
        w={"20%"}
      >
        What
      </Heading>
      <Heading
        w={"80%"}
        textAlign={"left"}
        fontWeight={"normal"}
        fontSize={"2xl"}
        letterSpacing={"0.05em"}
      >
        DreamMate is centered towards helping college students build startups by
        providing services to make finding the right co-founder and building
        your own team at your local college effortless.
      </Heading>
    </Flex>
  );
};

export default HomeInformFull;
