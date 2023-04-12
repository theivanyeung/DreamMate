import Link from "next/link";
import Image from "next/image";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import { WhiteSocials } from "../components/items";

const NotFoundPage = () => {
  return (
    <Box
      align={"center"}
      w={"100vw"}
      h={"100vh"}
      bgColor={"#151515"}
      overflowX={"hidden"}
      overflowY={"scroll"}
      sx={{
        "::-webkit-scrollbar": {
          width: "5px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#FFFFFF",
          borderRadius: "10px",
        },
      }}
    >
      <Box w={"100%"} h={"850px"}>
        <Link href={"/"}>
          <Box mt={"25px"} w={"50px"} h={"50px"}>
            <Image
              src={"/favicon/favicon.ico"}
              alt={"DreamMate logo"}
              width={50}
              height={50}
            />
          </Box>

          <Flex as={"button"} mt={"25px"}>
            <Heading fontWeight={"bold"} fontSize={"5xl"} color={"#FFFFFF"}>
              Dream&nbsp;
            </Heading>
            <Heading fontWeight={"light"} fontSize={"5xl"} color={"#FFFFFF"}>
              Mate
            </Heading>
          </Flex>
        </Link>

        <Heading
          mt={"150px"}
          maxW={"80%"}
          fontWeight={"normal"}
          fontSize={"5xl"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          This page doesn&apos;t exist yet
        </Heading>

        <Link href={"/"}>
          <Button
            mt={"50px"}
            w={"350px"}
            h={"50px"}
            colorScheme={"blackAlpha"}
            boxShadow={
              "0px 0px 25px rgba(158, 203, 239, 0.5), inset 0px 0px 25px rgba(158, 203, 239, 0.5)"
            }
            border={"5px solid #FFFFFF"}
            borderRadius={"24px"}
            _hover={{
              boxShadow:
                "0px 0px 25px rgba(158, 203, 239, 0.75), inset 0px 0px 25px rgba(158, 203, 239, 0.75)",
            }}
          >
            <Heading
              fontWeight={"normal"}
              fontSize={"lg"}
              letterSpacing={"0.1em"}
              color={"#FFFFFF"}
            >
              ← Go back
            </Heading>
          </Button>
        </Link>

        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          mt={"100px"}
          w={"450px"}
          maxW={"80%"}
          gap={"50px"}
        >
          <Heading
            fontWeight={"normal"}
            fontSize={"2xl"}
            letterSpacing={"0.05em"}
            color={"#FFFFFF"}
          >
            While you&apos;re here, join our community!
          </Heading>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"200px"}
            gap={"50px"}
          >
            {WhiteSocials.map((social, index) => (
              <Box
                key={index}
                w={"100%"}
                _hover={{
                  filter: "drop-shadow(0px 0px 5px rgba(158, 203, 239, 0.5))",
                }}
              >
                <Link key={index} href={social.link} target={"_blank"}>
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    w={"100%"}
                  >
                    <Image
                      src={social.src}
                      alt={social.alt}
                      width={50}
                      height={50}
                    />
                    <Heading
                      w={"125px"}
                      fontWeight={"medium"}
                      fontSize={"3xl"}
                      letterSpacing={"0.05em"}
                      color={"#FFFFFF"}
                    >
                      {social.title}
                    </Heading>
                  </Flex>
                </Link>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default NotFoundPage;

NotFoundPage.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
