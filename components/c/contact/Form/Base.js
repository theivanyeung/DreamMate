import { useState } from "react";

import {
  Box,
  Flex,
  Heading,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";

import { EmailValidator } from "../../../functions";

const ContactFormBase = (props) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const toast = useToast();

  const submitContactForm = (e) => {
    e.preventDefault();
    if (errorHandler === false) {
      props.submitContactForm(email, subject, message);
    }
  };

  const errorHandler = () => {
    let error = false;
    if (!EmailValidator(email)) {
      toast({
        title: "Invalid email.",
        description: "Please input a valid email. Thanks!",
        status: "error",
        variant: "subtle",
        duration: 5000,
        isClosable: true,
      });
      error = true;
    }
    if (subject === "") {
      toast({
        title: "Empty subject.",
        description: "Please input a subject. Thanks!",
        status: "error",
        variant: "subtle",
        duration: 5000,
        isClosable: true,
      });
      error = true;
    }
    if (message === "") {
      toast({
        title: "Empty message.",
        description: "Please input a message. Thanks!",
        status: "error",
        variant: "subtle",
        duration: 5000,
        isClosable: true,
      });
      error = true;
    }
    return error;
  };

  return (
    <Box w={"85.085vw"} display={props.display}>
      <Heading
        w={"100%"}
        textAlign={"center"}
        fontWeight={"light"}
        fontSize={"lg"}
        color={"#FFFFFF"}
        letterSpacing={"0.05em"}
      >
        👋 Contact us through the form below for any inquires, interest in
        joining the team, or just to say hi! We&#39;ll reply back in a day!
      </Heading>
      <form onSubmit={submitContactForm}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Heading
            w={"100%"}
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"md"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            Email
          </Heading>
          <Input
            value={email}
            mt={"10px"}
            type={"email"}
            placeholder={"Email"}
            size={"lg"}
            color={"white"}
            isRequired
            onChange={(e) => setEmail(e.target.value)}
          />
          <Heading
            w={"100%"}
            textAlign={"left"}
            mt={"35px"}
            fontWeight={"light"}
            fontSize={"md"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            Subject
          </Heading>
          <Input
            value={subject}
            mt={"10px"}
            type={"text"}
            placeholder={"Subject"}
            size={"lg"}
            color={"white"}
            isRequired
            onChange={(e) => setSubject(e.target.value)}
          />
          <Heading
            w={"100%"}
            textAlign={"left"}
            mt={"35px"}
            fontWeight={"light"}
            fontSize={"md"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            Message
          </Heading>
          <Textarea
            value={message}
            mt={"10px"}
            type={"text"}
            placeholder={"Message"}
            size={"lg"}
            color={"white"}
            isRequired
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type={"submit"}
            mt={"35px"}
            w={"150px"}
            borderRadius={"12px"}
            boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
            onClick={submitContactForm}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              letterSpacing={"0.05em"}
            >
              Submit
            </Heading>
          </Button>
        </Flex>
      </form>
      <style jsx>{`
        form {
          width: 100%;
          margin-top: 50px;
          margin-bottom: 100px;
        }
      `}</style>
    </Box>
  );
};

export default ContactFormBase;
