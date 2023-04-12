import { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Box, Button, Flex, SkeletonCircle } from "@chakra-ui/react";

import { GetPagePath } from "../../../functions";

import { Pages } from "../../../items";

const GlobalLayoutTablet = (props) => {
  const router = useRouter();
  const path = router.asPath;

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"100px"}
      h={"100%"}
      paddingY={"50px"}
      boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.25)"}
      display={props.display}
    >
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        gap={"25px"}
      >
        <Flex as={"button"} onClick={() => router.push(path)}>
          <Image src={"/favicon/favicon.ico"} width={34} height={34} />
        </Flex>
        <Flex
          w={"72%"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"10px"}
        >
          {Pages.map((item, index) => (
            <PageBtn key={index} item={item} router={router} path={path} />
          ))}
          <ProfileBtn router={router} userData={props.userData} />
        </Flex>
      </Flex>
      <OptionsBtn router={router} />
    </Flex>
  );
};

const PageBtn = (props) => {
  const { item, router, path } = props;

  return (
    <>
      {GetPagePath(path) === item.link ? (
        <Button
          w={"100%"}
          bgColor={"#FFFFFF"}
          onClick={() => router.push(item.link)}
        >
          <Image src={item.iconSelected} alt={"icon"} width={25} height={25} />
        </Button>
      ) : (
        <Button
          colorScheme={"whiteAlpha"}
          variant={"ghost"}
          w={"100%"}
          onClick={() => router.push(item.link)}
        >
          <Image src={item.icon} alt={"icon"} width={25} height={25} />
        </Button>
      )}
    </>
  );
};

const ProfileBtn = (props) => {
  const { router, userData } = props;

  return (
    <Button
      colorScheme={"whiteAlpha"}
      variant={"ghost"}
      w={"100%"}
      onClick={() => userData && router.push(`/${userData.username}`)}
    >
      <Box w={"30px"} h={"30px"} overflow={"hidden"} borderRadius={"100px"}>
        {userData ? (
          <Image
            src={userData.photoURL}
            alt={"profile photo"}
            width={30}
            height={30}
          />
        ) : (
          <SkeletonCircle
            startColor={"#151515"}
            endColor={"#2B2B2B"}
            size={"30"}
          />
        )}
      </Box>
    </Button>
  );
};

const OptionsBtn = () => {
  return (
    <Button
      colorScheme={"whiteAlpha"}
      variant={"ghost"}
      w={"75%"}
      onClick={() => props.router.push("/options/account")}
    >
      <Box w={"25px"} h={"25px"} overflow={"hidden"} borderRadius={"100px"}>
        <Image
          src={"/images/options-icon-white.png"}
          alt={"icon"}
          width={25}
          height={25}
        />
      </Box>
    </Button>
  );
};

export default GlobalLayoutTablet;
