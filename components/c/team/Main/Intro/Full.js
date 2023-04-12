import { Flex, Heading, Box } from "@chakra-ui/react";

const TeamMainIntroFull = (props) => {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"flex-start"}
      w={"85%"}
      gap={"25px"}
      display={props.display}
    >
      <Heading
        mt={props.index === 0 ? "10%" : "20%"}
        fontWeight={"light"}
        fontSize={"lg"}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
      >
        {props.member.title}
      </Heading>
      <Heading
        fontWeight={"medium"}
        fontSize={"7xl"}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
      >
        {props.member.name}
      </Heading>
      <Box mt={"50px"} w={"200px"} h={"3px"} bgColor={"#FFFFFF"} />
    </Flex>
  );
};

export default TeamMainIntroFull;
