import Image from "next/image";

import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const OptionsProPageSubscribeFull = (props) => {
  const { display, subscription, submitProHandler, handleClick } = props;

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"700px"}
      bgImage={"linear-gradient(102.29deg, #6B0091 0%, #009ED0 100%)"}
      boxShadow={"0px 0px 5px #FFFFFF"}
      borderRadius={"12px"}
      display={display}
    >
      <Flex
        my={"20px"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={"50px"}
        w={"90%"}
      >
        <Flex h={"100%"} alignItems={"flex-end"}>
          <Heading fontWeight={"medium"} fontSize={"3xl"} color={"#FFFFFF"}>
            Dream&nbsp;
          </Heading>
          <Heading fontWeight={"light"} fontSize={"3xl"} color={"#FFFFFF"}>
            Mate&nbsp;
          </Heading>
          <Heading fontWeight={"bold"} fontSize={"3xl"} color={"#FFFFFF"}>
            PRO&nbsp;
          </Heading>
          <Heading fontSize={"3xl"}>🔥</Heading>
        </Flex>

        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"25px"}
        >
          <Heading fontWeight={"medium"} fontSize={"3xl"} color={"#FFFFFF"}>
            Unlock full perks and rank your post with PRO
          </Heading>

          <Heading
            fontWeight={"light"}
            fontSize={"xl"}
            letterSpacing={"0.05em"}
            color={"#FFFFFF"}
          >
            <span>$4.99</span> / month. Cancel anytime. Full refund for first
            purchase.
          </Heading>

          <style jsx>{`
            span {
              font-weight: 500;
            }
          `}</style>
        </Flex>

        <Button
          role={"link"}
          type={"submit"}
          mb={"25px"}
          bgColor={"#000000"}
          boxShadow={"0px 0px 25px rgba(158, 203, 239, 0.5)"}
          borderRadius={"12px"}
          _hover={{
            boxShadow:
              "0px 0px 25px rgba(158, 203, 239, 0.75), inset 0px 0px 25px rgba(158, 203, 239, 0.5)",
          }}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"xl"}
            letterSpacing={"0.05em"}
            color={"#FFFFFF"}
          >
            🔥 Coming Soon!
          </Heading>
        </Button>

        {/** Resurrect when implementing pro plan */}

        {/* {subscription ? (
          <Button
            mb={"25px"}
            colorScheme={"blackAlpha"}
            borderRadius={"12px"}
            rightIcon={<ExternalLinkIcon color={"#FFFFFF"} />}
            onClick={handleClick}
          >
            <Heading
              fontWeight={"normal"}
              fontSize={"md"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              🔥 Manage your subscriptions
            </Heading>
          </Button>
        ) : (
          <Button
            role={"link"}
            type={"submit"}
            mb={"25px"}
            bgColor={"#000000"}
            boxShadow={"0px 0px 25px rgba(158, 203, 239, 0.5)"}
            borderRadius={"12px"}
            _hover={{
              boxShadow:
                "0px 0px 25px rgba(158, 203, 239, 0.75), inset 0px 0px 25px rgba(158, 203, 239, 0.5)",
            }}
            onClick={submitProHandler}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"xl"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              🔥 Subscribe!
            </Heading>
          </Button>
        )} */}
      </Flex>
    </Flex>
  );
};

export default OptionsProPageSubscribeFull;
