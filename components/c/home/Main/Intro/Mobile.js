import HomeMainIntroMobileFull from "./Mobile/Full";
import HomeMainIntroMobileBase from "./Mobile/Base";

const HomeMainIntroMobile = (props) => {
  return (
    <>
      <HomeMainIntroMobileFull
        display={props.fullDisplay}
        submitEmail={props.submitEmail}
      />
      <HomeMainIntroMobileBase
        display={props.baseDisplay}
        submitEmail={props.submitEmail}
      />
    </>
  );
};

export default HomeMainIntroMobile;
