import { useEffect } from "react";

import {
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import OptionsAccountPageModalUsername from "../modals/Username";

const OptionsAccountPageUsernameFull = (props) => {
  const { user, username, display } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Heading
        fontWeight={"medium"}
        fontSize={"xl"}
        lineHeight={"54px"}
        letterSpacing={"0.1em"}
        color={"#C0C0C0"}
        display={display}
      >
        Username: @{username}
      </Heading>
      <Button
        width={"70px"}
        height={"36px"}
        bgColor={"#A7A7A7"}
        onClick={onOpen}
        display={display}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"md"}
          lineHeight={"27px"}
          letterSpacing={"0.1em"}
        >
          Edit
        </Heading>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"} display={display}>
        <ModalOverlay />
        <OptionsAccountPageModalUsername
          user={user}
          username={username}
          onClose={onClose}
          isFull={false}
        />
      </Modal>
    </>
  );
};

export default OptionsAccountPageUsernameFull;
