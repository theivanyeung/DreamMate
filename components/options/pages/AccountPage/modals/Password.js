// FRONTEND IMPORTS

import { useContext, useState } from "react";

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

import { UserContext } from "../../../../../utils/context";

// BACKEND IMPORTS

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const OptionsAccountPageModalPassword = (props) => {
  const { onClose, isFull } = props;

  const { user } = useContext(UserContext);

  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState("");
  const [currentPasswordState, setCurrentPasswordState] = useState("");
  const [newPasswordState, setNewPasswordState] = useState("");
  const [confirmNewPasswordState, setConfirmNewPasswordState] = useState("");
  const [changed, setChanged] = useState(false);

  const changePassword = () => {
    let error = false;
    if (newPasswordInput !== confirmNewPasswordInput) {
      setConfirmNewPasswordState("Unmatching passwords");
      error = true;
    } else {
      setConfirmNewPasswordState("");
    }
    if (confirmNewPasswordInput < 6) {
      setNewPasswordState("Password should be at least 6 characters");
      error = true;
    } else {
      setNewPasswordState("");
    }
    if (error === false) {
      setChanged(true);
      updatePassword(user, confirmNewPasswordInput)
        .then(() => {
          onClose();
        })
        .catch((error) => {});
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPasswordInput
    );
    reauthenticateWithCredential(user, credential)
      .then(() => {
        changePassword();
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setCurrentPasswordState("Incorrect password");
        } else if (error.code === "auth/too-many-requests") {
          setCurrentPasswordState("Too many tries, wait a bit");
        } else {
          setCurrentPasswordState(error.code);
        }
      });
  };

  return (
    <>
      {changed ? (
        <ModalContent
          bgColor={"#383838"}
          borderRadius={isFull ? "0px" : "12px"}
        >
          <Flex justifyContent={"center"} alignItems={"center"} h={"450px"}>
            <Spinner size={"lg"} color={"#FFFFFF"} />
          </Flex>
        </ModalContent>
      ) : (
        <ModalContent
          bgColor={"#383838"}
          borderRadius={isFull ? "0px" : "12px"}
        >
          <ModalCloseButton color={"#FFFFFF"} />
          <Flex justifyContent={"center"} h={"450px"}>
            <Box align={"center"} w={"90%"}>
              <Flex alignItems={"center"} h={"50px"}>
                <Heading
                  fontWeight={"medium"}
                  fontSize={"md"}
                  lineHeight={"20px"}
                  letterSpacing={"0.1em"}
                  color={"#FFFFFF"}
                >
                  Update Password
                </Heading>
              </Flex>

              <Heading
                fontWeight={"medium"}
                fontSize={"xs"}
                lineHeight={"17px"}
                letterSpacing={"0.1em"}
                color={"#C9C9C9"}
              >
                To update your password, enter your current password and a new
                password.
              </Heading>

              <form onSubmit={submitHandler}>
                <Box align={"left"} h={"85px"} my={"10px"}>
                  <Heading
                    ml={"20px"}
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
                    onChange={(e) => setCurrentPasswordInput(e.target.value)}
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
                    {currentPasswordState}
                  </Heading>
                </Box>

                <Box align={"left"} h={"85px"} my={"10px"}>
                  <Heading
                    ml={"20px"}
                    fontWeight={"medium"}
                    fontSize={"md"}
                    lineHeight={"24px"}
                    letterSpacing={"0.1em"}
                    color={"#C9C9C9"}
                  >
                    New Password
                  </Heading>
                  <Input
                    type={"password"}
                    borderRadius={"8px"}
                    color={"#FFFFFF"}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
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
                    {newPasswordState}
                  </Heading>
                </Box>

                <Box align={"left"} h={"85px"} my={"10px"}>
                  <Heading
                    ml={"20px"}
                    fontWeight={"medium"}
                    fontSize={"md"}
                    lineHeight={"24px"}
                    letterSpacing={"0.1em"}
                    color={"#C9C9C9"}
                  >
                    Confirm New Password
                  </Heading>
                  <Input
                    type={"password"}
                    borderRadius={"8px"}
                    color={"#FFFFFF"}
                    onChange={(e) => setConfirmNewPasswordInput(e.target.value)}
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
                    {confirmNewPasswordState}
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

export default OptionsAccountPageModalPassword;
