import { Box, Flex, Heading, Skeleton } from "@chakra-ui/react";

const ProfileAbout = (props) => {
  const { creatorData } = props;

  return (
    <Box mt={"25px"}>
      {/** ABOUT ME */}

      {creatorData ? (
        creatorData.description && (
          <Flex
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={"15px"}
            mb={"25px"}
            w={"850px"}
            maxW={"90%"}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"2xl"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              About Me
            </Heading>

            <Heading
              w={"100%"}
              textAlign={"left"}
              fontWeight={"normal"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
              color={"#AFAFAF"}
            >
              {creatorData.description}
            </Heading>
          </Flex>
        )
      ) : (
        <Flex
          flexDirection={"column"}
          alignItems={"flex-start"}
          gap={"15px"}
          mb={"25px"}
          w={"850px"}
          maxW={"90%"}
        >
          <Skeleton
            startColor={"#151515"}
            endColor={"#2B2B2B"}
            h={"31px"}
            w={"125px"}
          />
          <Skeleton
            startColor={"#151515"}
            endColor={"#2B2B2B"}
            w={"100%"}
            h={"50px"}
          />
        </Flex>
      )}

      {/** SCHOOL */}

      {creatorData ? (
        creatorData.school && (
          <Flex
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={"15px"}
            mb={"25px"}
            w={"850px"}
            maxW={"90%"}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"2xl"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              School
            </Heading>

            <Heading
              w={"100%"}
              textAlign={"left"}
              fontWeight={"normal"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
              color={"#AFAFAF"}
            >
              {creatorData.school}
            </Heading>
          </Flex>
        )
      ) : (
        <Flex
          flexDirection={"column"}
          alignItems={"flex-start"}
          gap={"15px"}
          mb={"25px"}
          w={"850px"}
          maxW={"90%"}
        >
          <Skeleton
            startColor={"#151515"}
            endColor={"#2B2B2B"}
            h={"31px"}
            w={"125px"}
          />
          <Skeleton
            startColor={"#151515"}
            endColor={"#2B2B2B"}
            w={"100%"}
            h={"25px"}
          />
        </Flex>
      )}
    </Box>
  );
};

export default ProfileAbout;
