import { useState } from "react";

import Image from "next/image";

import {
  Box,
  Flex,
  List,
  ListItem,
  Button,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import ChatMessageControlMessages from "./components/Messages";
import ChatMessageControlModalCreateMessage from "./modal/CreateMessage";
import ChatMessageControlModalSearchMessage from "./modal/SearchMessage";

import { Search2Icon } from "@chakra-ui/icons";

const ChatMessageControlBaseView = (props) => {
  const { user, messages, activeMessages, display } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modal, setModal] = useState(
    <ChatMessageControlModalCreateMessage display={"base"} onClose={onClose} />
  );

  return (
    <Box w={"75px"} h={"100%"} bgColor={"#212121"} display={display}>
      <Box
        align={"center"}
        w={"100%"}
        h={"100px"}
        bgColor={"#212121"}
        boxShadow={"0px 4px 4px rgba(218, 218, 218, 0.25)"}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"90%"}
          h={"50%"}
        >
          <Button
            onClick={() => {
              setModal(
                <ChatMessageControlModalCreateMessage
                  display={"base"}
                  onClose={onClose}
                />
              );
              onOpen();
            }}
          >
            <Image
              src={"/images/create-message-icon.png"}
              alt={"Create Message Icon"}
              width={22}
              height={20}
            />
          </Button>
        </Flex>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"90%"}
          h={"50%"}
        >
          <Button
            variant={"ghost"}
            colorScheme={"whiteAlpha"}
            onClick={() => {
              setModal(
                <ChatMessageControlModalSearchMessage
                  display={"base"}
                  onClose={onClose}
                  messages={messages}
                />
              );
              onOpen();
            }}
          >
            <Search2Icon w={"25px"} h={"25px"} color={"#FFFFFF"} />
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
            <ModalOverlay />
            {modal}
          </Modal>
        </Flex>
      </Box>
      <Flex
        justifyContent={"center"}
        w={"100%"}
        h={"calc(100% - 100px)"}
        overflowX={"hidden"}
        overflowY={"auto"}
        sx={{
          "::-webkit-scrollbar": {
            width: "5px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#777777",
            borderRadius: "10px",
          },
        }}
      >
        <List>
          {activeMessages.map((message, index) => {
            return (
              <ListItem key={index}>
                <ChatMessageControlMessages
                  user={user}
                  id={message.id}
                  data={message.data}
                />
              </ListItem>
            );
          })}
        </List>
      </Flex>
    </Box>
  );
};

export default ChatMessageControlBaseView;
