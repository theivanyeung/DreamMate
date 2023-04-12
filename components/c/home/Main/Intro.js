import { Box } from "@chakra-ui/react";

import HomeMainIntroDesktop from "./Intro/Desktop";
import HomeMainIntroTablet from "./Intro/Tablet";
import HomeMainIntroMobile from "./Intro/Mobile";

const HomeMainIntro = (props) => {
  return (
    <Box w={"100%"}>
      <HomeMainIntroDesktop
        submitEmail={props.submitEmail}
        display={{
          "2xl": "flex",
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <HomeMainIntroTablet
        submitEmail={props.submitEmail}
        display={{
          "2xl": "none",
          xxl: "flex",
          xl: "flex",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <HomeMainIntroMobile
        submitEmail={props.submitEmail}
        fullDisplay={{
          "2xl": "none",
          xxl: "none",
          xl: "none",
          lg: "flex",
          md: "flex",
          sm: "none",
          base: "none",
        }}
        baseDisplay={{
          "2xl": "none",
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "flex",
          base: "flex",
        }}
      />
    </Box>
  );
};

export default HomeMainIntro;
