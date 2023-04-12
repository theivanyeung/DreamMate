import { Flex, Heading, Divider } from "@chakra-ui/react";

const HomeDescriptionFull = (props) => {
  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        h={"600px"}
        display={props.display}
      >
        <Flex alignItems={"flex-start"} w={"85%"} gap={"50px"}>
          <Heading
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"2xl"}
            w={"20%"}
          >
            {props.index === 0 && "Why"}
          </Heading>
          <Flex flexDirection={"column"} alignItems={"flex-start"} w={"80%"}>
            <Heading fontWeight={"light"} fontSize={"2xl"} color={"#ABABAB"}>
              0{props.index + 1}
            </Heading>
            <Heading
              textAlign={"left"}
              fontWeight={"medium"}
              fontSize={"7xl"}
              letterSpacing={"0.05em"}
            >
              {props.item.title}
            </Heading>
            <Heading
              mt={"50px"}
              padding={"50px"}
              textAlign={"left"}
              fontWeight={"normal"}
              fontSize={"2xl"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
              bgColor={"#151515"}
            >
              {props.item.description}
            </Heading>
          </Flex>
        </Flex>
      </Flex>
      {props.index !== 2 && <Divider />}
    </>
  );
};

export default HomeDescriptionFull;
