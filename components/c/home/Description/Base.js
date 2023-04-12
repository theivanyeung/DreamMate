import { Flex, Heading, Divider } from "@chakra-ui/react";

const HomeDescriptionBase = (props) => {
  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        h={"600px"}
        display={props.display}
      >
        <Flex flexDirection={"column"} alignItems={"flex-start"} w={"85%"}>
          <Heading
            w={"100%"}
            mb={"20px"}
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"xl"}
          >
            {props.index === 0 && "Why"}
          </Heading>

          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"2xl"}
            w={"100%"}
            color={"#ABABAB"}
          >
            0{props.index + 1}
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"4xl"}
            letterSpacing={"0.05em"}
          >
            {props.item.title}
          </Heading>
          <Heading
            mt={"20px"}
            padding={"50px"}
            textAlign={"left"}
            fontWeight={"normal"}
            fontSize={"xl"}
            letterSpacing={"0.05em"}
            color={"#FFFFFF"}
            bgColor={"#151515"}
          >
            {props.item.description}
          </Heading>
        </Flex>
      </Flex>
      {props.index !== 2 && <Divider />}
    </>
  );
};

export default HomeDescriptionBase;
