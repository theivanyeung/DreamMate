// FRONTEND IMPORTS

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import {
  Button,
  Flex,
  Box,
  Heading,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";

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

import { firestore } from "../../../../utils/firebase";

const ChatMessageControlMessages = (props) => {
  const { user, id, data } = props;

  const router = useRouter();

  const [name, setName] = useState();
  const [iconURL, setIconURL] = useState();

  useEffect(() => {
    const init = async () => {
      const q = query(
        collection(firestore, "users"),
        where(firebase.firestore.FieldPath.documentId(), "in", data.members)
      );
      const querySnapshot = await getDocs(q);
      const displayNames = [];
      querySnapshot.docs.map((doc) => {
        if (doc.id !== user.uid) {
          displayNames.push(`${doc.data().firstName} ${doc.data().lastName}`);
        }
      });
      setName(displayNames.join(", "));

      if (querySnapshot.size > 2) {
        setIconURL(data.iconURL);
      } else {
        querySnapshot.forEach((doc) => {
          if (doc.id !== user.uid) {
            setIconURL(doc.data().photoURL);
          }
        });
      }
    };
    if (user && id && data) {
      init();
    }
  }, [user, id, data]);

  return (
    <>
      <Button
        my={"10px"}
        w={"225px"}
        h={"40px"}
        variant={"ghost"}
        size={"sm"}
        colorScheme={"whiteAlpha"}
        bgColor={id === router.query.id && "#42464D"}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
        onClick={() => router.push(`/messages/${id}`)}
      >
        <Flex justifyContent={"center"} alignItems={"center"} w={"25%"}>
          <Box overflow={"hidden"} w={"35px"} h={"35px"} borderRadius={"100px"}>
            {iconURL ? (
              <Image src={iconURL} alt="Avatar" width={35} height={35} />
            ) : (
              <SkeletonCircle
                startColor={"#151515"}
                endColor={"#2B2B2B"}
                size={"35"}
              />
            )}
          </Box>
        </Flex>
        {name ? (
          <Heading
            w={"75%"}
            fontWeight={"normal"}
            fontSize={"md"}
            letterSpacing={"0.1em"}
            textAlign={"left"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            color={"#AFAFAF"}
          >
            {name}
          </Heading>
        ) : (
          <Skeleton
            startColor={"#151515"}
            endColor={"#2B2B2B"}
            w={"75%"}
            h={"20px"}
          />
        )}
      </Button>

      <Button
        my={"10px"}
        w={"50px"}
        h={"40px"}
        variant={"ghost"}
        size={"sm"}
        colorScheme={"whiteAlpha"}
        display={{
          xxl: "none",
          xl: "none",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
        onClick={() => router.push(`/messages/${id}`)}
      >
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Box overflow={"hidden"} w={"35px"} h={"35px"} borderRadius={"100px"}>
            {iconURL ? (
              <Image src={iconURL} alt="Avatar" width={35} height={35} />
            ) : (
              <SkeletonCircle
                startColor={"#151515"}
                endColor={"#2B2B2B"}
                size={"35"}
              />
            )}
          </Box>
        </Flex>
      </Button>
    </>
  );
};

export default ChatMessageControlMessages;
