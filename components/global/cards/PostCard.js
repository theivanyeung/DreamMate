// FRONTEND IMPORTS

import { useEffect, useState, useContext } from "react";

import { useRouter } from "next/router";

import GlobalLayoutPostCardBase from "./PostCard/Base";
import GlobalLayoutPostCardFull from "./PostCard/Full";

import { UserContext } from "../../../utils/context";

// BACKEND IMPORTS

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  onSnapshot,
} from "firebase/firestore";

import { firestore } from "../../../utils/firebase";

const GlobalPostCard = (props) => {
  const { postData } = props;

  const { user } = useContext(UserContext);

  const router = useRouter();

  const [creatorData, setCreatorData] = useState();
  const [creatorId, setCreatorId] = useState();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (postData && postData.creator) {
      onSnapshot(doc(firestore, "users", postData.creator), (doc) => {
        setCreatorId(doc.id);
        setCreatorData(doc.data());
        if (user) {
          setMembers([
            {
              id: user.uid,
            },
            {
              id: doc.id,
            },
          ]);
        }
      });
    }
  }, [user, postData]);

  return (
    <>
      <GlobalLayoutPostCardFull
        user={user}
        router={router}
        postData={postData}
        creatorId={creatorId}
        creatorData={creatorData}
        members={members}
        display={{
          xxl: "block",
          xl: "block",
          lg: "block",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <GlobalLayoutPostCardBase
        user={user}
        router={router}
        postData={postData}
        creatorId={creatorId}
        creatorData={creatorData}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "block",
          sm: "block",
          base: "block",
        }}
      />
    </>
  );
};

export default GlobalPostCard;
