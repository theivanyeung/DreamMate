import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import { GetPagePath } from "../../../../functions";

import { Pages } from "../../../../items";

const GlobalLayoutMobileHeader = () => {
  const router = useRouter();

  const path = router.asPath;

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"100%"}
      h={"50px"}
      paddingX={"5%"}
      bgColor={"#0E0E0E"}
      boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.25)"}
    >
      <Flex as={"button"} onClick={() => router.push(path)}>
        <Image src={"/favicon/favicon.ico"} width={34} height={34} />
      </Flex>

      {Pages.map((item, index) => {
        return (
          GetPagePath(path) === item.link && (
            <Link key={index} href={item.link}>
              <Heading
                key={index}
                as={"button"}
                fontWeight={"medium"}
                fontSize={"2xl"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                {item.title}
              </Heading>
            </Link>
          )
        );
      })}

      <Button
        colorScheme={"whiteAlpha"}
        variant={"ghost"}
        onClick={() => router.push("/options/account")}
      >
        <Box w={"25px"} h={"25px"} overflow={"hidden"} borderRadius={"100px"}>
          <Image
            src={"/images/options-icon-white.png"}
            alt={"icon"}
            width={25}
            height={25}
          />
        </Box>
      </Button>
    </Flex>
  );
};

export default GlobalLayoutMobileHeader;
