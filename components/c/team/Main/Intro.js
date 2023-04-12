import TeamMainIntroBase from "./Intro/Base";
import TeamMainIntroFull from "./Intro/Full";

const TeamMainIntro = (props) => {
  return (
    <>
      <TeamMainIntroFull
        member={props.member}
        index={props.index}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "flex",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <TeamMainIntroBase
        member={props.member}
        index={props.index}
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

export default TeamMainIntro;
