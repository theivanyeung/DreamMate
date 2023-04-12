import { Flex, Heading, Button } from "@chakra-ui/react";
import OptionsProPageSubscribeFull from "./Subscribe/Full";
import OptionsProPageSubscribeBase from "./Subscribe/Base";

const OptionsProPageSubscribe = (props) => {
  return (
    <>
      <OptionsProPageSubscribeFull
        subscription={props.subscription}
        submitProHandler={props.submitProHandler}
        handleClick={props.handleClick}
        display={{
          xxl: "flex",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <OptionsProPageSubscribeBase
        subscription={props.subscription}
        submitProHandler={props.submitProHandler}
        handleClick={props.handleClick}
        display={{
          xxl: "none",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      />
    </>
  );
};

export default OptionsProPageSubscribe;
