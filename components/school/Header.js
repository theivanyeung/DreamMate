import { useState } from "react";

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
import SchoolModalSearch from "./modal/Search";

const SchoolHeader = (props) => {
  const { tags, submitFilterHandler, isFull, school } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modal, setModal] = useState(true);

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"100%"}
      gap={"50px"}
      paddingY={"30px"}
      paddingX={"10px"}
    >
      <Button
        colorScheme={"blackAlpha"}
        onClick={() => {
          onOpen();
          setModal(false);
        }}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"2xl"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          {school}
        </Heading>
      </Button>

      <Button
        variant={"ghost"}
        colorScheme={"whiteAlpha"}
        onClick={() => {
          onOpen();
          setModal(true);
        }}
      >
        <HamburgerIcon boxSize={"34px"} color={"#FFFFFF"} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={isFull ? "full" : "lg"}>
        <ModalOverlay />
        {modal ? (
          <GlobalModalFeedFilter
            tags={tags}
            submitFilterHandler={submitFilterHandler}
            onClose={onClose}
            global={true}
            isFull={isFull}
          />
        ) : (
          <SchoolModalSearch isFull={isFull} />
        )}
      </Modal>
    </Flex>
  );
};

export default SchoolHeader;
