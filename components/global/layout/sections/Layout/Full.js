import { Flex, Box } from "@chakra-ui/react";

import GlobalLayoutDesktop from "../Desktop";
import GlobalLayoutTablet from "../Tablet";

const GlobalLayoutFull = (props) => {
  return (
    <Flex
      justifyContent={"center"}
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
      <GlobalLayoutDesktop
        userData={props.userData}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <GlobalLayoutTablet
        userData={props.userData}
        display={{
          xxl: "none",
          xl: "none",
          lg: "flex",
          md: "flex",
          sm: "none",
          base: "none",
        }}
      />
      <Box align={"center"} w={"100%"} h={`100%`} overflow={"hidden"}>
        {props.children}
      </Box>
    </Flex>
  );
};

export default GlobalLayoutFull;
