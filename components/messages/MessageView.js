// FRONTEND IMPORTS

import { useState, useContext, useEffect, useRef } from "react";

import { useRouter } from "next/router";

import { Box, Button, Spinner } from "@chakra-ui/react";

import ChatMessageViewLayout from "./MessageView/Layout";
import ChatMessageViewChatFullView from "./MessageView/ChatFullView";
import ChatMessageViewChatBaseView from "./MessageView/ChatBaseView";

import { UserContext } from "../../utils/context";

// BACKEND IMPORTS

import firebase from "firebase/compat/app";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  limit,
  startAfter,
} from "firebase/firestore";

import { firestore } from "../../utils/firebase";

const ChatMessageView = () => {
  const { user } = useContext(UserContext);

  const router = useRouter();

  const [member, setMember] = useState();
  const [memberList, setMemberList] = useState();
  const [messages, setMessages] = useState();
  const [sections, setSections] = useState();
  const [cursor, setCursor] = useState();
  const [loading, setLoading] = useState(true);

  // FETCH MESSAGE DOCUMENT

  useEffect(() => {
    const init = async () => {
      const messageRef = doc(firestore, "messages", router.query.id);
      const messageSnap = await getDoc(messageRef);

      if (
        messageSnap.exists() &&
        messageSnap.data().active.find((member) => member === user.uid)
      ) {
        // Store member data

        if (messageSnap.data().members.length > 2) {
          const q = query(
            collection(firestore, "users"),
            where(
              firebase.firestore.FieldPath.documentId(),
              "in",
              messageSnap.data().members
            )
          );
          const querySnapshot = await getDocs(q);
          const displayNames = [];
          querySnapshot.docs.map((doc) => {
            if (doc.id !== user.uid) {
              displayNames.push(
                `${doc.data().firstName} ${doc.data().lastName}`
              );
            }
          });

          setMember({
            name: displayNames.join(", "),
            iconURL: messageSnap.data().iconURL,
            username: "",
          });
        } else {
          const userRef = doc(
            firestore,
            "users",
            messageSnap.data().members.find((member) => member !== user.uid)
          );
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setMember({
              name: `${userSnap.data().firstName} ${userSnap.data().lastName}`,
              iconURL: userSnap.data().photoURL,
              username: userSnap.data().username,
            });
          }
        }

        const memberQ = query(
          collection(firestore, "users"),
          where(
            firebase.firestore.FieldPath.documentId(),
            "in",
            messageSnap.data().members
          )
        );
        const querySnapshot = await getDocs(memberQ);
        const memberListTemp = querySnapshot.docs.map((doc) => {
          return {
            photoURL: doc.data().photoURL,
            id: doc.id,
          };
        });
        setMemberList(memberListTemp);

        // Fetch texts

        const q = query(
          collection(doc(firestore, "messages", router.query.id), "texts"),
          orderBy("createdAt", "desc"),
          limit(50)
        );
        onSnapshot(q, (querySnapshot) => {
          const messageList = querySnapshot.docs.map((doc) => doc.data());

          setMessages(messageList.reverse());

          setCursor(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });

        setLoading(false);
      } else {
        router.push("/messages");
      }
    };
    if (firestore && user) {
      init();
    }
  }, [firestore, user, router]);

  // Refine messages to sections

  const isMoreThan10MinsApart = (t1, t2) => {
    if (t1 && t2) {
      return t1.toDate() - t2.toDate() > 10 * 60 * 1000;
    }
  };

  useEffect(() => {
    if (messages) {
      const sectionList = [];
      let currentSection = null;
      messages.map((message, index) => {
        if (message.createdAt) {
          if (
            currentSection === null ||
            message.creator !== currentSection.creator ||
            isMoreThan10MinsApart(
              message.createdAt,
              messages[index - 1].createdAt
            )
          ) {
            currentSection = {
              creator: message.creator,
              texts: [],
              time: message.createdAt,
            };

            sectionList.push(currentSection);
          }

          currentSection.texts.push(message.text);
        }
      });

      setSections(sectionList);
    }
  }, [messages]);

  // Infinite scrolling

  const observerFull = useRef(null);
  const observerBase = useRef(null);
  const lastMessageElementFull = useRef(null);
  const lastMessageElementBase = useRef(null);

  const fetchTexts = async () => {
    const q = query(
      collection(doc(firestore, "messages", router.query.id), "texts"),
      orderBy("createdAt", "desc"),
      limit(50),
      startAfter(cursor)
    );
    onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.size !== 0) {
        const newMessages = querySnapshot.docs
          .map((doc) => doc.data())
          .reverse();

        setMessages((prevMessages) => [...newMessages, ...prevMessages]);

        setCursor(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }
    });
  };

  useEffect(() => {
    // FULL VIEW

    if (observerFull.current) observerFull.current.disconnect();

    observerFull.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchTexts();
      }
    });

    if (lastMessageElementFull.current) {
      observerFull.current.observe(lastMessageElementFull.current);
    }

    // BASE VIEW

    if (observerBase.current) observerBase.current.disconnect();

    observerBase.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchTexts();
      }
    });

    if (lastMessageElementBase.current) {
      observerBase.current.observe(lastMessageElementBase.current);
    }
  });

  return (
    <>
      {loading ? (
        <Box align={"center"} w={"100%"} h={"100%"}>
          <Spinner mt={"50px"} color={"#FFFFFF"} />
        </Box>
      ) : (
        <ChatMessageViewLayout
          member={member}
          user={user}
          messageId={router.query.id}
        >
          <ChatMessageViewChatFullView
            memberList={memberList}
            sections={sections}
            user={user}
            lastMessageElementFull={lastMessageElementFull}
            display={{
              xxl: "flex",
              xl: "none",
              lg: "none",
              md: "none",
              sm: "none",
              base: "none",
            }}
          />
          <ChatMessageViewChatBaseView
            memberList={memberList}
            sections={sections}
            user={user}
            lastMessageElementBase={lastMessageElementBase}
            display={{
              xxl: "none",
              xl: "flex",
              lg: "flex",
              md: "flex",
              sm: "flex",
              base: "flex",
            }}
          />
        </ChatMessageViewLayout>
      )}
    </>
  );
};

export default ChatMessageView;
