// FRONTEND IMPORTS

import { Box, Button, Divider, Flex, useToast } from "@chakra-ui/react";

import SEO from "../components/SEO";
import LayoutHeader from "../components/c/layout/Header";
import HomeMain from "../components/c/home/Main";
import HomeInform from "../components/c/home/Inform";
import HomeDescription from "../components/c/home/Description";
import LayoutFooter from "../components/c/layout/Footer";

import {
  HOME_SEO_TITLE,
  HOME_SEO_DESCRIPTION,
  HOME_SEO_KEYWORDS,
  HOME_PRODUCTION_URL,
  HOME_SEO_IMAGE,
} from "../components/constants";

// BACKEND IMPORTS

import firebase from "firebase/compat/app";

import { firestore } from "../utils/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import { faker } from "@faker-js/faker";

const Index = () => {
  const toast = useToast();

  const sendWelcomeEmail = async (email) => {
    try {
      await fetch("/api/welcome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitEmail = (email) => {
    // Store email

    firestore
      .collection("emails")
      .doc(email)
      .set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        toast({
          title: "Email submitted!",
          description: "Check your email for more info!",
          status: "success",
          variant: "subtle",
          duration: 5000,
          isClosable: true,
        });
        sendWelcomeEmail(email);
      })
      .catch((error) => {
        toast({
          title: "Email already exists",
          description: "Wow, you're already in! Thanks!",
          status: "info",
          variant: "subtle",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      overflowX={"hidden"}
      overflowY={"scroll"}
      sx={{
        "::-webkit-scrollbar": {
          width: "5px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#455765",
          borderRadius: "10px",
        },
      }}
    >
      <SEO
        title={HOME_SEO_TITLE}
        description={HOME_SEO_DESCRIPTION}
        keywords={HOME_SEO_KEYWORDS}
        image={HOME_SEO_IMAGE}
        url={HOME_PRODUCTION_URL}
      />
      <Box align={"center"} bgColor={"#FEFEFE"}>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          w={"100vw"}
          h={"900px"}
          bgColor={"#151515"}
        >
          <LayoutHeader />
          <HomeMain submitEmail={submitEmail} />
        </Flex>
        <HomeInform />
        <Divider />
        <HomeDescription />
        <LayoutFooter />
      </Box>
    </Box>
  );
};

export default Index;

Index.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
