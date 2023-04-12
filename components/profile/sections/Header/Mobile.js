// FRONTEND IMPORTS

import { useState } from "react";

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

const ProfileHeaderMobile = (props) => {
  const { creatorData, socialList } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [item, setItem] = useState();

  const [progress, setProgress] = useState(null);

  return (
    <Box align={"center"} w={"100%"} h={"400px"} display={props.display}>
      {creatorData ? (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"100%"}
          h={"50%"}
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
        <Skeleton startColor={"#151515"} endColor={"#2B2B2B"} height={"50%"} />
      )}
      <Box w={"95%"} h={"55%"}>
        {/* FULL VIEW */}

        <Flex
          w={"100%"}
          h={"25%"}
          justifyContent={"space-between"}
          display={{
            md: "flex",
            sm: "none",
            base: "none",
          }}
        >
          <Box mt={"-40px"} align={"center"} w={"20%"}>
            {creatorData ? (
              <Box
                w={"90px"}
                h={"90px"}
                borderRadius={"1000px"}
                overflow={"hidden"}
              >
                <Image
                  src={creatorData.photoURL}
                  alt={"Profile Pic"}
                  width={90}
                  height={90}
                />
              </Box>
            ) : (
              <SkeletonCircle
                startColor={"#151515"}
                endColor={"#2B2B2B"}
                size={"90"}
              />
            )}
          </Box>
          <Flex justifyContent={"center"} alignItems={"center"} w={"60%"}>
            <SettingBtns />
          </Flex>
        </Flex>

        {/* BASE VIEW */}

        <Flex
          w={"100%"}
          h={"25%"}
          justifyContent={"space-between"}
          display={{
            md: "none",
            sm: "flex",
            base: "flex",
          }}
        >
          <Box mt={"-30px"} align={"center"} w={"30%"}>
            {creatorData ? (
              <Box
                w={"75px"}
                h={"75px"}
                borderRadius={"1000px"}
                overflow={"hidden"}
              >
                <Image
                  src={creatorData.photoURL}
                  alt={"Profile Pic"}
                  width={75}
                  height={75}
                />
              </Box>
            ) : (
              <SkeletonCircle
                startColor={"#151515"}
                endColor={"#2B2B2B"}
                size={"75"}
              />
            )}
          </Box>
          <Flex justifyContent={"center"} alignItems={"center"} w={"70%"}>
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

        <Flex flexDirection={"column"} w={"95%"}>
          <Flex alignItems={"center"} h={"50px"}>
            {creatorData ? (
              <>
                <Heading
                  mr={"10px"}
                  fontWeight={"medium"}
                  fontSize={"2xl"}
                  letterSpacing={"0.05em"}
                  color={"#FFFFFF"}
                >
                  {`${creatorData.firstName} ${creatorData.lastName}`}
                </Heading>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"md"}
                  lineHeight={"30px"}
                  letterSpacing={"0.05em"}
                  color={"#AFAFAF"}
                >
                  {creatorData.username}
                </Heading>
              </>
            ) : (
              <Skeleton
                startColor={"#151515"}
                endColor={"#2B2B2B"}
                w={"100%"}
                h={"24px"}
              />
            )}
          </Flex>
          <Box align={"left"}>
            {creatorData ? (
              <Heading
                fontWeight={"medium"}
                fontSize={"xs"}
                lineHeight={"15px"}
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
                h={"12px"}
              />
            )}
          </Box>
          <Flex
            w={"100%"}
            mt={"25px"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"25px"}
          >
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
      </Box>
    </Box>
  );
};

const SettingBtns = (props) => {
  const { router, user, creatorId, members } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* FULL VIEW */}

      <>
        {user && user.uid === creatorId ? (
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={"20px"}
            w={"80%"}
            h={"60%"}
            display={{
              md: "flex",
              sm: "none",
              base: "none",
            }}
          >
            <Button
              w={"110px"}
              h={"30px"}
              borderRadius={"16px"}
              colorScheme={"whiteAlpha"}
              leftIcon={
                <Image
                  src={"/images/edit-profile-icon.png"}
                  alt={"Edit Profile Icon"}
                  width={10}
                  height={10}
                />
              }
              onClick={onOpen}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"xs"}
                letterSpacing={"0.05em"}
              >
                Edit Profile
              </Heading>
            </Button>

            <Box position={"relative"}>
              <Button
                w={"110px"}
                h={"30px"}
                borderRadius={"16px"}
                colorScheme={"whiteAlpha"}
                position={"absolute"}
                leftIcon={
                  <Image
                    src={"/images/edit-cover-icon.png"}
                    alt={"Edit Cover Icon"}
                    width={10}
                    height={10}
                  />
                }
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"xs"}
                  letterSpacing={"0.05em"}
                >
                  Edit Cover
                </Heading>
              </Button>
              <Input
                type={"file"}
                accept={"image/*"}
                w={"110px"}
                h={"30px"}
                borderRadius={"16px"}
                opacity={"0"}
                onChange={(e) =>
                  CoverChangeHandler(e, props.user, props.setProgress)
                }
              />
            </Box>
          </Flex>
        ) : (
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={"20px"}
            w={"80%"}
            h={"60%"}
            display={{
              md: "flex",
              sm: "none",
              base: "none",
            }}
          >
            <Button
              w={"110px"}
              h={"30px"}
              variant={"ghost"}
              colorScheme={"whiteAlpha"}
              alignItems={"center"}
              borderRadius={"16px"}
              leftIcon={
                <SmallAddIcon w={"15px"} h={"15px"} color={"#FFFFFF"} />
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
          </Flex>
        )}
      </>

      {/* BASE VIEW */}

      <>
        {user && user.uid === creatorId ? (
          <Flex
            justifyContent={"flex-end"}
            alignItems={"center"}
            gap={"20px"}
            w={"80%"}
            h={"60%"}
            display={{
              md: "none",
              sm: "flex",
              base: "flex",
            }}
          >
            <Button
              w={"80px"}
              h={"30px"}
              borderRadius={"16px"}
              colorScheme={"whiteAlpha"}
              leftIcon={
                <Image
                  src={"/images/edit-profile-icon.png"}
                  alt={"Edit Profile Icon"}
                  width={9}
                  height={9}
                />
              }
              onClick={onOpen}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"8px"}
                letterSpacing={"0.05em"}
              >
                Edit Profile
              </Heading>
            </Button>

            <Box position={"relative"}>
              <Button
                w={"80px"}
                h={"30px"}
                borderRadius={"16px"}
                colorScheme={"whiteAlpha"}
                position={"absolute"}
                leftIcon={
                  <Image
                    src={"/images/edit-cover-icon.png"}
                    alt={"Edit Cover Icon"}
                    width={9}
                    height={9}
                  />
                }
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"8px"}
                  letterSpacing={"0.05em"}
                >
                  Edit Cover
                </Heading>
              </Button>
              <Input
                type={"file"}
                accept={"image/*"}
                w={"80px"}
                h={"25px"}
                borderRadius={"16px"}
                opacity={"0"}
                onChange={(e) =>
                  CoverChangeHandler(e, props.user, props.setProgress)
                }
              />
            </Box>
          </Flex>
        ) : (
          <Flex
            justifyContent={"flex-end"}
            alignItems={"center"}
            gap={"20px"}
            w={"80%"}
            h={"60%"}
            display={{
              md: "none",
              sm: "flex",
              base: "flex",
            }}
          >
            <Button
              w={"110px"}
              h={"30px"}
              variant={"ghost"}
              colorScheme={"whiteAlpha"}
              alignItems={"center"}
              borderRadius={"16px"}
              leftIcon={
                <SmallAddIcon w={"15px"} h={"15px"} color={"#FFFFFF"} />
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
          </Flex>
        )}
      </>

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ProfileModalEditProfile
          onClose={onClose}
          isFull={true}
          creatorData={props.creatorData}
          socialOptions={props.socialOptions}
          socialList={props.socialList}
        />
      </Modal>
    </>
  );
};

export default ProfileHeaderMobile;
