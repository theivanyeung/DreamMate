import { useRef, useEffect } from "react";

import Image from "next/image";

import { Flex, Box, Heading } from "@chakra-ui/react";

import { ConvertDate } from "../../functions";

const ChatMessageViewChatBaseView = (props) => {
  const { user, sections, memberList, lastMessageElementBase, display } = props;

  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView();
  }, [sections, memberList, user]);

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      w={"100%"}
      h={"100%"}
      overflowX={"hidden"}
      overflowY={"auto"}
      sx={{
        "::-webkit-scrollbar": {
          width: "5px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#777777",
          borderRadius: "10px",
        },
      }}
      display={display}
    >
      {sections &&
        sections.map((section, secIndex) => (
          <Box
            key={secIndex}
            align={section.creator === user.uid ? "right" : "left"}
            my={"5px"}
            w={"95%"}
          >
            {section.creator === user.uid ? (
              <Flex
                flexDirection={"column"}
                alignItems={"flex-end"}
                w={"80%"}
                h={"100%"}
              >
                <Heading
                  mr={"12px"}
                  fontWeight={"normal"}
                  fontSize={"10px"}
                  lineHeight={"14px"}
                  letterSpacing={"0.1em"}
                  color={"#C0C0C0"}
                >
                  {section.time && ConvertDate(section.time.toDate())}
                </Heading>
                {section.texts.map((text, index) => (
                  <Heading
                    ref={
                      secIndex === 0 && index === 0
                        ? lastMessageElementBase
                        : null
                    }
                    key={index}
                    mt={"5px"}
                    paddingY={"8px"}
                    paddingX={"12px"}
                    bgColor={"#272727"}
                    boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.25)"}
                    borderRadius={"12px"}
                    fontWeight={"normal"}
                    fontSize={"sm"}
                    textAlign={"left"}
                    lineHeight={"24px"}
                    letterSpacing={"0.1em"}
                    color={"#FFFFFF"}
                  >
                    {text}
                  </Heading>
                ))}
              </Flex>
            ) : (
              <Flex w={"80%"} h={"100%"}>
                <Flex gap={"5px"}>
                  <Flex w={"50px"} alignItems={"flex-end"}>
                    <Box
                      overflow={"hidden"}
                      w={"40px"}
                      h={"40px"}
                      borderRadius={"100px"}
                    >
                      {memberList.map((member, index) => {
                        if (member.id === section.creator) {
                          return (
                            <Image
                              key={index}
                              src={member.photoURL}
                              alt={"Avatar"}
                              width={40}
                              height={40}
                            />
                          );
                        }
                      })}
                    </Box>
                  </Flex>
                  <Flex
                    flexDirection={"column"}
                    alignItems={"flex-start"}
                    w={"100%"}
                  >
                    <Heading
                      mr={"12px"}
                      fontWeight={"normal"}
                      fontSize={"10px"}
                      lineHeight={"14px"}
                      letterSpacing={"0.1em"}
                      color={"#C0C0C0"}
                    >
                      {section.time && ConvertDate(section.time.toDate())}
                    </Heading>
                    {section.texts.map((text, index) => (
                      <Flex
                        ref={
                          secIndex === 0 && index === 0
                            ? lastMessageElementBase
                            : null
                        }
                        key={index}
                      >
                        <Heading
                          mt={"5px"}
                          paddingY={"8px"}
                          paddingX={"12px"}
                          bgColor={"#C0C0C0"}
                          borderRadius={"12px"}
                          fontWeight={"normal"}
                          fontSize={"sm"}
                          textAlign={"left"}
                          lineHeight={"24px"}
                          letterSpacing={"0.1em"}
                        >
                          {text}
                        </Heading>
                      </Flex>
                    ))}
                  </Flex>
                </Flex>
              </Flex>
            )}
          </Box>
        ))}

      <br ref={dummy} />
    </Flex>
  );
};

export default ChatMessageViewChatBaseView;
