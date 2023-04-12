import { Flex, Box } from "@chakra-ui/react";

import GlobalLayoutMobileHeader from "../Mobile/Header";
import GlobalLayoutMobileFooter from "../Mobile/Footer";

const GlobalLayoutBase = (props) => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100vw"}
      h={"100vh"}
      bgColor={"#151515"}
      overflowX={"hidden"}
      overflowY={"auto"}
      sx={{
        "::-webkit-scrollbar": {
          width: "5px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#455765",
          borderRadius: "10px",
        },
      }}
      display={props.display}
    >
      <GlobalLayoutMobileHeader />
      <Box
        align={"center"}
        w={"100%"}
        h={`calc(100% - 100px)`}
        overflow={"hidden"}
      >
        {props.children}
      </Box>
      <GlobalLayoutMobileFooter userData={props.userData} />
    </Flex>
  );
};

export default GlobalLayoutBase;
