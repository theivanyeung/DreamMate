import { Flex } from "@chakra-ui/react";

import HomeInformFull from "./Inform/Full";
import HomeInformBase from "./Inform/Base";

const HomeInform = () => {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} h={"300px"}>
      <HomeInformFull
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <HomeInformBase
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

export default HomeInform;
