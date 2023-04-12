import Image from "next/image";

import {
  Flex,
  Box,
  Heading,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";

const ProfileModalSocials = (props) => {
  const { item } = props;

  return (
    <ModalContent
      boxShadow={"0px 0px 3px 2px rgba(0, 0, 0, 0.25)"}
      borderRadius={"12px"}
      bgColor={"#383838"}
    >
      <ModalCloseButton color={"#FFFFFF"} />
      <Flex flexDirection={"column"} alignItems={"center"} h={"125px"}>
        <Box align={"center"} w={"90%"}>
          <Flex alignItems={"center"} gap={"10px"} h={"50px"}>
            {item.title === "Phone" ? (
              <PhoneIcon w={"20px"} h={"20px"} color={"#FFFFFF"} />
            ) : (
              <Image src={item.src} alt={item.alt} width={20} height={20} />
            )}
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              lineHeight={"20px"}
              letterSpacing={"0.1em"}
              color={"#FFFFFF"}
            >
              {item.title}
            </Heading>
          </Flex>
        </Box>

        <Flex justifyContent={"center"} w={"100%"}>
          <Heading
            maxW={"90%"}
            fontWeight={"normal"}
            fontSize={"md"}
            letterSpacing={"0.05em"}
            color={"#439DF6"}
          >
            {item.link}
          </Heading>
        </Flex>
      </Flex>
    </ModalContent>
  );
};

export default ProfileModalSocials;
