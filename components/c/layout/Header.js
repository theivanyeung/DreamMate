import { Box } from "@chakra-ui/react";

import LayoutHeaderFull from "./Header/Full";
import LayoutHeaderBase from "./Header/Base";

const LayoutHeader = (props) => {
  return (
    <Box w={"100%"}>
      <LayoutHeaderFull
        page={props.page}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <LayoutHeaderBase
        page={props.page}
        display={{
          xxl: "none",
          xl: "none",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      />
    </Box>
  );
};

export default LayoutHeader;
