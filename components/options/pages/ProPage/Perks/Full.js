import { Flex, Heading } from "@chakra-ui/react";

import { Perks } from "../../../../items";

const OptionsProPagePerksFull = (props) => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"700px"}
      display={props.display}
    >
      <Heading
        fontWeight={"medium"}
        fontSize={"3xl"}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
      >
        Perks
      </Heading>
      <Flex justify={"center"} flexWrap={"wrap"} gap={"8%"}>
        {Perks.map((item, index) => (
          <Flex
            key={index}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            my={"5%"}
            padding={"3%"}
            gap={"10px"}
            w={"46%"}
            borderRadius={"12px"}
            boxShadow={" 0px 0px 5px rgba(255, 241, 159, 0.25)"}
            bgColor={"#000000"}
          >
            <Heading fontSize={"5xl"}>{item.icon}</Heading>
            <Heading
              fontWeight={"medium"}
              fontSize={"2xl"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              {item.title}
            </Heading>
            <Heading
              fontWeight={"normal"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
              color={"#C9CACB"}
            >
              {item.description}
            </Heading>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default OptionsProPagePerksFull;
