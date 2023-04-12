// FRONTEND IMPORTS

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Flex,
  Input,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

// BACKEND IMPORTS

import { getAuth, signOut } from "firebase/auth";

const OptionsSignOut = () => {
  const router = useRouter();
  const auth = getAuth();

  const signOutUser = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <>
      <Full
        signOutUser={signOutUser}
        display={{
          xxl: "block",
          xl: "block",
          lg: "block",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <Base
        signOutUser={signOutUser}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "block",
          sm: "block",
          base: "block",
        }}
      />
    </>
  );
};

const Full = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box display={props.display}>
      <Button
        mt={"50px"}
        bgColor={"#000000"}
        colorScheme={"whiteAlpha"}
        rightIcon={<ArrowForwardIcon color={"#FFFFFF"} />}
        onClick={onOpen}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"lg"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          Sign out
        </Heading>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent bg={"#383838"} borderRadius={"12px"}>
          <ModalCloseButton color={"#FFFFFF"} />
          <SignOutModal signOutUser={props.signOutUser} />
        </ModalContent>
      </Modal>
    </Box>
  );
};

const Base = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box display={props.display}>
      <Button
        mt={"50px"}
        bgColor={"#000000"}
        colorScheme={"whiteAlpha"}
        rightIcon={<ArrowForwardIcon color={"#FFFFFF"} />}
        onClick={onOpen}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"lg"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          Sign out
        </Heading>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent
          w={"100%"}
          h={"100vh"}
          bg={"#383838"}
          borderRadius={"12px"}
        >
          <ModalCloseButton color={"#FFFFFF"} />
          <SignOutModal signOutUser={props.signOutUser} />
        </ModalContent>
      </Modal>
    </Box>
  );
};

const SignOutModal = (props) => {
  return (
    <Flex justifyContent={"center"}>
      <Box align={"center"} w={"90%"}>
        <Flex alignItems={"center"} h={"50px"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"20px"}
            letterSpacing={"0.1em"}
            color={"#FFFFFF"}
          >
            Sign out
          </Heading>
        </Flex>

        <Heading
          my={"25px"}
          fontWeight={"medium"}
          fontSize={"xl"}
          lineHeight={"17px"}
          letterSpacing={"0.1em"}
          color={"#FFFFFF"}
        >
          Are you sure you want to sign out?
        </Heading>

        <Flex
          my={"35px"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"50px"}
          w={"90%"}
        >
          <Button
            borderRadius={"12px"}
            variant={"ghost"}
            colorScheme={"whiteAlpha"}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              Cancel
            </Heading>
          </Button>
          <Button
            borderRadius={"12px"}
            bgColor={"#D83C3E"}
            colorScheme={"blackAlpha"}
            onClick={props.signOutUser}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              Logout
            </Heading>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default OptionsSignOut;
