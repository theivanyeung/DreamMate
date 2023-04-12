// FRONTEND IMPORTS

import { useEffect, useState } from "react";

import Image from "next/image";

import {
  Box,
  Flex,
  Heading,
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

// BACKEND IMPORTS

import firebase from "firebase/compat/app";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { firestore } from "../../../utils/firebase";

const ChatMessageControlFullView = (props) => {
  const { user, messages, messageList, activeMessages, display } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modal, setModal] = useState(
    <ChatMessageControlModalCreateMessage display={"full"} onClose={onClose} />
  );

  return (
    <Box w={"300px"} h={"100%"} bgColor={"#212121"} display={display}>
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
          gap={"20px"}
          w={"90%"}
          h={"50%"}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"sm"}
            letterSpacing={"0.1em"}
            color={"#FFFFFF"}
          >
            DIRECT MESSAGES
          </Heading>
          <Button
            variant={"ghost"}
            colorScheme={"whiteAlpha"}
            onClick={() => {
              setModal(
                <ChatMessageControlModalCreateMessage
                  display={"full"}
                  onClose={onClose}
                />
              );
              onOpen();
            }}
          >
            <Image
              src={"/images/create-message-icon-white.png"}
              alt={"Create Message Icon"}
              width={22}
              height={20}
            />
          </Button>
        </Flex>
        <Flex justifyContent={"center"} w={"95%"} h={"40%"}>
          <Button
            justifyContent={"center"}
            alignItems={"center"}
            w={"90%"}
            h={"90%"}
            borderRadius={"12px"}
            bgColor={"#FFFFFF"}
            onClick={() => {
              setModal(
                <ChatMessageControlModalSearchMessage
                  display={"full"}
                  onClose={onClose}
                  user={user}
                  messageList={messageList}
                  messages={messages}
                  activeMessages={activeMessages}
                />
              );
              onOpen();
            }}
          >
            <Heading fontWeight={"normal"} fontSize={"md"}>
              Search for messages
            </Heading>
          </Button>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
          <ModalOverlay />
          {modal}
        </Modal>
      </Box>
      <Flex
        justifyContent={"center"}
        w={"100%"}
        h={"calc(100% - 100px)"}
        overflowX={"hidden"}
        overflowY={"scroll"}
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
          {activeMessages.map((message, index) => (
            <ListItem key={index}>
              <ChatMessageControlMessages
                user={user}
                id={message.id}
                data={message.data}
              />
            </ListItem>
          ))}
        </List>
      </Flex>
    </Box>
  );
};

export default ChatMessageControlFullView;
