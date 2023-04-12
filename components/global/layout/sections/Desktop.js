import { useEffect, useContext } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { Box, Button, Flex, Heading, SkeletonCircle } from "@chakra-ui/react";

import { GetPagePath } from "../../../functions";
import { Pages } from "../../../items";

import { UserContext } from "../../../../utils/context";

const GlobalLayoutDesktop = (props) => {
  const router = useRouter();
  const path = router.asPath;

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"250px"}
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
          <Heading
            id={"FUCK"}
            fontWeight={"medium"}
            fontSize={"3xl"}
            color={"#FFFFFF"}
          >
            Dream&nbsp;
          </Heading>
          <Heading fontWeight={"light"} fontSize={"3xl"} color={"#FFFFFF"}>
            Mate
          </Heading>
        </Flex>
        <Flex
          w={"75%"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"10px"}
        >
          {Pages.map((item, index) => (
            <PageBtn key={index} item={item} router={router} path={path} />
          ))}
          <ProfileBtn router={router} userData={props.userData} path={path} />
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
          leftIcon={
            <Image
              src={item.iconSelected}
              alt={"icon"}
              width={25}
              height={25}
            />
          }
          onClick={() => router.push(item.link)}
        >
          <Box align={"right"} w={"calc(100% - 50px)"}>
            <Heading
              w={"85%"}
              textAlign={"left"}
              fontWeight={"medium"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
            >
              {item.title}
            </Heading>
          </Box>
        </Button>
      ) : (
        <Button
          colorScheme={"whiteAlpha"}
          variant={"ghost"}
          w={"100%"}
          leftIcon={
            <Image src={item.icon} alt={"icon"} width={25} height={25} />
          }
          onClick={() => router.push(item.link)}
        >
          <Box align={"right"} w={"calc(100% - 50px)"}>
            <Heading
              w={"85%"}
              textAlign={"left"}
              fontWeight={"medium"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
              color={"#DCDCDC"}
            >
              {item.title}
            </Heading>
          </Box>
        </Button>
      )}
    </>
  );
};

const ProfileBtn = (props) => {
  const { router, userData, path } = props;

  const { username } = useContext(UserContext);

  return (
    <>
      {userData && GetPagePath(path) === `/${username}` ? (
        <Button
          bgColor={"#FFFFFF"}
          w={"100%"}
          leftIcon={
            <Box
              w={"30px"}
              h={"30px"}
              overflow={"hidden"}
              borderRadius={"100px"}
              border={"1px solid #000000"}
            >
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
          }
          onClick={() => userData && router.push(`/${userData.username}`)}
        >
          <Box align={"right"} w={"calc(100% - 50px)"}>
            <Heading
              w={"85%"}
              textAlign={"left"}
              fontWeight={"medium"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
            >
              Profile
            </Heading>
          </Box>
        </Button>
      ) : (
        <Button
          colorScheme={"whiteAlpha"}
          variant={"ghost"}
          w={"100%"}
          leftIcon={
            <Box
              w={"30px"}
              h={"30px"}
              overflow={"hidden"}
              borderRadius={"100px"}
            >
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
          }
          onClick={() => userData && router.push(`/${userData.username}`)}
        >
          <Box align={"right"} w={"calc(100% - 50px)"}>
            <Heading
              w={"85%"}
              textAlign={"left"}
              fontWeight={"medium"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
              color={"#DCDCDC"}
            >
              Profile
            </Heading>
          </Box>
        </Button>
      )}
    </>
  );
};

const OptionsBtn = (props) => {
  return (
    <Button
      colorScheme={"whiteAlpha"}
      variant={"ghost"}
      w={"75%"}
      leftIcon={
        <Box w={"25px"} h={"25px"} overflow={"hidden"} borderRadius={"100px"}>
          <Image
            src={"/images/options-icon-white.png"}
            alt={"icon"}
            width={25}
            height={25}
          />
        </Box>
      }
      onClick={() => props.router.push("/options/account")}
    >
      <Box align={"right"} w={"calc(100% - 50px)"}>
        <Heading
          w={"85%"}
          textAlign={"left"}
          fontWeight={"medium"}
          fontSize={"lg"}
          letterSpacing={"0.05em"}
          color={"#DCDCDC"}
        >
          Options
        </Heading>
      </Box>
    </Button>
  );
};

export default GlobalLayoutDesktop;
