import { Flex, Heading, Input, Button } from "@chakra-ui/react";

const RegisterSignInFull = (props) => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"750px"}
      h={"500px"}
      bgColor={"#151515"}
      borderRadius={"24px"}
      display={props.display}
    >
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"75%"}
        gap={"40px"}
      >
        <Heading
          mb={"10px"}
          fontWeight={"medium"}
          fontSize={"5xl"}
          color={"#FFFFFF"}
        >
          Sign In 🔥
        </Heading>
        <form onSubmit={props.submitHandler}>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
            gap={"20px"}
          >
            <Input
              value={props.email}
              type={"email"}
              placeholder={"Email"}
              size={"lg"}
              mt={"10px"}
              w={"100%"}
              h={"50px"}
              borderRadius={"12px"}
              boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
              border={"1px solid #FFFFFF"}
              color={"#FFFFFF"}
              onChange={(e) => props.setEmail(e.target.value)}
            />
            <Input
              value={props.password}
              type={"password"}
              placeholder={"Password"}
              size={"lg"}
              mt={"10px"}
              w={"100%"}
              h={"50px"}
              borderRadius={"12px"}
              boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
              border={"1px solid #FFFFFF"}
              color={"#FFFFFF"}
              onChange={(e) => props.setPassword(e.target.value)}
            />
            <Heading
              h={"15px"}
              fontWeight={"normal"}
              fontSize={"sm"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              {props.errorState}
            </Heading>
          </Flex>
          <Button
            type={"submit"}
            mt={"25px"}
            w={"100px"}
            h={"40px"}
            borderRadius={"12px"}
            boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
            onClick={props.submitHandler}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"xl"}
              letterSpacing={"0.05em"}
            >
              Enter
            </Heading>
          </Button>
        </form>
        <style jsx>{`
          form {
            width: 100%;
          }
        `}</style>
      </Flex>
    </Flex>
  );
};

export default RegisterSignInFull;
