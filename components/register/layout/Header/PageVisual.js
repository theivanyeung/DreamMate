import { Flex, Box } from "@chakra-ui/react";

const RegisterLayoutHeaderPageVisual = (props) => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      mt={"25px"}
      w={"100%"}
    >
      {props.register ? (
        <Flex justifyContent={"space-between"} w={"500px"} maxW={"80%"}>
          {props.pageVisual.map((page, index) => (
            <Box
              key={index}
              w={"20%"}
              h={"10px"}
              bgColor={page ? "#000000" : "#E2E2E2"}
              borderRadius={"100px"}
            />
          ))}
        </Flex>
      ) : (
        <Box w={"100%"} h={"10px"} />
      )}
    </Flex>
  );
};

export default RegisterLayoutHeaderPageVisual;
