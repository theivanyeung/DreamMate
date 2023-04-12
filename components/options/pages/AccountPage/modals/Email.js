// FRONTEND IMPORTS

import { useState, useContext } from "react";

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

import validator from "validator";

import { UserContext } from "../../../../../utils/context";

// BACKEND IMPORTS

import firebase from "firebase/compat/app";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { firestore } from "../../../../../utils/firebase";

const OptionsAccountPageModalEmail = (props) => {
  const { onClose, isFull } = props;

  const { user } = useContext(UserContext);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [changed, setChanged] = useState(false);

  const updateEmailDocs = async () => {
    const emailRef = doc(firestore, "emails", emailInput);
    const emailSnap = await getDoc(emailRef);
    if (!emailSnap.exists()) {
      await setDoc(emailRef, {
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    onClose();
  };

  const changeEmail = async (email) => {
    setChanged(true);
    updateEmail(user, email)
      .then(() => {
        updateEmailDocs();
      })
      .catch((error) => {});
  };

  const reauthenticate = (error, email, password) => {
    if (error === false) {
      const credential = EmailAuthProvider.credential(user.email, password);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          changeEmail(email);
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

  const checkEmailExists = async (email) => {
    const ref = firestore.doc(`emails/${email}`);
    const { exists } = await ref.get();
    return !exists;
  };

  const checkEmail = (email, password) => {
    let error = false;
    checkEmailExists(email).then((value) => {
      if (email.length === 0) {
        setEmailState("Enter your email");
        error = true;
      } else if (!validator.isEmail(email) || !value) {
        setEmailState("Invalid email");
        error = true;
      } else {
        setEmailState("");
      }

      reauthenticate(error, email, password);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    checkEmail(emailInput, passwordInput);
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
                  Change Email
                </Heading>
              </Flex>

              <Heading
                fontWeight={"medium"}
                fontSize={"xs"}
                lineHeight={"17px"}
                letterSpacing={"0.1em"}
                color={"#C9C9C9"}
              >
                To change your email, enter a new email and your current
                password.
              </Heading>

              <Box align={"left"} my={"25px"}>
                <Heading
                  ml={"20px"}
                  mb={"5px"}
                  fontWeight={"medium"}
                  fontSize={"md"}
                  lineHeight={"24px"}
                  letterSpacing={"0.1em"}
                  color={"#C9C9C9"}
                >
                  New Email
                </Heading>
                <Input
                  type={"email"}
                  borderRadius={"8px"}
                  color={"#FFFFFF"}
                  onChange={(e) => setEmailInput(e.target.value)}
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
                  {emailState}
                </Heading>
              </Box>

              <Box align={"left"} my={"25px"}>
                <Heading
                  ml={"20px"}
                  mb={"5px"}
                  fontWeight={"medium"}
                  fontSize={"md"}
                  lineHeight={"24px"}
                  letterSpacing={"0.1em"}
                  color={"#C9C9C9"}
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

              <Box align={"right"} w={"90%"}>
                <Button
                  type={"submit"}
                  background={"#FFD39F"}
                  borderRadius={"12px"}
                  colorScheme={"whiteAlpha"}
                  bgColor={"#000000"}
                  onClick={submitHandler}
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"md"}
                    letterSpacing={"0.05em"}
                    color={"#FFFFFF"}
                  >
                    Next
                  </Heading>
                </Button>
              </Box>
            </Box>
          </Flex>
        </ModalContent>
      )}
    </>
  );
};

export default OptionsAccountPageModalEmail;
