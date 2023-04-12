import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import ChatMessageControlModalCreateMessage from "../../components/messages/MessageControl/modal/CreateMessage";

const HomeMessages = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      h={"100%"}
      gap={"25px"}
    >
      <Heading
        maxW={"90%"}
        fontWeight={"bold"}
        fontSize={"5xl"}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
      >
        Select a message 🤝
      </Heading>
      <Heading
        maxW={"90%"}
        fontWeight={"normal"}
        fontSize={"xl"}
        letterSpacing={"0.05em"}
        color={"#C0C0C0"}
      >
        Choose from your existing conversations or start a new one.
      </Heading>
      <Button
        mt={"25px"}
        colorScheme={"blackAlpha"}
        boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.25)"}
        _hover={{
          boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.5)",
        }}
        bgColor={"#000000"}
        borderRadius={"12px"}
        onClick={onOpen}
      >
        <Heading
          fontWeight={"normal"}
          fontSize={"2xl"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          Create message
        </Heading>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ChatMessageControlModalCreateMessage display={"full"} />
      </Modal>
    </Flex>
  );
};

export default HomeMessages;

HomeMessages.getLayoutMessages = function PageLayout(page) {
  return <>{page}</>;
};
