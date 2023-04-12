// FRONTEND IMPORTS

import { useContext, useEffect, useState, useRef } from "react";

import { Button, Flex } from "@chakra-ui/react";

import OptionsAccountPageUsernameFull from "./Username/Full";
import OptionsAccountPageUsernameBase from "./Username/Base";

import { UserContext } from "../../../../utils/context";

const OptionsAccountPageUsername = () => {
  const { user, username } = useContext(UserContext);

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      my={"20px"}
      w={"90%"}
    >
      {/* FULL VIEW */}
      <OptionsAccountPageUsernameFull
        user={user}
        username={username}
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

      <OptionsAccountPageUsernameBase
        user={user}
        username={username}
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

export default OptionsAccountPageUsername;
