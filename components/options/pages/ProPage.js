import { Flex, Heading, Button } from "@chakra-ui/react";
import OptionsProPagePerks from "./ProPage/Perks";
import OptionsProPageSubscribe from "./ProPage/Subscribe";

const OptionsProPage = (props) => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"50px"}
      w={"90%"}
    >
      <OptionsProPageSubscribe
        subscription={props.subscription}
        submitProHandler={props.submitProHandler}
        handleClick={props.handleClick}
      />
      <OptionsProPagePerks />
    </Flex>
  );
};

export default OptionsProPage;
