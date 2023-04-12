// FRONTEND IMPORTS

import { useState, useEffect, useContext } from "react";

import Image from "next/image";

import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Flex,
  ModalContent,
  ModalCloseButton,
  CircularProgress,
  Skeleton,
  Divider,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

// BACKEND IMPORTS

import { collection, getDocs } from "firebase/firestore";

import { firestore } from "../../../../utils/firebase";

const ProfileModalCreatePostSecond = (props) => {
  const {
    thumbnailURL,
    uploadProgress,
    thumbnailChangeHandler,
    createPostHandler,
  } = props;

  const [tags, setTags] = useState([]);
  const [querySize, setQuerySize] = useState();
  const [size, setSize] = useState(0);
  const [tagInput, setTagInput] = useState("");
  const [tagList, setTagList] = useState([]);
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

  const addTag = (e) => {
    e.preventDefault();

    if (tagInput.length !== 0) {
      let match = false;

      tagList.map((tag) => {
        if (tag === tagInput) {
          match = true;
        }
      });

      if (match === false && listSize < 3) {
        setTagList((tags) => {
          return [...tags, tagInput];
        });
        setListSize((count) => count + 1);
      }

      setTagInput("");
    }
  };

  const submitHandler = () => {
    createPostHandler(tagList);
  };

  return (
    <>
      {/** THUMBNAIL */}
      <ModalCloseButton color={"#FFFFFF"} onClick={props.deleteThumbnail} />
      <Box align={"left"} my={"25px"} w={"90%"}>
        <Heading
          fontWeight={"medium"}
          fontSize={"md"}
          lineHeight={"27px"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          Thumbnail
        </Heading>
        <Flex flexDirection={"column"} alignItems={"center"} mt={"25px"}>
          {uploadProgress && (
            <Flex justifyContent={"center"} alignItems={"center"} w={"100%"}>
              <CircularProgress
                value={uploadProgress}
                thickness={"5px"}
                size={"100px"}
                color={"#000000"}
              />
            </Flex>
          )}
          {thumbnailURL && (
            <Flex justifyContent={"center"} alignItems={"center"} w={"100%"}>
              <Image
                src={thumbnailURL}
                alt={"Thumbnail"}
                width={302.4}
                height={170.1}
                layout={"responsive"}
              />
            </Flex>
          )}
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            h={uploadProgress || thumbnailURL ? "170.1px" : "100%"}
          >
            <Button w={"150px"} borderRadius={"16px"}>
              <Heading
                fontWeight={"medium"}
                fontSize={"sm"}
                letterSpacing={"0.05em"}
                position={"absolute"}
              >
                Upload Thumbnail
              </Heading>
              <Input
                type={"file"}
                accept={"image/*"}
                opacity={"0"}
                onChange={thumbnailChangeHandler}
              />
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Divider color={"#FFFFFF"} />

      {/** TAGS */}

      <Box align={"left"} my={"25px"} w={"90%"}>
        <Heading
          fontWeight={"medium"}
          fontSize={"md"}
          lineHeight={"27px"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          Tags
        </Heading>

        <Flex flexDirection={"column"} alignItems={"center"} gap={"15px"}>
          {/** Tag input */}

          <form onSubmit={addTag}>
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
              <Button
                type={"submit"}
                variant={"ghost"}
                colorScheme={"whiteAlpha"}
                bgColor={"#000000"}
                onClick={addTag}
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"md"}
                  letterSpacing={"0.05em"}
                  color={"#FFFFFF"}
                >
                  Add
                </Heading>
              </Button>
            </Flex>
          </form>
          <style jsx>{`
            form {
              width: 100%;
            }
          `}</style>

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

          {/** Tag list */}

          <Box w={"100%"}>
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
                      <CloseIcon w={"7.5px"} h={"7.5px"} color={"#FFFFFF"} />
                    </Button>
                  </Flex>
                </Box>
              ))}
            </Flex>
            <Divider />
          </Box>
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
          bgColor={"#000000"}
          colorScheme={"whiteAlpha"}
          borderRadius={"16px"}
          onClick={submitHandler}
        >
          <Heading fontWeight={"medium"} fontSize={"md"} color={"#FFFFFF"}>
            Create
          </Heading>
        </Button>
      </Flex>
    </>
  );
};

export default ProfileModalCreatePostSecond;
