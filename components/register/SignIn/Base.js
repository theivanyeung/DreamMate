import { Flex, Heading, Input, Button } from "@chakra-ui/react";

const RegisterSignInBase = (props) => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      display={props.display}
    >
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"90%"}
        gap={"50px"}
      >
        <Heading fontWeight={"medium"} fontSize={"3xl"}>
          Sign In 🔥
        </Heading>
        <form onSubmit={props.submitHandler}>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
            gap={"25px"}
          >
            <Input
              value={props.email}
              type={"email"}
              placeholder={"Email"}
              size={"lg"}
              w={"100%"}
              h={"50px"}
              borderRadius={"12px"}
              boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
              onChange={(e) => props.setEmail(e.target.value)}
            />
            <Input
              value={props.password}
              type={"password"}
              placeholder={"Password"}
              size={"lg"}
              w={"100%"}
              h={"50px"}
              borderRadius={"12px"}
              boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
              onChange={(e) => props.setPassword(e.target.value)}
            />

            <Heading
              h={"15px"}
              fontWeight={"normal"}
              fontSize={"sm"}
              letterSpacing={"0.05em"}
              color={"#000000"}
            >
              {props.errorState}
            </Heading>
          </Flex>
          <Button
            type={"submit"}
            mt={"25px"}
            w={"100px"}
            h={"40px"}
            bgColor={"#000000"}
            borderRadius={"12px"}
            boxShadow={"0px 0px 5px rgba(0, 0, 0, 0.5)"}
            onClick={props.submitHandler}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"xl"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
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

export default RegisterSignInBase;
