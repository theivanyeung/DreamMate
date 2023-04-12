import Link from "next/link";
import Image from "next/image";

import { Flex, Heading, Box, Button } from "@chakra-ui/react";

import { NavBar, BlackSocials, Extras } from "../../../items";

const LayoutFooterFull = (props) => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"85%"}
      display={props.display}
    >
      <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"15px"}>
        <Link href={"/"}>
          <Flex as={"button"}>
            <Heading fontWeight={"bold"} fontSize={"5xl"}>
              Dream&nbsp;
            </Heading>
            <Heading fontWeight={"light"} fontSize={"5xl"}>
              Mate
            </Heading>
          </Flex>
        </Link>
        <Flex gap={"50px"}>
          {Extras.map((item, index) => (
            <Link key={index} href={item.link}>
              <Button variant={"link"}>
                <Heading fontWeight={"light"} fontSize={"md"}>
                  {item.title}
                </Heading>
              </Button>
            </Link>
          ))}
        </Flex>
        <Heading fontWeight={"light"} fontSize={"md"} color={"#999999"}>
          &copy; {new Date().getFullYear()} DreamMate. All Rights Reserved.
        </Heading>
      </Flex>
      <Flex flexDirection={"column"} alignItems={"center"} gap={"50px"}>
        <Flex gap={"50px"}>
          {NavBar.map((item, index) => (
            <Link key={index} href={item.link}>
              <Heading
                as={"button"}
                fontWeight={"light"}
                fontSize={"3xl"}
                color={"#999999"}
                letterSpacing={"0.05em"}
                textDecoration={"underline"}
                _hover={{
                  color: "#000000",
                }}
              >
                {item.title}
              </Heading>
            </Link>
          ))}
        </Flex>
        <Flex gap={"75px"}>
          {BlackSocials.map((social, index) => (
            <Box key={index}>
              <Link href={social.link} target={"_blank"}>
                <Box as={"button"} borderRadius={"3px"}>
                  <Image
                    src={social.src}
                    alt={social.alt}
                    width={30}
                    height={30}
                  />
                </Box>
              </Link>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LayoutFooterFull;
