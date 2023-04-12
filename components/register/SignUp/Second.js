import { useState } from "react";

import validator from "validator";

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
import { Day, Month, Year } from "../../items";

const RegisterSignUpSecond = (props) => {
  const [month, setMonth] = useState("Month");
  const [numMonth, setNumMonth] = useState("");
  const [day, setDay] = useState("Day");
  const [year, setYear] = useState("Year");

  const [firstNameState, setFirstNameState] = useState("");
  const [lastNameState, setLastNameState] = useState("");
  const [dateState, setDateState] = useState("");

  const submitHandler = (firstName, lastName) => {
    let error = false;

    if (firstName.length === 0) {
      setFirstNameState("Enter your first name");
      error = true;
    } else {
      setFirstNameState("");
    }

    if (lastName.length === 0) {
      setLastNameState("Enter your last name");
      error = true;
    } else {
      setLastNameState("");
    }

    if (month === "Select" || day === "" || year === "Select") {
      setDateState("Add your DoB");
      error = true;
    } else if (!validator.isDate(`${year}/${day}/${numMonth}`)) {
      setDateState("Invalid date");
      error = true;
    } else {
      setDateState("");
    }

    if (error === false) {
      props.submitSecondHandler(
        firstName,
        lastName,
        month,
        numMonth,
        day,
        year
      );
    }

    props.setPageVisual([true, true, true]);
  };

  return (
    <>
      <RegisterSignUpSecondFull
        month={month}
        day={day}
        year={year}
        setMonth={setMonth}
        setNumMonth={setNumMonth}
        setDay={setDay}
        setYear={setYear}
        firstNameState={firstNameState}
        lastNameState={lastNameState}
        dateState={dateState}
        submitHandler={submitHandler}
        setPageVisual={props.setPageVisual}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "flex",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <RegisterSignUpSecondBase
        month={month}
        day={day}
        year={year}
        setMonth={setMonth}
        setNumMonth={setNumMonth}
        setDay={setDay}
        setYear={setYear}
        firstNameState={firstNameState}
        lastNameState={lastNameState}
        dateState={dateState}
        submitHandler={submitHandler}
        setPageVisual={props.setPageVisual}
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

const RegisterSignUpSecondFull = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    props.submitHandler(firstName, lastName);
  };

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      w={"750px"}
      h={"500px"}
      bgColor={"#151515"}
      borderRadius={"24px"}
      display={props.display}
    >
      <Button
        variant={"link"}
        my={"25px"}
        color={"#FFFFFF"}
        leftIcon={<ArrowBackIcon color={"#FFFFFF"} />}
        onClick={() => props.setPageVisual([true, false, false])}
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
        gap={"25px"}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"5xl"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          Add your credentials 💪
        </Heading>
        <form onSubmit={submitHandler}>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
            gap={"25px"}
          >
            {/** FIRST NAME INPUT */}

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={"5px"}
              w={"100%"}
            >
              <Input
                value={firstName}
                type={"text"}
                placeholder={"First Name"}
                size={"lg"}
                w={"100%"}
                h={"50px"}
                borderRadius={"12px"}
                boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
                border={"1px solid #FFFFFF"}
                color={"#FFFFFF"}
                onChange={(e) => setFirstName(e.target.value)}
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
                {props.firstNameState}
              </Heading>
            </Flex>

            {/** LAST NAME INPUT */}

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={"5px"}
              w={"100%"}
            >
              <Input
                value={lastName}
                type={"text"}
                placeholder={"Last Name"}
                size={"lg"}
                w={"100%"}
                h={"50px"}
                borderRadius={"12px"}
                boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
                border={"1px solid #FFFFFF"}
                color={"#FFFFFF"}
                onChange={(e) => setLastName(e.target.value)}
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
                {props.lastNameState}
              </Heading>
            </Flex>

            {/** DOB INPUT */}

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={"5px"}
              w={"100%"}
            >
              <Flex justifyContent={"space-between"} w={"100%"}>
                <Menu>
                  <MenuButton
                    as={Button}
                    w={"35%"}
                    h={"50px"}
                    borderRadius={"12px"}
                    boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
                    border={"1px solid #FFFFFF"}
                    fontWeight={"normal"}
                    fontSize={"lg"}
                    letterSpacing={"0.05em"}
                    color={"#FFFFFF"}
                    colorScheme={"whiteAlpha"}
                    rightIcon={<ChevronDownIcon />}
                  >
                    {props.month}
                  </MenuButton>
                  <MenuList
                    h={"200px"}
                    overflowY={"scroll"}
                    boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
                    sx={{
                      "::-webkit-scrollbar": {
                        width: "5px",
                      },
                      "::-webkit-scrollbar-thumb": {
                        background: "#777777",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    {Month.map((item, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          props.setMonth(item.month);
                          props.setNumMonth(item.num);
                        }}
                      >
                        {item.month}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton
                    as={Button}
                    w={"25%"}
                    h={"50px"}
                    borderRadius={"12px"}
                    boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
                    border={"1px solid #FFFFFF"}
                    fontWeight={"normal"}
                    fontSize={"lg"}
                    letterSpacing={"0.05em"}
                    color={"#FFFFFF"}
                    colorScheme={"whiteAlpha"}
                    rightIcon={<ChevronDownIcon />}
                  >
                    {props.day}
                  </MenuButton>
                  <MenuList
                    h={"200px"}
                    overflowY={"scroll"}
                    boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
                    sx={{
                      "::-webkit-scrollbar": {
                        width: "5px",
                      },
                      "::-webkit-scrollbar-thumb": {
                        background: "#777777",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    {Day.map((item, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => props.setDay(item.day)}
                      >
                        {item.day}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton
                    as={Button}
                    w={"30%"}
                    h={"50px"}
                    borderRadius={"12px"}
                    boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
                    border={"1px solid #FFFFFF"}
                    fontWeight={"normal"}
                    fontSize={"lg"}
                    letterSpacing={"0.05em"}
                    color={"#FFFFFF"}
                    colorScheme={"whiteAlpha"}
                    rightIcon={<ChevronDownIcon />}
                  >
                    {props.year}
                  </MenuButton>
                  <MenuList
                    h={"200px"}
                    overflowY={"scroll"}
                    boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
                    sx={{
                      "::-webkit-scrollbar": {
                        width: "5px",
                      },
                      "::-webkit-scrollbar-thumb": {
                        background: "#777777",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    {Year.map((item, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => props.setYear(item.year)}
                      >
                        {item.year}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Flex>
              <Heading
                w={"90%"}
                h={"15px"}
                textAlign={"left"}
                fontWeight={"normal"}
                fontSize={"sm"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                {props.dateState}
              </Heading>
            </Flex>
          </Flex>
          <Button
            type={"submit"}
            mt={"15px"}
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
              Next
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

const RegisterSignUpSecondBase = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    props.submitHandler(firstName, lastName);
  };

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      w={"100%"}
      display={props.display}
    >
      <Button
        variant={"link"}
        my={"25px"}
        leftIcon={<ArrowBackIcon />}
        onClick={() => props.setPageVisual([true, false, false])}
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
          Add your credentials 💪
        </Heading>
        <Flex
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
          w={"100%"}
          gap={"25px"}
        >
          {/** FIRST NAME INPUT */}

          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            gap={"5px"}
            w={"100%"}
          >
            <Input
              value={firstName}
              type={"text"}
              placeholder={"First Name"}
              size={"lg"}
              w={"100%"}
              h={"50px"}
              borderRadius={"12px"}
              boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
              onChange={(e) => setFirstName(e.target.value)}
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
              {props.firstNameState}
            </Heading>
          </Flex>

          {/** BASE NAME INPUT */}

          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            gap={"5px"}
            w={"100%"}
          >
            <Input
              value={lastName}
              type={"text"}
              placeholder={"Last Name"}
              size={"lg"}
              w={"100%"}
              h={"50px"}
              borderRadius={"12px"}
              boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
              onChange={(e) => setLastName(e.target.value)}
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
              {props.lastNameState}
            </Heading>
          </Flex>

          {/** DOB INPUT */}

          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            gap={"5px"}
            w={"100%"}
          >
            <Flex justifyContent={"space-between"} w={"100%"}>
              <Menu>
                <MenuButton
                  as={Button}
                  w={"35%"}
                  h={"50px"}
                  borderRadius={"12px"}
                  boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
                  fontWeight={"normal"}
                  fontSize={"lg"}
                  letterSpacing={"0.05em"}
                  color={"#000000"}
                  colorScheme={"whiteAlpha"}
                >
                  {props.month}
                </MenuButton>
                <MenuList
                  h={"200px"}
                  overflowY={"scroll"}
                  boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
                  sx={{
                    "::-webkit-scrollbar": {
                      width: "5px",
                    },
                    "::-webkit-scrollbar-thumb": {
                      background: "#777777",
                      borderRadius: "10px",
                    },
                  }}
                >
                  {Month.map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        props.setMonth(item.month);
                        props.setNumMonth(item.num);
                      }}
                    >
                      {item.month}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton
                  as={Button}
                  w={"25%"}
                  h={"50px"}
                  borderRadius={"12px"}
                  boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
                  fontWeight={"normal"}
                  fontSize={"lg"}
                  letterSpacing={"0.05em"}
                  color={"#000000"}
                  colorScheme={"whiteAlpha"}
                >
                  {props.day}
                </MenuButton>
                <MenuList
                  h={"200px"}
                  overflowY={"scroll"}
                  boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
                  sx={{
                    "::-webkit-scrollbar": {
                      width: "5px",
                    },
                    "::-webkit-scrollbar-thumb": {
                      background: "#777777",
                      borderRadius: "10px",
                    },
                  }}
                >
                  {Day.map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => props.setDay(item.day)}
                    >
                      {item.day}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton
                  as={Button}
                  w={"30%"}
                  h={"50px"}
                  borderRadius={"12px"}
                  boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
                  fontWeight={"normal"}
                  fontSize={"lg"}
                  letterSpacing={"0.05em"}
                  color={"#000000"}
                  colorScheme={"whiteAlpha"}
                >
                  {props.year}
                </MenuButton>
                <MenuList
                  h={"200px"}
                  overflowY={"scroll"}
                  boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
                  sx={{
                    "::-webkit-scrollbar": {
                      width: "5px",
                    },
                    "::-webkit-scrollbar-thumb": {
                      background: "#777777",
                      borderRadius: "10px",
                    },
                  }}
                >
                  {Year.map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => props.setYear(item.year)}
                    >
                      {item.year}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
            <Heading
              w={"90%"}
              h={"15px"}
              textAlign={"left"}
              fontWeight={"normal"}
              fontSize={"sm"}
              letterSpacing={"0.05em"}
              color={"#000000"}
            >
              {props.dateState}
            </Heading>
          </Flex>
        </Flex>
        <Button
          type={"submit"}
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
            Next
          </Heading>
        </Button>
      </Flex>
    </Flex>
  );
};

export default RegisterSignUpSecond;
