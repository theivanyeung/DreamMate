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
import HomeHeader from "./Header";

const HomeBase = (props) => {
  const {
    display,
    school,
    posts,
    fix,
    tags,
    loading,
    lastElementBase,
    submitFilterHandler,
  } = props;

  return (
    <Flex flexDirection={"column"} w={"90%"} display={display}>
      <HomeHeader
        school={school}
        tags={tags}
        submitFilterHandler={submitFilterHandler}
        isFull={true}
      />
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        mb={"100px"}
        w={"100%"}
        gap={"25px"}
      >
        {loading === false && school && posts !== null ? (
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
                ref={index === posts.length - 1 ? lastElementBase : null}
              >
                <GlobalPostCard key={index} postData={data} global={false} />
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

export default HomeBase;
