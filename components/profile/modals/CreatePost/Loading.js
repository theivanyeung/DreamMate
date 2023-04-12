import { Flex, Spinner } from "@chakra-ui/react";

const ProfileModalCreatePostLoading = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      h={"250px"}
    >
      <Spinner size={"xl"} color={"#FFFFFF"} />
    </Flex>
  );
};

export default ProfileModalCreatePostLoading;
