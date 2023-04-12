import { Flex, Heading, Button, ModalCloseButton } from "@chakra-ui/react";

const ProfileModalCreatePostSubmit = (props) => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      h={"250px"}
      gap={"50px"}
    >
      <ModalCloseButton color={"#FFFFFF"} />
      <Heading
        fontWeight={"medium"}
        fontSize={"3xl"}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
      >
        Your post is published! 🔥
      </Heading>
      <Button
        colorScheme={"whiteAlpha"}
        bgColor={"#000000"}
        onClick={props.onClose}
      >
        <Heading
          fontWeight={"normal"}
          fontSize={"lg"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          Explore DreamMate
        </Heading>
      </Button>
    </Flex>
  );
};

export default ProfileModalCreatePostSubmit;
