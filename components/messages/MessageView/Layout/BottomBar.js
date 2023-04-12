// FRONTEND IMPORTS

import { useState, useContext } from "react";

import Image from "next/image";

import { Box, Flex, Input, Button } from "@chakra-ui/react";

import { UserContext } from "../../../../utils/context";

// BACKEND IMPORTS

import firebase from "firebase/compat/app";

import { addDoc, collection, doc } from "firebase/firestore";

import { firestore } from "../../../../utils/firebase";

const ChatMessageViewLayoutBottomBar = (props) => {
  const { user, messageId } = props;

  const [input, setInput] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (input !== "") {
      await addDoc(collection(doc(firestore, "messages", messageId), "texts"), {
        creator: user.uid,
        text: input,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setInput("");
  };

  return (
    <Box align={"center"} w={"100%"} h={"60px"}>
      <form onSubmit={submitHandler}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          w={"95%"}
          gap={"5px"}
        >
          <Input
            value={input}
            type={"text"}
            placeholder={"Send a message..."}
            w={"93%"}
            bgColor={"#454545"}
            boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.25)"}
            borderRadius={"12px"}
            color={"#FFFFFF"}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type={"submit"}
            colorScheme={"blackAlpha"}
            boxShadow={
              "0px 0px 25px rgba(158, 203, 239, 0.5), inset 0px 0px 25px rgba(158, 203, 239, 0.5)"
            }
            border={"1px solid #FFFFFF"}
            _hover={{
              boxShadow:
                "0px 0px 25px rgba(158, 203, 239, 0.75), inset 0px 0px 25px rgba(158, 203, 239, 0.75)",
            }}
            bgColor={"#000000"}
            borderRadius={"12px"}
            onClick={submitHandler}
          >
            <Image
              src={"/images/create-message-icon-white.png"}
              alt={"Send message icon"}
              width={25}
              height={25}
            />
          </Button>
        </Flex>
      </form>
      <style jsx>{`
        form {
          width: 100%;
        }
      `}</style>
    </Box>
  );
};

export default ChatMessageViewLayoutBottomBar;
