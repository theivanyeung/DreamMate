// FRONTEND IMPORTS

import { useContext, useEffect, useState, useRef } from "react";

import { Button, Flex } from "@chakra-ui/react";

import OptionsAccountPagePasswordFull from "./Password/Full";
import OptionsAccountPagePasswordBase from "./Password/Base";

const OptionsAccountPagePassword = () => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      my={"20px"}
      w={"90%"}
    >
      {/* FULL VIEW */}

      <OptionsAccountPagePasswordFull
        display={{
          xxl: "block",
          xl: "block",
          lg: "block",
          md: "block",
          sm: "none",
          base: "none",
        }}
      />

      {/* BASE VIEW */}

      <OptionsAccountPagePasswordBase
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "block",
          base: "block",
        }}
      />
    </Flex>
  );
};

export default OptionsAccountPagePassword;
