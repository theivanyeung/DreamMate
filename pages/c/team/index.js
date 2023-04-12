import { Box } from "@chakra-ui/react";

import SEO from "../../../components/SEO";
import TeamMain from "../../../components/c/team/Main";
import LayoutFooter from "../../../components/c/layout/Footer";

import {
  TEAM_SEO_TITLE,
  TEAM_SEO_DESCRIPTION,
  TEAM_SEO_KEYWORDS,
  TEAM_PRODUCTION_URL,
  TEAM_SEO_IMAGE,
} from "../../../components/constants";

import { TeamMembers } from "../../../components/items";

const Team = () => {
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
        title={TEAM_SEO_TITLE}
        description={TEAM_SEO_DESCRIPTION}
        keywords={TEAM_SEO_KEYWORDS}
        image={TEAM_SEO_IMAGE}
        url={TEAM_PRODUCTION_URL}
      />
      <Box align={"center"} overflow={"hidden"}>
        {TeamMembers.map((member, index) => (
          <TeamMain key={index} member={member} index={index} />
        ))}
        <LayoutFooter />
      </Box>
    </Box>
  );
};

export default Team;

Team.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
