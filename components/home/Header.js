import {
  Flex,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import GlobalModalFeedFilter from "../global/modals/FeedFilter";

const HomeHeader = (props) => {
  const { school, tags, submitFilterHandler, isFull } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"100%"}
      paddingY={"30px"}
      paddingX={"10px"}
    >
      <Heading
        fontWeight={"medium"}
        fontSize={"2xl"}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
      >
        {school}
      </Heading>
      <Button variant={"ghost"} colorScheme={"whiteAlpha"} onClick={onOpen}>
        <HamburgerIcon boxSize={"34px"} color={"#FFFFFF"} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={isFull ? "full" : "lg"}>
        <ModalOverlay />
        <GlobalModalFeedFilter
          tags={tags}
          submitFilterHandler={submitFilterHandler}
          onClose={onClose}
          global={false}
          isFull={isFull}
        />
      </Modal>
    </Flex>
  );
};

export default HomeHeader;
