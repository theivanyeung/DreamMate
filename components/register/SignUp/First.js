// FRONTEND IMPORTS

import { useState } from "react";

import validator from "validator";

import { Box, Flex, Heading, Input, Button } from "@chakra-ui/react";

// BACKEND IMPORTS

import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../utils/firebase";

const RegisterSignUpFirst = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameState, setUsernameState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  const submitHandler = async () => {
    let error = false;

    const re = /^(?=[a-zA-Z0-9._]{3,30}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (username.length === 0) {
      setUsernameState("Enter your username");
      error = true;
    } else if (username.length < 2) {
      setUsernameState("Too short");
      error = true;
    } else if (username.length > 32) {
      setUsernameState("Too long");
      error = true;
    } else if (!re.test(username)) {
      setUsernameState("Invalid username");
      error = true;
    } else {
      setUsernameState("");
    }

    if (email.length === 0) {
      setEmailState("Enter your email");
      error = true;
    } else if (!validator.isEmail(email)) {
      setEmailState("Invalid email");
      error = true;
    } else {
      setEmailState("");
    }

    if (password === "") {
      setPasswordState("Enter your password");
      error = true;
    } else if (password.length < 6) {
      setPasswordState("Password should be at least 6 characters");
      error = true;
    } else {
      setPasswordState("");
    }

    if (error === false) {
      serverErrorHandler();
    }
  };

  const serverErrorHandler = async () => {
    let error = false;

    const usernameRef = doc(firestore, "usernames", `${username}`);
    const usernameSnap = await getDoc(usernameRef);
    const emailRef = doc(firestore, "emails", `${email}`);
    const emailSnap = await getDoc(emailRef);

    if (usernameSnap.exists()) {
      setUsernameState("Username is taken");
      error = true;
    } else {
      setUsernameState("");
    }

    if (emailSnap.exists()) {
      if (emailSnap.data().hasAccount) {
        setEmailState("Account exists fucker");
        error = true;
      } else {
        setEmailState("");
      }
    } else {
      setEmailState("");
    }

    if (error === false) {
      props.submitFirstHandler(username, email, password);
      props.setPageVisual([true, true, false]);
    }
  };

  return (
    <>
      <RegisterSignUpFirstFull
        username={username}
        email={email}
        password={password}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        usernameState={usernameState}
        emailState={emailState}
        passwordState={passwordState}
        submitHandler={submitHandler}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "flex",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <RegisterSignUpFirstBase
        username={username}
        email={email}
        password={password}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        usernameState={usernameState}
        emailState={emailState}
        passwordState={passwordState}
        submitHandler={submitHandler}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      />
    </>
  );
};

const RegisterSignUpFirstFull = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    props.submitHandler();
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"750px"}
      h={"500px"}
      bgColor={"#151515"}
      borderRadius={"24px"}
      display={props.display}
    >
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"75%"}
        gap={"50px"}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"5xl"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          Create your account 🔥
        </Heading>
        <form onSubmit={submitHandler}>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
            gap={"15px"}
          >
            {/** USERNAME INPUT  */}

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={"5px"}
              w={"100%"}
            >
              <Flex
                justifyContent={"flex-end"}
                alignItems={"center"}
                w={"100%"}
                h={"50px"}
                borderRadius={"12px"}
                boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
                border={"1px solid #FFFFFF"}
              >
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  w={"97%"}
                  h={"100%"}
                  gap={"15px"}
                >
                  <Heading
                    fontWeight={"normal"}
                    fontSize={"lg"}
                    letterSpacing={"0.05em"}
                    color={"#FFFFFF"}
                  >
                    dreammate.io/
                  </Heading>
                  <Input
                    value={props.username}
                    type={"text"}
                    placeholder={"username"}
                    size={"lg"}
                    variant={"unstyled"}
                    h={"100%"}
                    color={"#FFFFFF"}
                    onChange={(e) => props.setUsername(e.target.value)}
                  />
                </Flex>
              </Flex>
              <Heading
                w={"90%"}
                h={"15px"}
                textAlign={"left"}
                fontWeight={"normal"}
                fontSize={"sm"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                {props.usernameState}
              </Heading>
            </Flex>

            {/** EMAIL INPUT */}

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={"5px"}
              w={"100%"}
            >
              <Input
                value={props.email}
                type={"email"}
                placeholder={"Email"}
                size={"lg"}
                w={"100%"}
                h={"50px"}
                borderRadius={"12px"}
                boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
                border={"1px solid #FFFFFF"}
                color={"#FFFFFF"}
                onChange={(e) => props.setEmail(e.target.value)}
              />
              <Heading
                w={"90%"}
                h={"15px"}
                textAlign={"left"}
                fontWeight={"normal"}
                fontSize={"sm"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                {props.emailState}
              </Heading>
            </Flex>

            {/** PASSWORD INPUT */}

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={"5px"}
              w={"100%"}
            >
              <Input
                type={"password"}
                placeholder={"Password"}
                size={"lg"}
                w={"100%"}
                h={"50px"}
                borderRadius={"12px"}
                boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
                border={"1px solid #FFFFFF"}
                color={"#FFFFFF"}
                onChange={(e) => props.setPassword(e.target.value)}
              />
              <Heading
                w={"90%"}
                h={"15px"}
                textAlign={"left"}
                fontWeight={"normal"}
                fontSize={"sm"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                {props.passwordState}
              </Heading>
            </Flex>
          </Flex>
          <Button
            type={"submit"}
            mt={"15px"}
            w={"100px"}
            h={"40px"}
            borderRadius={"12px"}
            boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
            onClick={submitHandler}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"xl"}
              letterSpacing={"0.05em"}
            >
              Next
            </Heading>
          </Button>
        </form>
        <style jsx>{`
          form {
            width: 100%;
          }
        `}</style>
      </Flex>
    </Flex>
  );
};

const RegisterSignUpFirstBase = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    props.submitHandler();
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      display={props.display}
    >
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"90%"}
        gap={"50px"}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"3xl"}
          letterSpacing={"0.05em"}
        >
          Create your account 🔥
        </Heading>

        <form onSubmit={submitHandler}>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
            gap={"25px"}
          >
            {/** USERNAME INPUT */}

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={"5px"}
              w={"100%"}
            >
              <Flex
                justifyContent={"flex-end"}
                alignItems={"center"}
                w={"100%"}
                h={"50px"}
                borderRadius={"12px"}
                boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
              >
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  w={"97%"}
                  h={"100%"}
                  gap={"15px"}
                >
                  <Heading
                    fontWeight={"normal"}
                    fontSize={"lg"}
                    letterSpacing={"0.05em"}
                  >
                    dreammate.io/
                  </Heading>
                  <Input
                    value={props.username}
                    type={"text"}
                    placeholder={"username"}
                    size={"lg"}
                    variant={"unstyled"}
                    h={"100%"}
                    onChange={(e) => props.setUsername(e.target.value)}
                  />
                </Flex>
              </Flex>
              <Heading
                w={"90%"}
                h={"15px"}
                textAlign={"left"}
                fontWeight={"normal"}
                fontSize={"sm"}
                letterSpacing={"0.05em"}
                color={"#000000"}
              >
                {props.usernameState}
              </Heading>
            </Flex>

            {/** EMAIL INPUT */}

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={"5px"}
              w={"100%"}
            >
              <Input
                value={props.email}
                type={"email"}
                placeholder={"Email"}
                size={"lg"}
                w={"100%"}
                h={"50px"}
                borderRadius={"12px"}
                boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
                border={"1px solid #000000"}
                onChange={(e) => props.setEmail(e.target.value)}
              />
              <Heading
                w={"90%"}
                h={"15px"}
                textAlign={"left"}
                fontWeight={"normal"}
                fontSize={"sm"}
                letterSpacing={"0.05em"}
                color={"#000000"}
              >
                {props.emailState}
              </Heading>
            </Flex>

            {/** PASSWORD INPUT */}

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={"5px"}
              w={"100%"}
            >
              <Input
                value={props.password}
                type={"password"}
                placeholder={"Password"}
                size={"lg"}
                w={"100%"}
                h={"50px"}
                borderRadius={"12px"}
                boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
                border={"1px solid #000000"}
                onChange={(e) => props.setPassword(e.target.value)}
              />
              <Heading
                w={"90%"}
                h={"15px"}
                textAlign={"left"}
                fontWeight={"normal"}
                fontSize={"sm"}
                letterSpacing={"0.05em"}
                color={"#000000"}
              >
                {props.passwordState}
              </Heading>
            </Flex>
          </Flex>
          <Button
            type={"submit"}
            w={"100px"}
            h={"40px"}
            bgColor={"#000000"}
            borderRadius={"12px"}
            boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
            onClick={submitHandler}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"xl"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              Next
            </Heading>
          </Button>
        </form>
        <style jsx>{`
          form {
            width: 100%;
          }
        `}</style>
      </Flex>
    </Flex>
  );
};

export default RegisterSignUpFirst;
