import { Flex } from "@chakra-ui/react";

import OptionsAccountPage from "../../../components/options/pages/AccountPage";

const OptionsAccount = () => {
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
      <OptionsAccountPage />
    </Flex>
  );
};

export default OptionsAccount;

OptionsAccount.getLayoutOptions = function PageLayout(page) {
  return <>{page}</>;
};
