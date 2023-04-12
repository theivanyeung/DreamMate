import {
  Flex,
  Box,
  Button,
  Heading,
  Modal,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";

import OptionsLayoutLayoutView from "./Layout/LayoutView";

const OptionsLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex w={"100%"} h={"100%"} overflow={"hidden"}>
      <OptionsLayoutLayoutView
        w={"250px"}
        display={{
          xxl: "block",
          xl: "block",
          lg: "block",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <Box align={"center"} w={"100%"}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"90%"}
          h={"65px"}
          display={{
            xxl: "none",
            xl: "none",
            lg: "none",
            md: "flex",
            sm: "flex",
            base: "flex",
          }}
        >
          <Button
            variant={"ghost"}
            colorScheme={"whiteAlpha"}
            onClick={onOpen}
            leftIcon={<ArrowBackIcon color={"#FFFFFF"} />}
          >
            <Heading
              fontWeight={"normal"}
              fontSize={"md"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              All Options
            </Heading>
          </Button>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
          <ModalContent h={"100vh"} bgColor={"#212121"}>
            <Box h={"50px"} bgColor={"#212121"}>
              <ModalCloseButton color={"#FFFFFF"} />
            </Box>
            <OptionsLayoutLayoutView w={"100%"} onClose={onClose} />
          </ModalContent>
        </Modal>

        {children}
      </Box>
    </Flex>
  );
};

export default OptionsLayout;
