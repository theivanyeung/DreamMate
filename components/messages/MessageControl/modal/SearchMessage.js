// FRONTEND IMPORTS

import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import {
  ModalContent,
  ModalCloseButton,
  Flex,
  Heading,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";

// BACKEND IMPORTS

import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

import { firestore } from "../../../../utils/firebase";

const ChatMessageControlModalSearchMessage = (props) => {
  const { user, messageList, messages, onClose } = props;

  const [search, setSearch] = useState("");

  const router = useRouter();

  const submitHandler = async (id) => {
    const messageRef = doc(firestore, "messages", id);

    let exists = false;

    for (let n = 0; n < messages.length; n++) {
      if (messages[n].id === id) {
        for (let i = 0; i < messages[n].data.active.length; i++) {
          if (messages[n].data.active[i] == user.uid) {
            exists = true;
          }
        }
      }
    }

    if (!exists) {
      updateDoc(messageRef, {
        active: arrayUnion(user.uid),
      });
    }

    router.push(`/messages/${id}`);
    onClose();
  };

  return (
    <ModalContent bgColor={"#383838"} borderRadius={"12px"}>
      <ModalCloseButton color={"#FFFFFF"} />

      <Flex
        h={props.display === "full" ? "450px" : "100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex
          w={"90%"}
          h={"90%"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Heading
            w={"100%"}
            fontWeight={"medium"}
            fontSize={"md"}
            letterSpacing={"0.1em"}
            color={"#FFFFFF"}
          >
            New Message
          </Heading>
          <Input
            value={search}
            mt={"10px"}
            h={"60px"}
            placeholder={"Search creators..."}
            size={"md"}
            bgColor={"#D6D6D6"}
            borderRadius={"12px"}
            type={"text"}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Box my={"20px"} w={"100%"} h={"0.5px"} bgColor={"#FFFFFF"} />
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            h={"100%"}
          >
            <Flex flexDirection={"column"} w={"95%"} h={"95%"}>
              {messageList
                .filter((message) => {
                  const searchTerm = search.toLowerCase();
                  const name = message.name.toLowerCase();

                  return (
                    searchTerm &&
                    name.startsWith(searchTerm) &&
                    name !== searchTerm
                  );
                })
                .slice(0, 5)
                .map((message, index) => (
                  <Button
                    key={index}
                    my={"2px"}
                    w={"100%"}
                    h={"50px"}
                    onClick={() => submitHandler(message.id)}
                  >
                    <Box
                      overflow={"hidden"}
                      w={"40px"}
                      h={"40px"}
                      borderRadius={"100px"}
                    >
                      <Image
                        src={message.iconURL}
                        alt={"Message Icon"}
                        width={40}
                        height={40}
                      />
                    </Box>
                    <Heading
                      ml={"15px"}
                      w={"80%"}
                      h={"28px"}
                      textAlign={"left"}
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                      fontWeight={"medium"}
                      fontSize={"xl"}
                      lineHeight={"28px"}
                      letterSpacing={"0.1em"}
                      verticalAlign={"bottom"}
                    >
                      {message.name}
                    </Heading>
                  </Button>
                ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ModalContent>
  );
};

export default ChatMessageControlModalSearchMessage;
