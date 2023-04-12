import { useState } from "react";

import Image from "next/image";

import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Flex,
  Divider,
  ModalCloseButton,
} from "@chakra-ui/react";

const ProfileModalCreatePostFirst = (props) => {
  const [title, setTitle] = useState("");
  const [titleState, setTitleState] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [lookingForState, setLookingForState] = useState("");
  const [website, setWebsite] = useState("");
  const [websiteState, setWebsiteState] = useState("");

  const detailHandler = (e) => {
    e.preventDefault();

    let error = false;

    if (title.length === 0) {
      setTitleState("Invalid title");
      error = true;
    } else {
      setTitleState("");
    }

    if (description.length === 0) {
      setDescriptionState("Invalid description");
      error = true;
    } else {
      setDescriptionState("");
    }

    if (lookingFor.length === 0) {
      setLookingForState("Invalid search");
      error = true;
    } else {
      setLookingForState("");
    }

    if (website.length === 0) {
      setWebsiteState("Invalid website link");
      error = true;
    } else {
      setWebsiteState("");
    }

    if (error === false) {
      props.detailHandler(title, description, lookingFor, website);
    }
  };

  return (
    <>
      <ModalCloseButton color={"#FFFFFF"} onClick={props.deleteThumbnail} />
      <Heading
        w={"90%"}
        textAlign={"left"}
        fontWeight={"medium"}
        fontSize={"xl"}
        lineHeight={"41px"}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
      >
        Create a post
      </Heading>

      <Divider />

      <form onSubmit={detailHandler}>
        {/** TITLE */}

        <Box align={"left"} mt={"25px"} w={"90%"}>
          <Input
            value={title}
            placeholder={"Add a title"}
            size={"lg"}
            variant={"unstyled"}
            color={"#FFFFFF"}
            maxLength={"100"}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Flex justifyContent={"space-between"} w={"97%"} h={"20px"}>
            <Heading
              ml={"20px"}
              fontWeight={"normal"}
              fontSize={"xs"}
              lineHeight={"20px"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              {titleState}
            </Heading>
            {title.length > 80 && (
              <Heading
                fontWeight={"normal"}
                fontSize={"xs"}
                lineHeight={"20px"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                {title.length} / 100
              </Heading>
            )}
          </Flex>
        </Box>

        <Divider />

        {/** DESCRIPTION */}

        <Box align={"left"} mt={"25px"} w={"90%"}>
          <Textarea
            value={description}
            placeholder={"Add a description to your post"}
            size={"lg"}
            variant={"unstyled"}
            color={"#FFFFFF"}
            maxLength={"1000"}
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
            onChange={(e) => setDescription(e.target.value)}
          />
          <Flex justifyContent={"space-between"} w={"97%"} h={"20px"}>
            <Heading
              ml={"20px"}
              fontWeight={"normal"}
              fontSize={"xs"}
              lineHeight={"20px"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              {descriptionState}
            </Heading>
            {description.length > 925 && (
              <Heading
                fontWeight={"normal"}
                fontSize={"xs"}
                lineHeight={"20px"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                {description.length} / 1000
              </Heading>
            )}
          </Flex>
        </Box>

        <Divider />

        {/** LOOKING FOR */}

        <Box align={"left"} mt={"25px"} w={"90%"}>
          <Input
            value={lookingFor}
            placeholder={"In search of for your project/startup"}
            variant={"unstyled"}
            size={"lg"}
            color={"#FFFFFF"}
            maxLength={"100"}
            onChange={(e) => setLookingFor(e.target.value)}
          />
          <Flex justifyContent={"space-between"} w={"97%"} h={"20px"}>
            <Heading
              ml={"20px"}
              fontWeight={"normal"}
              fontSize={"xs"}
              lineHeight={"20px"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              {lookingForState}
            </Heading>
            {lookingFor.length > 80 && (
              <Heading
                fontWeight={"normal"}
                fontSize={"xs"}
                lineHeight={"20px"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                {lookingFor.length} / 100
              </Heading>
            )}
          </Flex>
        </Box>

        <Divider />

        {/** WEBSITE */}

        <Box align={"left"} mt={"25px"} w={"90%"}>
          <Input
            value={website}
            placeholder={"Website link"}
            variant={"unstyled"}
            size={"lg"}
            color={"#FFFFFF"}
            maxLength={"500"}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <Flex justifyContent={"space-between"} w={"97%"} h={"20px"}>
            <Heading
              ml={"20px"}
              fontWeight={"normal"}
              fontSize={"xs"}
              lineHeight={"20px"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              {websiteState}
            </Heading>
            {website.length > 80 && (
              <Heading
                fontWeight={"normal"}
                fontSize={"xs"}
                lineHeight={"20px"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                {website.length} / 500
              </Heading>
            )}
          </Flex>
        </Box>
        <Flex
          justifyContent={"flex-end"}
          alignItems={"center"}
          w={"90%"}
          h={"100px"}
        >
          <Button
            type={"submit"}
            colorScheme={"whiteAlpha"}
            bgColor={"#000000"}
            borderRadius={"16px"}
            onClick={detailHandler}
          >
            <Heading fontWeight={"medium"} fontSize={"md"} color={"#FFFFFF"}>
              Next
            </Heading>
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default ProfileModalCreatePostFirst;
