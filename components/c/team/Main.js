import { Box } from "@chakra-ui/react";

import LayoutHeader from "../layout/Header";
import TeamMainIntro from "./Main/Intro";

const TeamMain = (props) => {
  return (
    <>
      <Box
        w={"100vw"}
        h={"48.38vw"}
        bgSize={"cover"}
        bgPosition={"center"}
        bgRepeat={"none"}
        bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5)), url('${props.member.src}')`}
        alt={props.member.alt}
        display={{
          xxl: "block",
          xl: "block",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      >
        {props.index === 0 && <LayoutHeader page={"Team"} />}
        <TeamMainIntro member={props.member} index={props.index} />
      </Box>

      <Box
        w={"100vw"}
        h={"483.33px"}
        bgSize={"cover"}
        bgPosition={"center"}
        bgRepeat={"none"}
        bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5)), url('${props.member.src}')`}
        alt={props.member.alt}
        display={{
          xxl: "none",
          xl: "none",
          lg: "block",
          md: "block",
          sm: "block",
          base: "block",
        }}
      >
        {props.index === 0 && <LayoutHeader page={"Team"} />}
        <TeamMainIntro member={props.member} index={props.index} />
      </Box>
    </>
  );
};

export default TeamMain;
