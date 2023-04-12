import { Box, Flex, useToast } from "@chakra-ui/react";

import SEO from "../../../components/SEO";
import LayoutHeader from "../../../components/c/layout/Header";
import ContactForm from "../../../components/c/contact/Form";
import LayoutFooter from "../../../components/c/layout/Footer";

import {
  CONTACT_SEO_TITLE,
  CONTACT_SEO_DESCRIPTION,
  CONTACT_SEO_KEYWORDS,
  CONTACT_PRODUCTION_URL,
  CONTACT_SEO_IMAGE,
} from "../../../components/constants";

const Contact = () => {
  const toast = useToast();

  const submitContactForm = async (email, subject, message) => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          subject: subject,
          message: message,
        }),
      });
      toast({
        title: "Contact form submitted!",
        description: "We'll respond back to you within 1-2 days!",
        status: "success",
        variant: "subtle",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: `${error}`,
        status: "error",
        variant: "subtle",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
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
        title={CONTACT_SEO_TITLE}
        description={CONTACT_SEO_DESCRIPTION}
        keywords={CONTACT_SEO_KEYWORDS}
        image={CONTACT_SEO_IMAGE}
        url={CONTACT_PRODUCTION_URL}
      />
      <Box bgColor={"#151515"}>
        <LayoutHeader page={"Contact"} />
      </Box>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"#151515"}
      >
        <ContactForm submitContactForm={submitContactForm} />
      </Flex>
      <LayoutFooter />
    </Box>
  );
};

export default Contact;

Contact.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
