import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import GlobalPostCard from "../global/cards/PostCard";
import GlobalModalFeedFilter from "../global/modals/FeedFilter";
import SchoolHeader from "./Header";

const SchoolFull = (props) => {
  const {
    display,
    posts,
    tags,
    loading,
    school,
    lastElementFull,
    submitFilterHandler,
  } = props;

  return (
    <Flex flexDirection={"column"} w={"600px"} display={display}>
      <SchoolHeader
        tags={tags}
        submitFilterHandler={submitFilterHandler}
        isFull={false}
        school={school}
      />
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        mb={"100px"}
        w={"100%"}
        gap={"25px"}
      >
        {loading === false && posts !== null ? (
          posts.length === 0 ? (
            <Heading
              fontWeight={"normal"}
              fontSize={"2xl"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              No results 😭
            </Heading>
          ) : (
            posts.map((data, index) => (
              <Box
                key={index}
                ref={index === posts.length - 1 ? lastElementFull : null}
              >
                <GlobalPostCard postData={data} />
              </Box>
            ))
          )
        ) : (
          <Spinner color={"#FFFFFF"} />
        )}
      </Flex>
    </Flex>
  );
};

export default SchoolFull;
