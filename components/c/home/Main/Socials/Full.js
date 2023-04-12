import Image from "next/image";
import Link from "next/link";

import { Flex, Box, Heading } from "@chakra-ui/react";

import { WhiteSocials } from "../../../../items";

const HomeMainSocialsFull = (props) => {
  return (
    <Flex
      justifyContent={"flex-end"}
      alignItems={"center"}
      w={"85%"}
      h={"200px"}
      display={props.display}
    >
      <Flex flexDirection={"column"} w={"700px"} gap={"15px"}>
        <Box w={"100%"} h={"5px"} bgColor={"#FFFFFF"} />
        <Flex justifyContent={"space-between"} w={"95%"}>
          <Heading fontWeight={"light"} fontSize={"2xl"} color={"#FFFFFF"}>
            Join our community →
          </Heading>
          <Flex gap={"50px"}>
            {WhiteSocials.map((social, index) => (
              <Link key={index} href={social.link} target={"_blank"}>
                <Box
                  as={"button"}
                  borderRadius={"3px"}
                  _hover={{
                    filter: "drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.5))",
                  }}
                >
                  <Image
                    src={social.src}
                    alt={social.alt}
                    width={30}
                    height={30}
                  />
                </Box>
              </Link>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomeMainSocialsFull;
