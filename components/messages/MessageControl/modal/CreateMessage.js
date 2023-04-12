// FRONTEND IMPORTS

import { useEffect, useState, useContext } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import {
  ModalContent,
  ModalCloseButton,
  Flex,
  Heading,
  Input,
  Box,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { UserContext } from "../../../../utils/context";

// BACKEND IMPORTS

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { firestore } from "../../../../utils/firebase";

// ALGOLIA IMPORTS

import { usersIndex } from "../../../../utils/algolia";

const ChatMessageControlModalCreateMessage = (props) => {
  const { user, photoURL, firstName, lastName } = useContext(UserContext);

  const router = useRouter();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && photoURL && firstName && lastName) {
      const firstMember = [
        {
          id: user.uid,
          photoURL: photoURL,
          displayName: `${firstName} ${lastName}`,
        },
      ];
      setMembers(firstMember);
    }
  }, [user, photoURL, firstName, lastName]);

  const onChangeHandler = async (e) => {
    setSearch(e.target.value);
    setLoading(true);

    if (e.target.value.length !== 0) {
      if (user) {
        const list = [];
        const memberIds = members.map((member) => member.id);
        const { hits } = await usersIndex.search(e.target.value, {
          hitsPerPage: 30,
        });
        hits.forEach((hit) => {
          let exists = false;
          for (let n = 0; n < memberIds.length; n++) {
            if (hit.objectID === memberIds[n]) {
              exists = true;
            }
          }
          if (!exists) {
            list.push(hit);
          }
        });
        setUsers(list.reverse());
        setLoading(false);
      }
    } else {
      setLoading(false);
      setUsers([]);
    }
  };

  const createMessageDoc = async (groupchat) => {
    if (groupchat) {
      const docRef = await addDoc(collection(firestore, "messages"), {
        members: members.map((member) => {
          return member.id;
        }),
        active: members.map((member) => {
          return member.id;
        }),
        iconName: "",
        iconURL:
          "https://firebasestorage.googleapis.com/v0/b/dreammate-b3ce5.appspot.com/o/default%2Fgroupchat.png?alt=media&token=0702fe28-3008-44fe-bd0d-62342453f1af",
      });
      router.push(`/messages/${docRef.id}`);
    } else {
      const docRef = await addDoc(collection(firestore, "messages"), {
        members: members.map((member) => {
          return member.id;
        }),
        active: members.map((member) => {
          return member.id;
        }),
      });
      router.push(`/messages/${docRef.id}`);
    }
  };

  const rejoinDMHandler = async (id, data) => {
    if (data.members.includes(user.uid)) {
      const messageRef = doc(firestore, "messages", id);
      await updateDoc(messageRef, {
        active: arrayUnion(user.uid),
      });
    }
    router.push(`/messages/${id}`);
  };

  const createMessageHandler = async () => {
    let exists = false;

    if (members.length < 3) {
      const q = query(
        collection(firestore, "messages"),
        where("members", "array-contains", members[0].id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data().members.length === 2) {
          for (let n = 0; n < doc.data().members.length; n++) {
            if (doc.data().members[n] === members[1].id) {
              exists = true;
              rejoinDMHandler(doc.id, doc.data());
            }
          }
        }
      });
      if (exists === false) {
        createMessageDoc(false);
      }
    } else {
      createMessageDoc(true);
      console.log("SHIT");
    }
    props.onClose();
  };

  return (
    <ModalContent bgColor={"#383838"} borderRadius={"12px"}>
      <ModalCloseButton color={"#FFFFFF"} />

      <Flex
        h={props.display === "full" ? "500px" : "100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"#383838"}
        borderRadius={"12px"}
      >
        <Flex
          w={"90%"}
          h={"90%"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Heading
            w={"100%"}
            fontWeight={"medium"}
            fontSize={"md"}
            letterSpacing={"0.1em"}
            color={"#FFFFFF"}
          >
            New Message
          </Heading>

          <Input
            value={search}
            placeholder={"Search people..."}
            mt={"10px"}
            w={"100%"}
            h={"65px"}
            size={"md"}
            bgColor={"#D6D6D6"}
            borderRadius={"12px"}
            type={"text"}
            onChange={onChangeHandler}
          />

          <Flex
            alignItems={"center"}
            w={"100%"}
            h={"75px"}
            overflowY={"hidden"}
            overflowX={"scroll"}
            sx={{
              "::-webkit-scrollbar": {
                height: "5px",
              },
              "::-webkit-scrollbar-thumb": {
                background: "#777777",
                borderRadius: "10px",
              },
            }}
          >
            {members.map((member, index) => (
              <Box key={index}>
                {member.id !== user.uid && (
                  <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    mr={"10px"}
                    w={"175px"}
                    h={"40px"}
                    borderRadius={"8px"}
                    border={"1px solid #9ECBEF"}
                    bgColor={"#ECECEC"}
                  >
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      w={"50px"}
                    >
                      <Box
                        overflow={"hidden"}
                        w={"33px"}
                        h={"33px"}
                        borderRadius={"100px"}
                      >
                        <Image
                          src={member.photoURL}
                          alt={"Avatar"}
                          width={33}
                          height={33}
                        />
                      </Box>
                    </Flex>
                    <Heading
                      w={"100px"}
                      h={"20px"}
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                      fontWeight={"medium"}
                      fontSize={"md"}
                      lineHeight={"20px"}
                      letterSpacing={"0.1em"}
                    >
                      {member.displayName}
                    </Heading>
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      borderRadius={"100px"}
                      onClick={() => {
                        setMembers((currentMembers) => {
                          return [
                            ...currentMembers.slice(0, index),
                            ...currentMembers.slice(index + 1),
                          ];
                        });
                      }}
                    >
                      <CloseIcon w={"10px"} h={"10px"} />
                    </Button>
                  </Flex>
                )}
              </Box>
            ))}
          </Flex>
          <Box w={"100%"} h={"0.5px"} bgColor={"#FFFFFF"} />
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            h={"100%"}
          >
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              w={"95%"}
              h={"95%"}
              maxH={"250px"}
              overflowX={"hidden"}
              overflowY={"scroll"}
              sx={{
                "::-webkit-scrollbar": {
                  width: "5px",
                },
                "::-webkit-scrollbar-thumb": {
                  background: "#777777",
                  borderRadius: "10px",
                },
              }}
            >
              {search &&
                (users.length !== 0 ? (
                  users.map((user, index) => (
                    <Button
                      key={index}
                      my={"5px"}
                      paddingY={"5px"}
                      w={"100%"}
                      h={"50px"}
                      onClick={() => {
                        if (members.length < 10) {
                          setMembers((currentMembers) => {
                            return [
                              ...currentMembers,
                              {
                                id: user.objectID,
                                photoURL: user.photoURL,
                                displayName: `${user.firstName} ${user.lastName}`,
                              },
                            ];
                          });
                        }
                        setSearch("");
                      }}
                    >
                      <Box
                        overflow={"hidden"}
                        w={"40px"}
                        h={"40px"}
                        borderRadius={"100px"}
                      >
                        <Image
                          src={user.photoURL}
                          alt={"Friend Avatar"}
                          width={40}
                          height={40}
                        />
                      </Box>
                      <Heading
                        ml={"15px"}
                        w={"80%"}
                        h={"28px"}
                        textAlign={"left"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        fontWeight={"medium"}
                        fontSize={"xl"}
                        lineHeight={"28px"}
                        letterSpacing={"0.1em"}
                        verticalAlign={"bottom"}
                      >
                        {user.firstName} {user.lastName} @{user.username}
                      </Heading>
                    </Button>
                  ))
                ) : (
                  <Heading
                    fontWeight={"normal"}
                    fontSize={"2xl"}
                    letterSpacing={"0.05em"}
                    color={"#FFFFFF"}
                  >
                    No results 😭
                  </Heading>
                ))}
              {loading && <Spinner mt={"15px"} color={"#FFFFFF"} />}
            </Flex>
          </Flex>

          <Button
            h={"50px"}
            colorScheme={"whiteAlpha"}
            bgColor={"#000000"}
            borderRadius={"12px"}
            onClick={createMessageHandler}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"xl"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              Create
            </Heading>
          </Button>
        </Flex>
      </Flex>
    </ModalContent>
  );
};

export default ChatMessageControlModalCreateMessage;
