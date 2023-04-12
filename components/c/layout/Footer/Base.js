import Link from "next/link";
import Image from "next/image";

import { Flex, Heading, Box, Button } from "@chakra-ui/react";

import { NavBar, BlackSocials, Extras } from "../../../items";

const LayoutFooterBase = (props) => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"85%"}
      gap={"30px"}
      display={props.display}
    >
      <Link href={"/"}>
        <Flex as={"button"}>
          <Heading fontWeight={"bold"} fontSize={"5xl"} color={"#000000"}>
            Dream&nbsp;
          </Heading>
          <Heading fontWeight={"light"} fontSize={"5xl"} color={"#000000"}>
            Mate
          </Heading>
        </Flex>
      </Link>

      <Flex w={"100%"} maxW={"500px"} justifyContent={"space-between"}>
        {NavBar.map((item, index) => (
          <Link key={index} href={item.link}>
            <Heading
              as={"button"}
              fontWeight={"light"}
              fontSize={"xl"}
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
      <Flex justifyContent={"center"} alignItems={"center"} gap={"75px"}>
        {BlackSocials.map((social, index) => (
          <Box key={index}>
            <Link href={social.link} target={"_blank"}>
              <Box as={"button"} borderRadius={"3px"}>
                <Image
                  src={social.src}
                  alt={social.alt}
                  width={50}
                  height={50}
                />
              </Box>
            </Link>
          </Box>
        ))}
      </Flex>

      <Flex gap={"35px"}>
        {Extras.map((item, index) => (
          <Link key={index} href={item.link}>
            <Button variant={"link"}>
              <Heading fontWeight={"light"} fontSize={"lg"}>
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
  );
};

export default LayoutFooterBase;
