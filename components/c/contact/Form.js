import { Box } from "@chakra-ui/react";
import ContactFormBase from "./Form/Base";

import ContactFormFull from "./Form/Full";

const ContactForm = (props) => {
  return (
    <Box mt={"50px"} mb={"100px"}>
      <ContactFormFull
        submitContactForm={props.submitContactForm}
        display={{
          xxl: "block",
          xl: "block",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <ContactFormBase
        submitContactForm={props.submitContactForm}
        display={{
          xxl: "none",
          xl: "none",
          lg: "block",
          md: "block",
          sm: "block",
          base: "block",
        }}
      />
    </Box>
  );
};

export default ContactForm;
