import { Flex } from "@chakra-ui/react";

import OptionsSubscriptionPage from "../../../components/options/pages/SubscriptionPage";

const OptionsSubscriptions = () => {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      w={"100%"}
      h={"100%"}
      overflowX={"hidden"}
      overflowY={"auto"}
      paddingY={"50px"}
      sx={{
        "::-webkit-scrollbar": {
          width: "5px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#777777",
          borderRadius: "10px",
        },
      }}
    >
      <OptionsSubscriptionPage />
    </Flex>
  );
};

export default OptionsSubscriptions;

OptionsSubscriptions.getLayoutOptions = function PageLayout(page) {
  return <>{page}</>;
};
