import { Flex } from "@chakra-ui/react";

import LayoutFooterFull from "./Footer/Full";
import LayoutFooterBase from "./Footer/Base";

const LayoutFooter = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      h={"400px"}
      bgColor={"#EEEEEE"}
    >
      <LayoutFooterFull
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <LayoutFooterBase
        display={{
          xxl: "none",
          xl: "none",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      />
    </Flex>
  );
};

export default LayoutFooter;
