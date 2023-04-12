// FRONTEND IMPORTS

import Image from "next/image";
import { useRouter } from "next/router";

import {
  Box,
  Flex,
  Heading,
  Button,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverContent,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";

// BACKEND IMPORTS

import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { firestore } from "../../../../utils/firebase";

const ChatMessageViewLayoutTopBar = (props) => {
  const { user, member } = props;

  const router = useRouter();

  const closeMessageHandler = async () => {
    const messageRef = doc(firestore, "messages", router.query.id);
    const messageSnap = await getDoc(messageRef);
    if (messageSnap.exists()) {
      const data = messageSnap.data();
      if (data.members.length > 2 && data.active.length === 1) {
        await deleteDoc(messageRef);
      } else {
        await updateDoc(messageRef, {
          active: arrayRemove(user.uid),
        });
      }
      router.push("/messages");
    }
  };

  return (
    <Box
      align={"center"}
      w={"100%"}
      h={"50px"}
      boxShadow={"0px 4px 4px rgba(218, 218, 218, 0.25)"}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"95%"}
        h={"100%"}
      >
        {member ? (
          <Flex
            as={member.username && Button}
            variant={member.username && "ghost"}
            colorScheme={member.username && "whiteAlpha"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={"25px"}
            onClick={() => {
              if (member.username) {
                router.push(`/${member.username}`);
              }
            }}
          >
            <Box
              overflow={"hidden"}
              w={"35px"}
              h={"35px"}
              borderRadius={"100px"}
            >
              <Image
                src={member.iconURL}
                alt={"Profile pic"}
                width={35}
                height={35}
              />
            </Box>
            {member.username ? (
              <Box align={"left"}>
                <Heading
                  fontWeight={"medium"}
                  fontSize={"md"}
                  letterSpacing={"0.1em"}
                  color={"#FFFFFF"}
                >
                  {member.name}
                </Heading>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"xs"}
                  letterSpacing={"0.1em"}
                  color={"#AFAFAF"}
                >
                  @{member.username}
                </Heading>
              </Box>
            ) : (
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                letterSpacing={"0.1em"}
                color={"#FFFFFF"}
              >
                {member.name}
              </Heading>
            )}
          </Flex>
        ) : (
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={"25px"}
          >
            <Box
              overflow={"hidden"}
              w={"35px"}
              h={"35px"}
              borderRadius={"100px"}
            >
              <SkeletonCircle
                startColor={"#151515"}
                endColor={"#2B2B2B"}
                size={"35"}
              />
            </Box>
            <Skeleton
              startColor={"#151515"}
              endColor={"#2B2B2B"}
              w={"200px"}
              h={"30px"}
            />
          </Flex>
        )}

        <Popover>
          <PopoverTrigger>
            <Button
              variant={"ghost"}
              colorScheme={"whiteAlpha"}
              borderRadius={"100px"}
            >
              <Image
                src={"/images/chat-settings-icon.png"}
                alt={"Chat Settings"}
                width={22}
                height={22}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            mr={"20px"}
            w={"150px"}
            h={"40px"}
            boxShadow={"0px 0px 3px 2px rgba(0, 0, 0, 0.25)"}
            borderRadius={"12px"}
          >
            <PopoverArrow />
            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              h={"100%"}
            >
              <Button
                variant={"ghost"}
                w={"95%"}
                h={"90%"}
                onClick={closeMessageHandler}
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"sm"}
                  lineHeight={"25px"}
                  letterSpacing={"0.1em"}
                  color={"#000000"}
                >
                  Close DM
                </Heading>
              </Button>
            </Flex>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  );
};

export default ChatMessageViewLayoutTopBar;
