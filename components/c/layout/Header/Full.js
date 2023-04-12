import Link from "next/link";

import { Box, Flex, Heading, Button } from "@chakra-ui/react";

import { NavBar } from "../../../items";

const LayoutHeaderFull = (props) => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h={"150px"}
      display={props.display}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"85%"}>
        <Link href={"/"}>
          <Flex as={"button"}>
            <Heading fontWeight={"medium"} fontSize={"5xl"} color={"#FFFFFF"}>
              Dream&nbsp;
            </Heading>
            <Heading fontWeight={"light"} fontSize={"5xl"} color={"#FFFFFF"}>
              Mate
            </Heading>
          </Flex>
        </Link>
        <Flex gap={"50px"}>
          {NavBar.map((item, index) => (
            <Link key={index} href={item.link}>
              {item.title !== "Demo 🔥" ? (
                <Heading
                  as={"button"}
                  fontWeight={"light"}
                  fontSize={"3xl"}
                  color={item.title === props.page ? "#FFFFFF" : "#C4C4C4"}
                  letterSpacing={"0.05em"}
                  _hover={{
                    color: "#FFFFFF",
                    textDecoration: "underline",
                  }}
                >
                  {item.title}
                </Heading>
              ) : (
                <Button
                  bgColor={"#000000"}
                  boxShadow={"0px 0px 10px rgba(158, 203, 239, 0.5)"}
                  borderRadius={"12px"}
                  _hover={{
                    boxShadow:
                      "0px 0px 10px rgba(158, 203, 239, 0.75), inset 0px 0px 10px rgba(158, 203, 239, 0.5)",
                  }}
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"3xl"}
                    letterSpacing={"0.05em"}
                    color={"#FFFFFF"}
                  >
                    {item.title}
                  </Heading>
                </Button>
              )}
            </Link>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LayoutHeaderFull;
