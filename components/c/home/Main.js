import HomeMainIntro from "./Main/Intro";
import HomeMainSocials from "./Main/Socials";

const HomeMain = (props) => {
  return (
    <>
      <HomeMainIntro submitEmail={props.submitEmail} />
      <HomeMainSocials />
    </>
  );
};

export default HomeMain;
