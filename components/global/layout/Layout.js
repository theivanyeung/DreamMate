// FRONTEND IMPORTS

import { useEffect, useState, useContext } from "react";

import GlobalLayoutFull from "./sections/Layout/Full";
import GlobalLayoutBase from "./sections/Layout/Base";

import { UserContext } from "../../../utils/context";

// BACKEND IMPORTS

import { firestore } from "../../../utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Button } from "@chakra-ui/react";

const GlobalLayout = (props) => {
  const { user } = useContext(UserContext);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      onSnapshot(doc(firestore, "users", user.uid), (doc) => {
        setUserData(doc.data());
      });
    }
  }, [user]);

  return (
    <>
      <GlobalLayoutFull
        userData={userData}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "none",
          base: "none",
        }}
      >
        {props.children}
      </GlobalLayoutFull>

      <GlobalLayoutBase
        userData={userData}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "flex",
          base: "flex",
        }}
      >
        {props.children}
      </GlobalLayoutBase>
    </>
  );
};

export default GlobalLayout;
