import HomeMainSocialsFull from "./Socials/Full";
import HomeMainSocialsBase from "./Socials/Base";

const HomeMainSocials = () => {
  return (
    <>
      <HomeMainSocialsFull
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "none",
          base: "none",
        }}
      />
      <HomeMainSocialsBase
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "flex",
          base: "flex",
        }}
      />
    </>
  );
};

export default HomeMainSocials;
