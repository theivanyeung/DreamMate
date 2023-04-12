import { useState } from "react";

import RegisterSignUpFirst from "./SignUp/First";
import RegisterSignUpSecond from "./SignUp/Second";
import RegisterSignUpThird from "./SignUp/Third";

const RegisterSignUp = (props) => {
  const [realUsername, setRealUsername] = useState("");
  const [realEmail, setRealEmail] = useState("");
  const [realPassword, setRealPassword] = useState("");
  const [realFirstName, setRealFirstName] = useState("");
  const [realLastName, setRealLastName] = useState("");
  const [realMonth, setRealMonth] = useState("");
  const [realNumMonth, setRealNumMonth] = useState("");
  const [realDay, setRealDay] = useState("");
  const [realYear, setRealYear] = useState("");

  const submitFirstHandler = (username, email, password) => {
    setRealUsername(username);
    setRealEmail(email);
    setRealPassword(password);
  };

  const submitSecondHandler = (
    firstName,
    lastName,
    month,
    numMonth,
    day,
    year
  ) => {
    setRealFirstName(firstName);
    setRealLastName(lastName);
    setRealMonth(month);
    setRealNumMonth(numMonth);
    setRealDay(day);
    setRealYear(year);
  };

  const submitThirdHandler = (school, choice) => {
    props.submitSignUpHandler(
      realUsername,
      realEmail,
      realPassword,
      realFirstName,
      realLastName,
      realMonth,
      realNumMonth,
      realDay,
      realYear,
      school,
    );
  };

  return (
    <>
      {(() => {
        if (props.pageVisual[2] === true) {
          return (
            <RegisterSignUpThird
              setPageVisual={props.setPageVisual}
              submitThirdHandler={submitThirdHandler}
            />
          );
        } else if (props.pageVisual[1] === true) {
          return (
            <RegisterSignUpSecond
              setPageVisual={props.setPageVisual}
              submitSecondHandler={submitSecondHandler}
            />
          );
        } else {
          return (
            <RegisterSignUpFirst
              setPageVisual={props.setPageVisual}
              submitFirstHandler={submitFirstHandler}
            />
          );
        }
      })()}
    </>
  );
};

export default RegisterSignUp;
