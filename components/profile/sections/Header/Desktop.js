// FRONTEND IMPORTS

import { useEffect, useState } from "react";

import Image from "next/image";

import {
  Box,
  Flex,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  SkeletonCircle,
  useDisclosure,
  Input,
  Progress,
  Skeleton,
} from "@chakra-ui/react";
import { PhoneIcon, SmallAddIcon } from "@chakra-ui/icons";

import ProfileModalEditProfile from "../../modals/EditProfile";
import ProfileModalSocials from "../../modals/Socials";

// BACKEND IMPORTS

import { createMessageHandler, CoverChangeHandler } from "../../../server";

const ProfileHeaderDesktop = (props) => {
  const { creatorData, socialList } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [item, setItem] = useState();

  const [progress, setProgress] = useState(null);

  return (
    <Box align={"center"} w={"100%"} h={"500px"} display={props.display}>
      {creatorData ? (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"100%"}
          h={"70%"}
          bgSize={"cover"}
          bgPosition={"center"}
          bgRepeat={"none"}
          bgImage={`url('${creatorData.coverPhotoURL}')`}
        >
          {progress && (
            <Progress
              value={progress}
              size={"sm"}
              w={"60%"}
              colorScheme={"gray"}
              borderRadius={"100px"}
            />
          )}
        </Flex>
      ) : (
        <Skeleton startColor={"#151515"} endColor={"#2B2B2B"} height={"70%"} />
      )}
      <Flex w={"95%"} h={"40%"} gap={"25px"}>
        <Box marginTop={"-40px"} align={"left"} w={"13%"}>
          {creatorData ? (
            <Box
              w={"150px"}
              h={"150px"}
              borderRadius={"1000px"}
              overflow={"hidden"}
            >
              <Image
                src={creatorData.photoURL}
                alt={"Profile Pic"}
                width={150}
                height={150}
              />
            </Box>
          ) : (
            <SkeletonCircle
              startColor={"#151515"}
              endColor={"#2B2B2B"}
              size={"150"}
            />
          )}
        </Box>
        <Flex flexDirection={"column"} w={"55%"}>
          <Flex alignItems={"flex-end"} h={"60px"}>
            {creatorData ? (
              <>
                <Heading
                  mr={"10px"}
                  fontWeight={"medium"}
                  fontSize={"5xl"}
                  letterSpacing={"0.05em"}
                  color={"#FFFFFF"}
                >
                  {`${creatorData.firstName} ${creatorData.lastName}`}
                </Heading>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"2xl"}
                  lineHeight={"41px"}
                  letterSpacing={"0.05em"}
                  color={"#AFAFAF"}
                >
                  @{creatorData.username}
                </Heading>
              </>
            ) : (
              <Skeleton
                startColor={"#151515"}
                endColor={"#2B2B2B"}
                w={"100%"}
                h={"36px"}
              />
            )}
          </Flex>
          <Box align={"left"}>
            {creatorData ? (
              <Heading
                fontWeight={"medium"}
                fontSize={"sm"}
                lineHeight={"20px"}
                letterSpacing={"0.05em"}
                color={"#AFAFAF"}
              >
                {creatorData.status}
              </Heading>
            ) : (
              <Skeleton
                startColor={"#151515"}
                endColor={"#2B2B2B"}
                w={"100%"}
                h={"14px"}
              />
            )}
          </Box>
          <Flex mt={"25px"} alignItems={"center"} gap={"25px"}>
            {socialList &&
              socialList.map((item, index) => (
                <Box
                  key={index}
                  as={"button"}
                  onClick={() => {
                    onOpen();
                    setItem(item);
                  }}
                >
                  {item.title === "Phone" ? (
                    <PhoneIcon w={"30px"} h={"30px"} color={"#FFFFFF"} />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={30}
                      height={30}
                    />
                  )}
                </Box>
              ))}

            <Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
              <ModalOverlay />
              <ProfileModalSocials item={item} />
            </Modal>
          </Flex>
        </Flex>
        <Flex justifyContent={"center"} alignItems={"center"} w={"32%"}>
          <SettingBtns
            router={props.router}
            user={props.user}
            creatorId={props.creatorId}
            creatorData={creatorData}
            setProgress={setProgress}
            socialOptions={props.socialOptions}
            socialList={socialList}
            members={props.members}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

const SettingBtns = (props) => {
  const { router, user, creatorId, members } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  // NEW WAY TO DISPLAY IMAGE PREVIEW

  // const handleClick = () => {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = "image/*";
  //   input.addEventListener("change", () => {
  //     const file = input.files[0];
  //     console.log(file.name);
  //   });
  //   input.click();
  // };

  return (
    <>
      {user && user.uid === creatorId ? (
        <Flex justifyContent={"space-between"} w={"325px"} h={"60%"}>
          <Button
            variant={"ghost"}
            colorScheme={"whiteAlpha"}
            borderRadius={"16px"}
            leftIcon={
              <Image
                src={"/images/edit-profile-icon.png"}
                alt={"Edit Profile Icon"}
                width={20}
                height={20}
              />
            }
            onClick={onOpen}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              Edit Profile
            </Heading>
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"xl"}
            closeOnOverlayClick={false}
          >
            <ModalOverlay />
            <ProfileModalEditProfile
              onClose={onClose}
              isFull={false}
              creatorData={props.creatorData}
              socialOptions={props.socialOptions}
              socialList={props.socialList}
            />
          </Modal>
          <Box align={"right"} w={"50%"} position={"relative"}>
            <Button
              w={"150px"}
              borderRadius={"16px"}
              position={"absolute"}
              colorScheme={"whiteAlpha"}
              leftIcon={
                <Image
                  src={"/images/edit-cover-icon.png"}
                  alt={"Edit Cover Icon"}
                  width={20}
                  height={20}
                />
              }
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                Edit Cover
              </Heading>
            </Button>
            <Input
              type={"file"}
              accept={"image/*"}
              w={"150px"}
              borderRadius={"16px"}
              opacity={"0"}
              onChange={(e) =>
                CoverChangeHandler(e, props.user, props.setProgress)
              }
            />
          </Box>
        </Flex>
      ) : (
        <Flex justifyContent={"center"} w={"325px"} h={"60%"}>
          <Button
            w={"150px"}
            variant={"ghost"}
            colorScheme={"whiteAlpha"}
            alignItems={"center"}
            borderRadius={"16px"}
            leftIcon={<SmallAddIcon w={"30px"} h={"30px"} color={"#FFFFFF"} />}
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
        </Flex>
      )}
    </>
  );
};

export default ProfileHeaderDesktop;
