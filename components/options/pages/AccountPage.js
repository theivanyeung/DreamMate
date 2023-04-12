import { Flex } from "@chakra-ui/react";

import OptionsAccountPageUsername from "./AccountPage/Username";
import OptionsAccountPageEmail from "./AccountPage/Email";
import OptionsAccountPagePassword from "./AccountPage/Password";

const OptionsAccountPage = () => {
  return (
    <>
      {/* FULL VIEW */}

      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"#292929"}
        borderRadius={"12px"}
        w={"700px"}
        display={{
          xxl: "block",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      >
        <OptionsAccountPageUsername />
        <OptionsAccountPageEmail />
        <OptionsAccountPagePassword />
      </Flex>

      {/* BASE VIEW */}

      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"#292929"}
        borderRadius={"12px"}
        w={"95%"}
        display={{
          xxl: "none",
          xl: "block",
          lg: "block",
          md: "block",
          sm: "block",
          base: "block",
        }}
      >
        <OptionsAccountPageUsername />
        <OptionsAccountPageEmail />
        <OptionsAccountPagePassword />
      </Flex>
    </>
  );
};

export default OptionsAccountPage;
