// FRONTEND IMPORTS

import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

import GlobalPostCard from "../../global/cards/PostCard";
import ProfileModalCreatePost from "../modals/CreatePost";

import { PostCards } from "../../placeholderData";

import { UserContext } from "../../../utils/context";

// BACKEND IMPORTS

import { firestore } from "../../../utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const ProfilePosts = (props) => {
  const { user, creatorId, creatorData } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [size, setSize] = useState("2xl");

  const [postData, setPostData] = useState();

  useEffect(() => {
    if (creatorData && creatorData.postId) {
      onSnapshot(doc(firestore, "posts", creatorData.postId), (doc) => {
        setPostData(doc.data());
      });
    }
  }, [creatorData]);

  return (
    <Box mt={"25px"} mb={"50px"} w={"90%"} align={"center"}>
      {user && user.uid === creatorId && (
        <>
          {/** FULL VIEW */}

          <Button
            mb={"25px"}
            borderRadius={"16px"}
            colorScheme={"blackAlpha"}
            boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.25)"}
            _hover={{
              boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.5)",
            }}
            display={{
              xxl: "block",
              xl: "block",
              lg: "block",
              md: "none",
              sm: "none",
              base: "none",
            }}
            onClick={() => {
              onOpen();
              setSize("2xl");
            }}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"2xl"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              New Post
            </Heading>
          </Button>

          {/** BASE VIEW */}

          <Button
            mb={"25px"}
            borderRadius={"16px"}
            colorScheme={"blackAlpha"}
            boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.25)"}
            _hover={{
              boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.5)",
            }}
            display={{
              xxl: "none",
              xl: "none",
              lg: "none",
              md: "display",
              sm: "display",
              base: "display",
            }}
            onClick={() => {
              onOpen();
              setSize("full");
            }}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"2xl"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              New Post
            </Heading>
          </Button>
        </>
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ProfileModalCreatePost onClose={onClose} />
      </Modal>

      {creatorData ? (
        postData ? (
          <GlobalPostCard postData={postData} />
        ) : user && user.uid === creatorId ? (
          <Heading
            fontWeight={"normal"}
            fontSize={"2xl"}
            letterSpacing={"0.05em"}
            color={"#FFFFFF"}
          >
            Create a post to view it here
          </Heading>
        ) : (
          <Heading
            fontWeight={"normal"}
            fontSize={"2xl"}
            letterSpacing={"0.05em"}
            color={"#FFFFFF"}
          >
            This user has not created a post
          </Heading>
        )
      ) : (
        <Spinner color={"#FFFFFF"} />
      )}
    </Box>
  );
};

export default ProfilePosts;
