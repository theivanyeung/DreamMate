// FRONTEND IMPORTS

import { useState, useEffect, useContext } from "react";

import ChatMessageControlFullView from "./MessageControl/FullView";
import ChatMessageControlBaseView from "./MessageControl/BaseView";

import { UserContext } from "../../utils/context";

// BACKEND IMPORTS

import firebase from "firebase/compat/app";

import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { firestore } from "../../utils/firebase";

const ChatMessageControl = () => {
  const { user } = useContext(UserContext);

  const [messages, setMessages] = useState([]);
  const [activeMessages, setActiveMessages] = useState([]);

  // Set messages

  useEffect(() => {
    const init = async () => {
      const q1 = query(
        collection(firestore, "messages"),
        where("active", "array-contains", user.uid)
      );
      const q2 = query(
        collection(firestore, "messages"),
        where("members", "array-contains", user.uid)
      );
      onSnapshot(q1, (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setActiveMessages(messages);
      });
      onSnapshot(q2, (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setMessages(messages);
      });
    };
    if (user) {
      init();
    }
  }, [user]);

  // Refine messages

  const [messageList, setMessageList] = useState();

  useEffect(() => {
    const messageListTemp = [];
    const init = async () => {
      messages.forEach((message) => {
        firestore
          .collection("users")
          .where(
            firebase.firestore.FieldPath.documentId(),
            "in",
            message.data.members
          )
          .get()
          .then((snapshot) => {
            const displayNames = [];

            snapshot.docs.map((doc) => {
              if (doc.id !== user.uid) {
                displayNames.push(
                  `${doc.data().firstName} ${doc.data().lastName}`
                );
              }
            });

            let iconURL;

            if (snapshot.size > 2) {
              iconURL = message.data.iconURL;
            } else {
              snapshot.forEach((doc) => {
                if (doc.id !== user.uid) {
                  iconURL = doc.data().photoURL;
                }
              });
            }

            messageListTemp.push({
              id: message.id,
              name: displayNames.join(", "),
              iconURL: iconURL,
            });
          });
      });
      setMessageList(messageListTemp);
    };
    if (messages !== []) {
      init();
    }
  }, [user, messages]);

  return (
    <>
      <ChatMessageControlFullView
        user={user}
        activeMessages={activeMessages}
        messageList={messageList}
        messages={messages}
        display={{
          xxl: "block",
          xl: "block",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <ChatMessageControlBaseView
        user={user}
        activeMessages={activeMessages}
        messageList={messageList}
        messages={messages}
        display={{
          xxl: "none",
          xl: "none",
          lg: "block",
          md: "block",
          sm: "block",
          base: "block",
        }}
      />
    </>
  );
};

export default ChatMessageControl;
