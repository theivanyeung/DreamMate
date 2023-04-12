import { useState } from "react";

import RegisterSignInFull from "./SignIn/Full";
import RegisterSignInBase from "./SignIn/Base";

const RegisterSignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    let error = false;

    if (email.length === 0) {
      setErrorState("Invalid username or email");
      error = true;
    } else {
      setErrorState("");
    }

    if (password.length === 0) {
      setErrorState("Invalid username or email");
      error = true;
    } else {
      setErrorState("");
    }

    if (error === false) {
      props.submitSignInHandler(email, password, setErrorState);
    }
  };

  return (
    <>
      <RegisterSignInFull
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        errorState={errorState}
        submitHandler={submitHandler}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "flex",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <RegisterSignInBase
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        errorState={errorState}
        submitHandler={submitHandler}
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

export default RegisterSignIn;
