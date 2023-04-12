// FRONTEND IMPORTS

import { useState } from "react";

import {
  Flex,
  Box,
  Heading,
  Button,
  Input,
  ModalContent,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";

// BACKEND IMPORTS

import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";

import { firestore } from "../../../../../utils/firebase";

const OptionsAccountPageModalUsername = (props) => {
  const { user, username, onClose, isFull } = props;

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [changed, setChanged] = useState(false);

  const checkUsernameExists = async (username) => {
    if (username.length >= 3) {
      const ref = firestore.doc(`usernames/${username}`);
      const { exists } = await ref.get();
      return !exists;
    }
  };

  const changeUsername = async (newUsername) => {
    const userRef = doc(firestore, "users", user.uid);

    // Delete current username

    await deleteDoc(doc(firestore, "usernames", username));

    // Add new username doc in collection

    await setDoc(doc(firestore, "usernames", newUsername), {
      user: user.uid,
    });

    await updateDoc(userRef, {
      username: newUsername,
    });

    onClose();
  };

  const reauthenticate = (error, username, password) => {
    if (error === false) {
      const credential = EmailAuthProvider.credential(user.email, password);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          setChanged(true);
          changeUsername(username);
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setPasswordState("Incorrect password");
          } else if (error.code === "auth/too-many-requests") {
            setPasswordState("Too many tries, wait a bit");
          } else {
            setPasswordState(error.code);
          }
        });
    }
  };

  const checkUsername = (username, password) => {
    let error = false;
    checkUsernameExists(username).then((value) => {
      const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

      if (username === "") {
        setUsernameState("Enter a username");

        error = true;
      } else if (value === false || !re.test(username)) {
        setUsernameState("Invalid username");

        error = true;
      } else {
        setUsernameState("");
      }

      reauthenticate(error, username, password);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    checkUsername(usernameInput.toLowerCase(), passwordInput);
  };

  return (
    <>
      {changed ? (
        <ModalContent
          bgColor={"#383838"}
          borderRadius={isFull ? "0px" : "12px"}
        >
          <Flex justifyContent={"center"} alignItems={"center"} h={"375px"}>
            <Spinner size={"lg"} color={"#FFFFFF"} />
          </Flex>
        </ModalContent>
      ) : (
        <ModalContent
          bgColor={"#383838"}
          borderRadius={isFull ? "0px" : "12px"}
        >
          <ModalCloseButton color={"#FFFFFF"} />
          <Flex justifyContent={"center"} h={"375px"}>
            <Box align={"center"} w={"90%"}>
              <Flex alignItems={"center"} h={"50px"}>
                <Heading
                  fontWeight={"medium"}
                  fontSize={"md"}
                  lineHeight={"20px"}
                  letterSpacing={"0.1em"}
                  color={"#FFFFFF"}
                >
                  Change Username
                </Heading>
              </Flex>

              <Heading
                fontWeight={"medium"}
                fontSize={"xs"}
                lineHeight={"17px"}
                letterSpacing={"0.1em"}
                color={"#C9C9C9"}
              >
                To change your username, enter a new username and your current
                password.
              </Heading>

              <form onSubmit={submitHandler}>
                <Box align={"left"} my={"15px"}>
                  <Heading
                    ml={"20px"}
                    fontWeight={"medium"}
                    fontSize={"md"}
                    lineHeight={"24px"}
                    letterSpacing={"0.1em"}
                    color={"#979797"}
                  >
                    New Username
                  </Heading>
                  <Input
                    type={"text"}
                    placeholder={`@${username}`}
                    borderRadius={"8px"}
                    color={"#FFFFFF"}
                    onChange={(e) => setUsernameInput(e.target.value)}
                  />
                  <Heading
                    ml={"20px"}
                    mt={"5px"}
                    h={"12px"}
                    fontWeight={"normal"}
                    fontSize={"xs"}
                    letterSpacing={"0.05em"}
                    color={"#FF5858"}
                  >
                    {usernameState}
                  </Heading>
                </Box>

                <Box align={"left"} my={"10px"}>
                  <Heading
                    ml={"20px"}
                    fontWeight={"medium"}
                    fontSize={"md"}
                    lineHeight={"24px"}
                    letterSpacing={"0.1em"}
                    color={"#979797"}
                  >
                    Current Password
                  </Heading>
                  <Input
                    type={"password"}
                    borderRadius={"8px"}
                    color={"#FFFFFF"}
                    onChange={(e) => setPasswordInput(e.target.value)}
                  />
                  <Heading
                    ml={"20px"}
                    mt={"5px"}
                    h={"12px"}
                    fontWeight={"normal"}
                    fontSize={"xs"}
                    letterSpacing={"0.05em"}
                    color={"#FF5858"}
                  >
                    {passwordState}
                  </Heading>
                </Box>

                <Box align={"right"} mt={"25px"} w={"90%"}>
                  <Button
                    type={"submit"}
                    background={"#FFD39F"}
                    borderRadius={"12px"}
                    bgColor={"#000000"}
                    colorScheme={"whiteAlpha"}
                  >
                    <Heading
                      fontWeight={"medium"}
                      fontSize={"md"}
                      letterSpacing={"0.05em"}
                      color={"#FFFFFF"}
                    >
                      Save
                    </Heading>
                  </Button>
                </Box>
              </form>
              <style jsx>{`
                form {
                  width: 100%;
                }
              `}</style>
            </Box>
          </Flex>
        </ModalContent>
      )}
    </>
  );
};

export default OptionsAccountPageModalUsername;
