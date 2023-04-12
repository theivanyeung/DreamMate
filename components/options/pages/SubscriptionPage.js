import { Flex } from "@chakra-ui/react";

import OptionsSubscriptionPageManage from "./Subscriptions/Manage";

const OptionsSubscriptionPage = () => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"50px"}
      w={"90%"}
    >
      {/** FULL VIEW */}

      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        w={"700px"}
        gap={"25px"}
        display={{
          xxl: "flex",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      >
        <OptionsSubscriptionPageManage />
      </Flex>

      {/** BASE VIEW */}

      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        w={"90%"}
        gap={"25px"}
        display={{
          xxl: "none",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      >
        <OptionsSubscriptionPageManage />
      </Flex>
    </Flex>
  );
};

export default OptionsSubscriptionPage;
