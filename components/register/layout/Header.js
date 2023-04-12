import Link from "next/link";

import { useState } from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import RegisterLayoutHeaderPage from "./Header/Page";
import RegisterLayoutHeaderPageVisual from "./Header/PageVisual";

const RegisterLayoutHeader = (props) => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"25px"}
      w={"100%"}
      h={"250px"}
    >
      <Link href={"/"}>
        <Flex as={"button"}>
          <Heading fontWeight={"medium"} fontSize={"5xl"}>
            Dream&nbsp;
          </Heading>
          <Heading fontWeight={"light"} fontSize={"5xl"}>
            Mate
          </Heading>
        </Flex>
      </Link>
      <RegisterLayoutHeaderPage
        register={props.register}
        chooseRegisterHandler={props.chooseRegisterHandler}
      />
      <RegisterLayoutHeaderPageVisual
        register={props.register}
        pageVisual={props.pageVisual}
      />
    </Flex>
  );
};

export default RegisterLayoutHeader;
