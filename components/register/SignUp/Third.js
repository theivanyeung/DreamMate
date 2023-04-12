// FRONTEND IMPORTS

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

import { ArrowBackIcon, ChevronDownIcon } from "@chakra-ui/icons";

// ALGOLIA IMPORTS

import { schoolsIndex } from "../../../utils/algolia";

const RegisterSignUpThird = (props) => {
  const [school, setSchool] = useState("");

  const [schoolState, setSchoolState] = useState("");
  const [choiceList, setChoiceList] = useState([]);
  const [hasSelected, setHasSelected] = useState(false);

  const submitHandler = () => {
    let error = false;

    if (
      school.length === 0 ||
      choiceList.length !== 0 ||
      hasSelected === false
    ) {
      setSchoolState("Please select a school");
      error = true;
    } else {
      setSchoolState("");
    }

    if (error === false) {
      props.submitThirdHandler(school);
    }
  };

  const onChangeHandler = async (e) => {
    setSchool(e.target.value);
    setHasSelected(false);

    if (e.target.value.length !== 0) {
      const { hits } = await schoolsIndex.search(e.target.value, {
        hitsPerPage: 10,
      });
      setChoiceList(hits);
    } else {
      setChoiceList([]);
    }
  };

  return (
    <>
      <RegisterSignUpThirdFull
        school={school}
        setSchool={setSchool}
        choiceList={choiceList}
        setChoiceList={setChoiceList}
        schoolState={schoolState}
        setHasSelected={setHasSelected}
        setPageVisual={props.setPageVisual}
        submitHandler={submitHandler}
        onChangeHandler={onChangeHandler}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "flex",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <RegisterSignUpThirdBase
        school={school}
        setSchool={setSchool}
        choiceList={choiceList}
        setChoiceList={setChoiceList}
        schoolState={schoolState}
        setHasSelected={setHasSelected}
        setPageVisual={props.setPageVisual}
        submitHandler={submitHandler}
        onChangeHandler={onChangeHandler}
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

const RegisterSignUpThirdFull = (props) => {
  const {
    display,
    school,
    setSchool,
    choiceList,
    setChoiceList,
    schoolState,
    setHasSelected,
    setPageVisual,
    onChangeHandler,
  } = props;

  const submitHandler = (e) => {
    e.preventDefault();
    props.submitHandler();
  };

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      w={"750px"}
      h={"500px"}
      bgColor={"#151515"}
      borderRadius={"24px"}
      display={display}
    >
      <Button
        variant={"link"}
        my={"25px"}
        color={"#FFFFFF"}
        leftIcon={<ArrowBackIcon color={"#FFFFFF"} />}
        onClick={() => setPageVisual([true, true, false])}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"md"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          Go back
        </Heading>
      </Button>
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"75%"}
        gap={"50px"}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"5xl"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          Enter your school 🎓
        </Heading>
        <form onSubmit={submitHandler}>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
            gap={"5px"}
          >
            {/** SCHOOL INPUT */}

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={"5px"}
              w={"100%"}
            >
              <Input
                value={school}
                type={"search"}
                placeholder={"Your school"}
                size={"lg"}
                w={"100%"}
                h={"50px"}
                borderRadius={"12px"}
                boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
                border={"1px solid #FFFFFF"}
                color={"#FFFFFF"}
                onChange={onChangeHandler}
              />
              <Heading
                w={"90%"}
                h={"15px"}
                textAlign={"left"}
                fontWeight={"normal"}
                fontSize={"sm"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                {schoolState}
              </Heading>
            </Flex>

            {/** OPTIONS */}

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              w={"100%"}
              maxH={"150px"}
              gap={"5px"}
              overflowX={"hidden"}
              overflowY={"auto"}
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
              {choiceList.map((choice, index) => (
                <Button
                  key={index}
                  w={"100%"}
                  colorScheme={"whiteAlpha"}
                  onClick={() => {
                    setSchool(choice.school);
                    setChoiceList([]);
                    setHasSelected(true);
                  }}
                >
                  <Heading
                    fontWeight={"normal"}
                    fontSize={"xl"}
                    letterSpacing={"0.05em"}
                    my={"10px"}
                    w={"100%"}
                    textAlign={"left"}
                  >
                    {choice.school}
                  </Heading>
                </Button>
              ))}
            </Flex>
          </Flex>
          <Link href={"/home"}>
            <Button
              type={"submit"}
              mt={"25px"}
              w={"100px"}
              h={"40px"}
              borderRadius={"12px"}
              boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
              onClick={submitHandler}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"xl"}
                letterSpacing={"0.05em"}
              >
                Create
              </Heading>
            </Button>
          </Link>
        </form>
        <style jsx>{`
          form {
            width: 100%;
          }
        `}</style>
      </Flex>
    </Flex>
  );
};

const RegisterSignUpThirdBase = (props) => {
  const {
    display,
    school,
    setSchool,
    choiceList,
    setChoiceList,
    schoolState,
    setHasSelected,
    setPageVisual,
    onChangeHandler,
  } = props;

  const submitHandler = (e) => {
    e.preventDefault();
    props.submitHandler();
  };

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      w={"100%"}
      display={display}
    >
      <Button
        variant={"link"}
        my={"25px"}
        leftIcon={<ArrowBackIcon />}
        onClick={() => setPageVisual([true, true, false])}
      >
        <Heading fontWeight={"medium"} fontSize={"md"} letterSpacing={"0.05em"}>
          Go back
        </Heading>
      </Button>
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"75%"}
        gap={"50px"}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"3xl"}
          letterSpacing={"0.05em"}
        >
          Enter your school 🎓
        </Heading>

        <form onSubmit={submitHandler}>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
            gap={"5px"}
          >
            {/** SCHOOL INPUT */}

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={"5px"}
              w={"100%"}
            >
              <Input
                value={school}
                type={"search"}
                placeholder={"Your school"}
                size={"lg"}
                w={"100%"}
                h={"50px"}
                borderRadius={"12px"}
                boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
                onChange={onChangeHandler}
              />
              <Heading
                w={"90%"}
                h={"15px"}
                textAlign={"left"}
                fontWeight={"normal"}
                fontSize={"sm"}
                letterSpacing={"0.05em"}
                color={"#000000"}
              >
                {schoolState}
              </Heading>
            </Flex>

            {/** OPTIONS */}

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              mb={"15px"}
              w={"100%"}
              maxH={"150px"}
              gap={"5px"}
              overflowX={"hidden"}
              overflowY={"auto"}
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
              {choiceList.map((choice, index) => (
                <Button
                  key={index}
                  w={"100%"}
                  colorScheme={"blackAlpha"}
                  bgColor={"#151515"}
                  onClick={() => {
                    setSchool(choice.school);
                    setChoiceList([]);
                    setHasSelected(true);
                  }}
                >
                  <Heading
                    fontWeight={"normal"}
                    fontSize={"xl"}
                    letterSpacing={"0.05em"}
                    my={"10px"}
                    w={"100%"}
                    textAlign={"left"}
                  >
                    {choice.school}
                  </Heading>
                </Button>
              ))}
            </Flex>
          </Flex>
          <Button
            w={"100px"}
            h={"40px"}
            borderRadius={"12px"}
            bgColor={"#000000"}
            boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
            onClick={submitHandler}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"xl"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              Create
            </Heading>
          </Button>
        </form>
        <style jsx>{`
          form {
            width: 100%;
          }
        `}</style>
      </Flex>
    </Flex>
  );
};

export default RegisterSignUpThird;
