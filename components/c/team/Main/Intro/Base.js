import { Flex, Heading, Box } from "@chakra-ui/react";

const TeamMainIntroBase = (props) => {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"flex-start"}
      w={"85%"}
      gap={"25px"}
      display={props.display}
    >
      <Heading
        mt={props.index === 0 ? "10%" : "30%"}
        fontWeight={"light"}
        fontSize={"md"}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
      >
        {props.member.title}
      </Heading>
      <Heading
        fontWeight={"medium"}
        fontSize={"4xl"}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
      >
        {props.member.name}
      </Heading>
      <Box mt={"25px"} w={"200px"} h={"3px"} bgColor={"#FFFFFF"} />
    </Flex>
  );
};

export default TeamMainIntroBase;
