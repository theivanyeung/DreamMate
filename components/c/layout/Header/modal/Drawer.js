import Link from "next/link";

import { Flex, Heading, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { NavBar } from "../../../../items";

const LayoutHeaderDrawer = (props) => {
  return (
    <>
      <Flex justifyContent={"center"} alignItems={"center"} h={"150px"}>
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"85%"}>
          <Link href={"/"}>
            <Flex as={"button"}>
              <Heading fontWeight={"medium"} fontSize={"5xl"}>
                Dream&nbsp;
              </Heading>
              <Heading fontWeight={"light"} fontSize={"5xl"}>
                Mate
              </Heading>
            </Flex>
          </Link>

          <Button onClick={props.onClose}>
            <CloseIcon />
          </Button>
        </Flex>
      </Flex>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Flex flexDirection={"column"} gap={"25px"} w={"85%"}>
          {NavBar.map((item, index) => (
            <Link key={index} href={item.link}>
              {item.title !== "Demo 🔥" ? (
                <Heading
                  fontWeight={"medium"}
                  fontSize={"3xl"}
                  letterSpacing={"0.05em"}
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
    </>
  );
};

export default LayoutHeaderDrawer;
