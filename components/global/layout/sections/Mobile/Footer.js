import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Box, Button, Flex, SkeletonCircle } from "@chakra-ui/react";

import { Pages } from "../../../../items";
import { GetPagePath } from "../../../../functions";

const GlobalLayoutMobileFooter = (props) => {
  const { userData } = props;

  const router = useRouter();
  const path = router.asPath;

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"100%"}
      h={"50px"}
      paddingX={"10%"}
      bgColor={"#0E0E0E"}
      boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.25)"}
    >
      {Pages.map((item, index) => (
        <Box key={index}>
          {GetPagePath(path) === item.link ? (
            <Button
              w={"75px"}
              bgColor={"#FFFFFF"}
              onClick={() => router.push(item.link)}
            >
              <Image
                src={item.iconSelected}
                alt={"icon"}
                width={25}
                height={25}
              />
            </Button>
          ) : (
            <Button
              colorScheme={"whiteAlpha"}
              variant={"ghost"}
              w={"75px"}
              onClick={() => router.push(item.link)}
            >
              <Image src={item.icon} alt={"icon"} width={25} height={25} />
            </Button>
          )}
        </Box>
      ))}
      <Button
        colorScheme={"whiteAlpha"}
        variant={"ghost"}
        w={"75px"}
        onClick={() => userData && router.push(`/${userData.username}`)}
      >
        <Box w={"30px"} h={"30px"} overflow={"hidden"} borderRadius={"100px"}>
          {userData ? (
            <Image
              src={userData.photoURL}
              alt={"profile photo"}
              width={30}
              height={30}
            />
          ) : (
            <SkeletonCircle
              startColor={"#151515"}
              endColor={"#2B2B2B"}
              size={"30"}
            />
          )}
        </Box>
      </Button>
    </Flex>
  );
};

export default GlobalLayoutMobileFooter;
