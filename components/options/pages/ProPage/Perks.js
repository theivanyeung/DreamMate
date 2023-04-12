import OptionsProPagePerksBase from "./Perks/Base";
import OptionsProPagePerksFull from "./Perks/Full";

const OptionsProPagePerks = () => {
  return (
    <>
      <OptionsProPagePerksFull
        display={{
          xxl: "flex",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <OptionsProPagePerksBase
        display={{
          xxl: "none",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      />
    </>
  );
};

export default OptionsProPagePerks;
