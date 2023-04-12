// FRONTEND IMPORTS

import { useState } from "react";

import { useRouter } from "next/router";

import {
  Flex,
  Box,
  ModalContent,
  ModalCloseButton,
  Heading,
  Input,
  Divider,
  Button,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

// ALGOLIA IMPORTS

import { schoolsIndex } from "../../../utils/algolia";

const SchoolModalSearch = (props) => {
  const router = useRouter();

  const [school, setSchool] = useState("");
  const [choiceList, setChoiceList] = useState([]);

  const onChangeHandler = async (e) => {
    setSchool(e.target.value);

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
    <ModalContent
      bgColor={"#383838"}
      borderRadius={props.isFull ? "0px" : "12px"}
    >
      <ModalCloseButton color={"#FFFFFF"} />
      <Flex justifyContent={"center"} mb={"25px"}>
        <Box align={"center"} w={"90%"}>
          <Flex alignItems={"center"} h={"50px"}>
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              lineHeight={"20px"}
              letterSpacing={"0.1em"}
              color={"#FFFFFF"}
            >
              Search for schools
            </Heading>
          </Flex>

          <Flex
            alignItems={"center"}
            gap={"25px"}
            mb={choiceList.length !== 0 && "10px"}
          >
            <Search2Icon boxSize={"20px"} color={"#FFFFFF"} />
            <Input
              value={school}
              type={"text"}
              placeholder={"Enter school of interest"}
              variant={"unstyled"}
              size={"lg"}
              color={"#FFFFFF"}
              onChange={onChangeHandler}
            />
          </Flex>

          {choiceList.length !== 0 && (
            <>
              <Divider />
              <Flex
                flexDirection={"column"}
                alignItems={"center"}
                mt={"10px"}
                maxH={!props.isFull && "250px"}
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
                    colorScheme={"blackAlpha"}
                    w={"100%"}
                    onClick={() => router.push(`/global/${choice.id}`)}
                  >
                    <Heading
                      fontWeight={"normal"}
                      fontSize={"xl"}
                      letterSpacing={"0.05em"}
                      color={"#FFFFFF"}
                      w={"100%"}
                      my={"15px"}
                      textAlign={"left"}
                    >
                      {choice.school}
                    </Heading>
                  </Button>
                ))}
              </Flex>
            </>
          )}

          <Heading
            fontWeight={"normal"}
            fontSize={"md"}
            letterSpacing={"0.05em"}
            my={"10px"}
            color={"#FFFFFF"}
          >
            or
          </Heading>
          <Button colorScheme={"blackAlpha"} w={"100%"}>
            <Heading
              fontWeight={"normal"}
              fontSize={"xl"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
              my={"15px"}
              onClick={() => router.push("/global")}
            >
              Go Global
            </Heading>
          </Button>
        </Box>
      </Flex>
    </ModalContent>
  );
};

export default SchoolModalSearch;
