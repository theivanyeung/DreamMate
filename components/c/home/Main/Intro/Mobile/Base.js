import { useState } from "react";

import Image from "next/image";

import { Flex, Heading, Box, Input, Button, useToast } from "@chakra-ui/react";

import {
  MainTitle,
  MainDescription,
  MainHook,
  WhiteDiscord,
} from "../../../../../items";

import { EmailValidator } from "../../../../../functions";

const HomeMainIntroMobileBase = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const toast = useToast();

  const submitEmail = (e) => {
    e.preventDefault();
    if (EmailValidator(email)) {
      setEmail("");
      setError(false);
      props.submitEmail(email);
    } else {
      toast({
        title: "Invalid email.",
        description: "Please submit a valid email. Thanks!",
        status: "error",
        variant: "subtle",
        duration: 5000,
        isClosable: true,
      });
      setError(true);
    }
  };

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"85%"}
      h={"600px"}
      gap={"100px"}
      display={props.display}
    >
      <Flex flexDirection={"column"} w={"100%"} gap={"50px"}>
        <Heading
          textAlign={"left"}
          fontWeight={"light"}
          fontSize={"4xl"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          <MainTitle />
        </Heading>
        <Heading
          textAlign={"left"}
          fontWeight={"light"}
          fontSize={"2xl"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          {MainDescription}
        </Heading>
      </Flex>
      <Box align={"right"} w={"100%"}>
        <Flex
          mb={"50px"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"25px"}
        >
          <Box
            as={"button"}
            borderRadius={"3px"}
            _hover={{
              filter: "drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.5))",
            }}
          >
            <Image
              src={WhiteDiscord.src}
              alt={WhiteDiscord.alt}
              width={50}
              height={50}
            />
          </Box>
          <Heading
            w={"calc(100% - 75px)"}
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            letterSpacing={"0.05em"}
            color={"#FFFFFF"}
          >
            {MainHook}
          </Heading>
        </Flex>
        <form onSubmit={submitEmail}>
          <Input
            value={email}
            type={"email"}
            placeholder={"Email"}
            size={"lg"}
            color={"white"}
            boxShadow={
              error
                ? "0px 0px 5px rgba(255, 0, 0, 0.5)"
                : "0px 0px 5px rgba(255, 255, 255, 0.5)"
            }
            onChange={(e) => {
              setEmail(e.target.value);
              if (e.target.value === "") {
                setError(false);
              }
            }}
          />
          <Button type={"submit"} mt={"25px"} onClick={submitEmail}>
            <Flex>
              <Heading fontWeight={"medium"} fontSize={"3xl"}>
                Join Waitlist |
              </Heading>
            </Flex>
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default HomeMainIntroMobileBase;
