import { useState } from "react";

import {
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import OptionsAccountPageModalEmail from "../modals/Email";

const OptionsAccountPageEmailBase = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Heading
        fontWeight={"medium"}
        fontSize={"3.5vw"}
        lineHeight={"54px"}
        letterSpacing={"0.1em"}
        color={"#C0C0C0"}
        display={props.display}
      >
        Email: ***********@gmail.com
      </Heading>

      <Button
        width={"70px"}
        height={"36px"}
        bgColor={"#A7A7A7"}
        onClick={onOpen}
        display={props.display}
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

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
        display={props.display}
      >
        <ModalOverlay />
        <OptionsAccountPageModalEmail isFull={true} onClose={onClose} />
      </Modal>
    </>
  );
};

export default OptionsAccountPageEmailBase;
