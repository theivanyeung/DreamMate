import { Box } from "@chakra-ui/react";

import HomeDescriptionFull from "./Description/Full";
import HomeDescriptionBase from "./Description/Base";

import { Descriptions } from "../../items";

const HomeDescription = () => {
  return (
    <>
      {Descriptions.map((item, index) => (
        <Box key={index}>
          <HomeDescriptionFull
            item={item}
            index={index}
            display={{
              xxl: "flex",
              xl: "flex",
              lg: "none",
              md: "none",
              sm: "none",
              base: "none",
            }}
          />
          <HomeDescriptionBase
            item={item}
            index={index}
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
      ))}
    </>
  );
};

export default HomeDescription;
