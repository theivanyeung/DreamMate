import { Box, Heading } from "@chakra-ui/react";

import SEO from "../../../components/SEO";
import LayoutHeader from "../../../components/c/layout/Header";
import LayoutFooter from "../../../components/c/layout/Footer";

import {
  CAREERS_SEO_TITLE,
  CAREERS_SEO_DESCRIPTION,
  CAREERS_SEO_KEYWORDS,
  CAREERS_PRODUCTION_URL,
  CAREERS_SEO_IMAGE,
} from "../../../components/constants";

const Career = () => {
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
        title={CAREERS_SEO_TITLE}
        description={CAREERS_SEO_DESCRIPTION}
        keywords={CAREERS_SEO_KEYWORDS}
        image={CAREERS_SEO_IMAGE}
        url={CAREERS_PRODUCTION_URL}
      />
      <Box overflow={"hidden"}>
        <Box bgColor={"#151515"}>
          <LayoutHeader page={"Careers"} />
        </Box>
        <Box
          w={"100vw"}
          h={"75vh"}
          minH={"300px"}
          align={"center"}
          bgColor={"#151515"}
        >
          <Heading
            w={"80%"}
            textAlign={"center"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            ✨ Future job openings will be posted here. If you are really
            interested in becoming part of the team, contact us through our
            webpage form!
          </Heading>
        </Box>
        <LayoutFooter />
      </Box>
    </Box>
  );
};

export default Career;

Career.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
