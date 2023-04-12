import RegisterLayoutHeaderPageFull from "./Page/Full";
import RegisterLayoutHeaderPageBase from "./Page/Base";

const RegisterLayoutHeaderPage = (props) => {
  return (
    <>
      <RegisterLayoutHeaderPageFull
        register={props.register}
        pageVisual={props.pageVisual}
        chooseRegisterHandler={props.chooseRegisterHandler}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "none",
          base: "none",
        }}
      />
      <RegisterLayoutHeaderPageBase
        register={props.register}
        pageVisual={props.pageVisual}
        chooseRegisterHandler={props.chooseRegisterHandler}
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

export default RegisterLayoutHeaderPage;
