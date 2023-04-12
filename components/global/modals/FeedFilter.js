// FRONTEND IMPORTS

import { useEffect, useState } from "react";

import {
  Flex,
  Box,
  Heading,
  Button,
  Input,
  Divider,
  ModalCloseButton,
  ModalContent,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

// BACKEND IMPORTS

import { firestore } from "../../../utils/firebase";

import { collection, getDoc, getDocs, setDoc } from "firebase/firestore";

const GlobalModalFeedFilter = (props) => {
  const [tags, setTags] = useState([]);
  const [querySize, setQuerySize] = useState();
  const [size, setSize] = useState(0);
  const [tagInput, setTagInput] = useState("");
  const [tagList, setTagList] = useState(props.tags);
  const [listSize, setListSize] = useState(0);
  const [fix, setFix] = useState(false);

  useEffect(() => {
    const init = async () => {
      const querySnapshot = await getDocs(collection(firestore, "tags"));
      querySnapshot.forEach((doc) => {
        setTags((tags) => [...tags, { id: doc.id, count: doc.data().uses }]);
        setSize((count) => count + 1);
      });
      setQuerySize(querySnapshot.size);
    };
    if (firestore) {
      init();
    }
    setTags([]);
  }, [firestore]);

  useEffect(() => {
    if (size && fix === false) {
      if (size !== querySize) {
        setTags((currentTags) => {
          return [...currentTags.slice(0, tags.length / 2)];
        });
      }
      setFix(true);
    }
  }, [size, fix, querySize]);

  const submitHandler = () => {
    props.submitFilterHandler(tagList);
    props.onClose();
  };

  return (
    <ModalContent
      bgColor={"#383838"}
      borderRadius={props.isFull ? "0px" : "12px"}
    >
      <ModalCloseButton color={"#FFFFFF"} />
      <Flex justifyContent={"center"}>
        <Box align={"center"} w={"90%"}>
          <Flex alignItems={"center"} h={"50px"}>
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              lineHeight={"20px"}
              letterSpacing={"0.1em"}
              color={"#FFFFFF"}
            >
              Filter
            </Heading>
          </Flex>

          <Heading
            fontWeight={"medium"}
            fontSize={"xs"}
            lineHeight={"17px"}
            letterSpacing={"0.1em"}
            color={"#C9C9C9"}
          >
            Here you can choose to filter posts with tags
          </Heading>

          <Flex flexDirection={"column"} alignItems={"center"} gap={"15px"}>
            {/** CURRENT TAGS */}

            <Box mt={"25px"} w={"100%"}>
              <Heading
                mb={"10px"}
                fontWeight={"normal"}
                fontSize={"lg"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                Current tags
              </Heading>
              {tagList !== [] ? (
                <Flex
                  alignItems={"center"}
                  w={"100%"}
                  overflowY={"hidden"}
                  overflowX={"scroll"}
                  sx={{
                    "::-webkit-scrollbar": {
                      height: "2.5px",
                    },
                    "::-webkit-scrollbar-thumb": {
                      background: "#777777",
                      borderRadius: "10px",
                    },
                  }}
                >
                  {tagList.map((item, index) => (
                    <Box key={index}>
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        mr={"10px"}
                        borderRadius={"8px"}
                      >
                        <Heading
                          overflow={"hidden"}
                          fontWeight={"normal"}
                          fontSize={"md"}
                          letterSpacing={"0.1em"}
                          color={"#FFFFFF"}
                        >
                          #{item}
                        </Heading>
                        <Button
                          variant={"ghost"}
                          colorScheme={"blackAlpha"}
                          size={"sm"}
                          borderRadius={"100px"}
                          onClick={() => {
                            setTagList((tags) => {
                              return [
                                ...tags.slice(0, index),
                                ...tags.slice(index + 1),
                              ];
                            });
                            setListSize((count) => count - 1);
                          }}
                        >
                          <CloseIcon
                            w={"7.5px"}
                            h={"7.5px"}
                            color={"#FFFFFF"}
                          />
                        </Button>
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              ) : (
                <Heading
                  mb={"25px"}
                  fontWeight={"normal"}
                  fontSize={"lg"}
                  letterSpacing={"0.05em"}
                  color={"#FFFFFF"}
                >
                  No tag filter
                </Heading>
              )}
              <Divider />
            </Box>

            {/** Tag input */}

            <Flex alignItems={"center"} w={"100%"} gap={"10px"}>
              <Heading fontWeight={"normal"} fontSize={"2xl"} color={"#FFFFFF"}>
                #
              </Heading>
              <Input
                value={tagInput}
                placeholder={"Search for tags"}
                variant={"unstyled"}
                size={"lg"}
                color={"#FFFFFF"}
                onChange={(e) => {
                  setTagInput(e.target.value);
                }}
              />
            </Flex>

            {/** Tag Search */}

            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              w={"100%"}
            >
              {tags
                .filter((item) => {
                  const searchTerm = tagInput.toLowerCase();
                  const tag = item.id.toLowerCase();

                  let match = false;

                  tagList.map((tagFromList) => {
                    if (tagFromList === tag) {
                      match = true;
                    }
                  });

                  if (match === false) {
                    return searchTerm && tag.startsWith(searchTerm);
                  }
                })
                .slice(0, 5)
                .map((item, index) => (
                  <Button
                    key={index}
                    variant={"ghost"}
                    colorScheme={"whiteAlpha"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    w={"100%"}
                    onClick={() => {
                      if (listSize < 3) {
                        setTagList((tags) => {
                          return [...tags, item.id];
                        });
                        setListSize((count) => count + 1);
                        setTagInput("");
                      }
                    }}
                  >
                    <Heading
                      fontWeight={"normal"}
                      fontSize={"lg"}
                      letterSpacing={"0.05em"}
                      color={"#FFFFFF"}
                    >
                      #{item.id}&nbsp;
                    </Heading>
                    {item.count !== 0 && (
                      <Heading
                        fontWeight={"light"}
                        fontSize={"sm"}
                        letterSpacing={"0.05em"}
                        color={"rgba(255, 255, 255, 0.75)"}
                      >
                        {item.count}
                      </Heading>
                    )}
                  </Button>
                ))}
            </Flex>
          </Flex>

          <Box align={"center"} my={"25px"} w={"90%"}>
            <Button
              background={"#FFD39F"}
              borderRadius={"12px"}
              colorScheme={"whiteAlpha"}
              bgColor={"#000000"}
              onClick={submitHandler}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                Finish
              </Heading>
            </Button>
          </Box>
        </Box>
      </Flex>
    </ModalContent>
  );
};

export default GlobalModalFeedFilter;
