// FRONTEND IMPORTS

import Image from "next/image";

import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Skeleton,
  SkeletonCircle,
  useDisclosure,
} from "@chakra-ui/react";
import { LinkIcon, SmallAddIcon, AttachmentIcon } from "@chakra-ui/icons";

import { ConvertToStringDate } from "../../../functions";

// BACKEND IMPORTS

import { createMessageHandler } from "../../../server";

const GlobalLayoutPostCardFull = (props) => {
  const { user, router, postData, creatorId, creatorData, members } = props;

  return (
    <Box
      w={"650px"}
      border={"1px solid #FFFFFF"}
      borderRadius={"12px"}
      paddingY={"20px"}
      bgColor={"#212121"}
      display={props.display}
    >
      <Header
        user={user}
        router={router}
        postData={postData}
        creatorId={creatorId}
        creatorData={creatorData}
        members={members}
        createMessageHandler={createMessageHandler}
      />
      <Heading
        my={"20px"}
        w={"90%"}
        textAlign={"left"}
        fontWeight={"medium"}
        fontSize={"2xl"}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
      >
        {postData.title}
      </Heading>
      <Flex flexDirection={"column"} w={"90%"} gap={"20px"}>
        {postData.thumbnailURL && (
          <Box w={"100%"}>
            <Image
              src={"/sample/thumbnails/thumbnail-1.png"}
              alt={"thumbnail"}
              width={675}
              height={379.6875}
              layout={"responsive"}
            />
          </Box>
        )}
        <Heading
          textAlign={"left"}
          fontWeight={"normal"}
          fontSize={"md"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          {postData.description}
        </Heading>
      </Flex>
      <AddOns postData={postData} />
    </Box>
  );
};

const Header = (props) => {
  const {
    user,
    router,
    postData,
    creatorId,
    creatorData,
    members,
    createMessageHandler,
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex justifyContent={"space-between"} w={"90%"}>
      <Flex
        w={"100%"}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "flex",
          md: "none",
          sm: "none",
          base: "none",
        }}
      >
        <Flex alignItems={"center"} gap={"50px"}>
          <Button
            variant={"ghost"}
            colorScheme={"whiteAlpha"}
            gap={"15px"}
            h={"50px"}
            onClick={() => router.push(`/${creatorData.username}`)}
          >
            <Box
              w={"45px"}
              h={"45px"}
              overflow={"hidden"}
              borderRadius={"100px"}
            >
              {creatorData ? (
                <Image
                  src={creatorData.photoURL}
                  alt={"profile photo"}
                  width={45}
                  height={45}
                />
              ) : (
                <SkeletonCircle
                  startColor={"#151515"}
                  endColor={"#2B2B2B"}
                  size={"45"}
                />
              )}
            </Box>
            <Box align={"left"}>
              {creatorData ? (
                <>
                  <Heading
                    fontWeight={"normal"}
                    fontSize={"xl"}
                    letterSpacing={"0.05em"}
                    color={"#FFFFFF"}
                  >
                    {creatorData.firstName} {creatorData.lastName}
                  </Heading>
                  <Heading
                    fontWeight={"normal"}
                    fontSize={"md"}
                    letterSpacing={"0.05em"}
                    color={"#FFFFFF"}
                  >
                    @{creatorData.username}
                  </Heading>
                </>
              ) : (
                <Skeleton
                  startColor={"#151515"}
                  endColor={"#2B2B2B"}
                  w={"150px"}
                  h={"45px"}
                />
              )}
            </Box>
          </Button>
          {user && user.uid !== creatorId ? (
            <Button
              variant={"ghost"}
              colorScheme={"whiteAlpha"}
              alignItems={"center"}
              leftIcon={
                <SmallAddIcon w={"30px"} h={"30px"} color={"#FFFFFF"} />
              }
              onClick={() => createMessageHandler(members, user, router)}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"lg"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                Message
              </Heading>
            </Button>
          ) : (
            <Button
              variant={"link"}
              color={"#439DF6"}
              leftIcon={<AttachmentIcon />}
              onClick={onOpen}
            >
              <Heading
                fontWeight={"normal"}
                fontSize={"sm"}
                letterSpacing={"0.05em"}
              >
                Tags
              </Heading>
            </Button>
          )}

          {/** TAG LIST */}

          <Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
            <ModalOverlay />
            <ModalContent
              boxShadow={"0px 0px 3px 2px rgba(0, 0, 0, 0.25)"}
              borderRadius={"12px"}
              bgColor={"#383838"}
            >
              <ModalCloseButton color={"#FFFFFF"} />
              <Flex flexDirection={"column"} alignItems={"center"}>
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"90%"}
                  h={"50px"}
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"md"}
                    letterSpacing={"0.05em"}
                    color={"#FFFFFF"}
                  >
                    List of Tags
                  </Heading>
                </Flex>

                <Flex
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"10px"}
                  mb={"25px"}
                  w={"100%"}
                >
                  {postData.tags.map((tag, index) => (
                    <Heading
                      key={index}
                      maxW={"90%"}
                      fontWeight={"normal"}
                      fontSize={"md"}
                      letterSpacing={"0.05em"}
                      color={"#439DF6"}
                    >
                      {tag}
                    </Heading>
                  ))}
                </Flex>
              </Flex>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>

      {postData && postData.createdAt && (
        <Heading
          w={"30%"}
          textAlign={"right"}
          fontWeight={"normal"}
          fontSize={"md"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          {ConvertToStringDate(postData.createdAt)}
        </Heading>
      )}
    </Flex>
  );
};

const AddOns = (props) => {
  const { postData } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"flex-end"}
      w={"90%"}
      h={"50px"}
    >
      <Flex alignItems={"center"} gap={"10px"}>
        <Heading
          fontWeight={"normal"}
          fontSize={"md"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          Looking for:
        </Heading>
        <Heading
          paddingX={"10px"}
          fontWeight={"medium"}
          fontSize={"lg"}
          letterSpacing={"0.05em"}
          bgColor={"#FFFFFF"}
          borderRadius={"12px"}
        >
          {postData.lookingFor}
        </Heading>
      </Flex>
      {postData.website && (
        <Button
          variant={"link"}
          color={"#439DF6"}
          leftIcon={<LinkIcon />}
          onClick={onOpen}
        >
          <Heading
            fontWeight={"normal"}
            fontSize={"md"}
            letterSpacing={"0.05em"}
          >
            Website Link
          </Heading>
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
        <ModalOverlay />
        <ModalContent
          boxShadow={"0px 0px 3px 2px rgba(0, 0, 0, 0.25)"}
          borderRadius={"12px"}
          bgColor={"#383838"}
        >
          <ModalCloseButton color={"#FFFFFF"} />
          <Flex flexDirection={"column"} alignItems={"center"} h={"125px"}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              w={"90%"}
              h={"50px"}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                Website link
              </Heading>
            </Flex>

            <Flex justifyContent={"center"} w={"100%"}>
              <Heading
                maxW={"90%"}
                fontWeight={"normal"}
                fontSize={"md"}
                letterSpacing={"0.05em"}
                color={"#439DF6"}
              >
                {postData.website}
              </Heading>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default GlobalLayoutPostCardFull;
