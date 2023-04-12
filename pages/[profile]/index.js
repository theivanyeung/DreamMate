// FRONTEND IMPORTS

import { useState, useEffect, useContext } from "react";

import { useRouter } from "next/router";

import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import ProfileHeader from "../../components/profile/sections/Header";
import ProfilePosts from "../../components/profile/sections/Posts";
import ProfileAbout from "../../components/profile/sections/About";

import { ColorSocials } from "../../components/items";

import { UserContext } from "../../utils/context";

// BACKEND IMPORTS

import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";

import { firestore } from "../../utils/firebase";

const Profile = () => {
  const { user } = useContext(UserContext);

  const router = useRouter();
  const search = router.query.profile;

  const [creatorId, setCreatorId] = useState(null);
  const [creatorData, setCreatorData] = useState(null);

  const [socialOptions, setSocialOptions] = useState();
  const [socialList, setSocialList] = useState();

  const [members, setMembers] = useState([]);

  const fetchSocialCollection = async (uid) => {
    const socialListTemp = [];
    const socialOptionsTemp = [];
    const q = query(collection(doc(firestore, "users", uid), "socials"));
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        for (let n = 0; n < ColorSocials.length; n++) {
          if (
            ColorSocials[n].alt.slice(0, -5).toLowerCase() === change.doc.id
          ) {
            if (change.doc.data().link) {
              socialListTemp.push({
                src: ColorSocials[n].src,
                title: ColorSocials[n].alt.slice(0, -5),
                alt: ColorSocials[n].alt,
                link: change.doc.data().link,
                input: change.doc.data().link,
              });
            } else {
              socialOptionsTemp.push({
                src: ColorSocials[n].src,
                alt: ColorSocials[n].alt,
              });
            }
          }
        }
      });
    });
    setSocialList(socialListTemp);
    setSocialOptions(socialOptionsTemp);
  };

  useEffect(() => {
    if (user && search) {
      try {
        const fetchPage = async () => {
          const usernameRef = doc(firestore, "usernames", search);
          const usernameSnap = await getDoc(usernameRef);

          if (usernameSnap.exists()) {
            setCreatorId(usernameSnap.data().user);
            onSnapshot(
              doc(firestore, "users", usernameSnap.data().user),
              (doc) => {
                setCreatorData(doc.data());

                // Refine data to go to messages

                setMembers([
                  {
                    id: user.uid,
                  },
                  {
                    id: doc.id,
                  },
                ]);
              }
            );
            fetchSocialCollection(usernameSnap.data().user);
          } else {
            router.push("/404");
          }
        };
        fetchPage();
      } catch (error) {
        console.log(error);
      }
    }
  }, [search, user, creatorId]);

  return (
    <Box
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
    >
      <ProfileHeader
        router={router}
        user={user}
        creatorId={creatorId}
        creatorData={creatorData}
        socialOptions={socialOptions}
        socialList={socialList}
        members={members}
      />

      <Tabs>
        <TabList w={"1000px"} maxW={"90%"} color={"#FFFFFF"}>
          <Tab>
            <Heading
              fontWeight={"normal"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
            >
              About
            </Heading>
          </Tab>
          <Tab>
            <Heading
              fontWeight={"normal"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
            >
              Posts
            </Heading>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProfileAbout creatorData={creatorData} />
          </TabPanel>
          <TabPanel>
            <ProfilePosts
              user={user}
              creatorId={creatorId}
              creatorData={creatorData}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Profile;
