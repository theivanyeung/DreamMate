import { Box, Flex, Heading } from "@chakra-ui/react";

import Link from "next/link";

import SEO from "../../../components/SEO";
import LayoutHeader from "../../../components/c/layout/Header";
import LayoutFooter from "../../../components/c/layout/Footer";

import {
  PRIVACY_SEO_TITLE,
  PRIVACY_SEO_DESCRIPTION,
  PRIVACY_SEO_KEYWORDS,
  PRIVACY_SEO_IMAGE,
  PRIVACY_PRODUCTION_URL,
} from "../../../components/constants";

import { PrivacyPolicy } from "../../../components/items";

const Privacy = () => {
  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      overflowX={"hidden"}
      overflowY={"scroll"}
      sx={{
        "::-webkit-scrollbar": {
          width: "5px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#455765",
          borderRadius: "10px",
        },
      }}
    >
      <SEO
        title={PRIVACY_SEO_TITLE}
        description={PRIVACY_SEO_DESCRIPTION}
        keywords={PRIVACY_SEO_KEYWORDS}
        image={PRIVACY_SEO_IMAGE}
        url={PRIVACY_PRODUCTION_URL}
      />
      <Box align={"center"} bgColor={"#151515"} overflow={"hidden"}>
        <LayoutHeader />
        <Flex
          flexDirection={"column"}
          gap={"50px"}
          w={"1000px"}
          maxW={"85%"}
          mt={"50px"}
          mb={"250px"}
        >
          {PrivacyPolicy.map((item, index) => (
            <Flex key={index} flexDirection={"column"} gap={"25px"}>
              {index === 0 ? (
                <>
                  <Heading
                    my={"10px"}
                    fontWeight={"medium"}
                    fontSize={"5xl"}
                    color={"#FFFFFF"}
                    letterSpacing={"0.05em"}
                  >
                    {item.title}
                  </Heading>
                  <Heading
                    mb={"50px"}
                    textAlign={"left"}
                    fontWeight={"normal"}
                    fontSize={"xl"}
                    color={"#FFFFFF"}
                    letterSpacing={"0.05em"}
                  >
                    {item.info}
                  </Heading>
                </>
              ) : (
                <>
                  <Heading
                    textAlign={"left"}
                    fontWeight={"medium"}
                    fontSize={"3xl"}
                    color={"#FFFFFF"}
                    letterSpacing={"0.05em"}
                  >
                    {item.title}
                  </Heading>
                  <Heading
                    textAlign={"left"}
                    fontWeight={"light"}
                    fontSize={"lg"}
                    color={"#FFFFFF"}
                    letterSpacing={"0.05em"}
                  >
                    {item.info}
                  </Heading>
                  {item.link && (
                    <Link href={item.link}>
                      <Heading
                        textAlign={"left"}
                        fontWeight={"light"}
                        fontSize={"lg"}
                        color={"#FFFFFF"}
                        letterSpacing={"0.05em"}
                      >
                        {item.link}
                      </Heading>
                    </Link>
                  )}
                  {item.secondInfo && (
                    <Heading
                      textAlign={"left"}
                      fontWeight={"light"}
                      fontSize={"lg"}
                      color={"#FFFFFF"}
                      letterSpacing={"0.05em"}
                    >
                      {item.secondInfo}
                    </Heading>
                  )}
                  {item.thirdInfo && (
                    <Heading
                      textAlign={"left"}
                      fontWeight={"light"}
                      fontSize={"lg"}
                      color={"#FFFFFF"}
                      letterSpacing={"0.05em"}
                    >
                      {item.thirdInfo}
                    </Heading>
                  )}
                </>
              )}
            </Flex>
          ))}
        </Flex>
        <LayoutFooter />
      </Box>
    </Box>
  );
};

export default Privacy;

Privacy.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
