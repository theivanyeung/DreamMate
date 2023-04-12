// FRONTEND IMPORTS

import { useEffect, useState, useContext, useRef } from "react";

import {
  Box,
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import HomeFull from "../../components/home/Full";
import HomeBase from "../../components/home/Base";

import { UserContext } from "../../utils/context";

// BACKEND IMPORTS

import { firestore } from "../../utils/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  startAfter,
  doc,
  updateDoc,
} from "firebase/firestore";

// ALGOLIA IMPORTS

import { postsIndex } from "../../utils/algolia";

const Home = () => {
  const { user, school } = useContext(UserContext);

  // // Parse the query string
  // const queryParams = queryString.parse(window.location.search);

  // useEffect(() => {
  //   // Retrieve the customer ID from the query params
  //   const customerId = queryParams.customer;

  //   const init = async () => {
  //     // Add the customer ID to the Firestore database
  //     const docRef = doc(firestore, "users", user.uid);
  //     await updateDoc(docRef, {
  //       stripeId: customerId,
  //     });
  //   };
  //   if (queryParams && user && customerId) {
  //     init();
  //     console.log("FUCK");
  //   }
  //   console.log(queryParams);
  //   console.log(customerId);
  // }, [queryParams]);

  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const [cursor, setCursor] = useState();
  const [page, setPage] = useState(0);

  const fetchLocalPosts = async () => {
    const postsRef = collection(firestore, "posts");
    const q = query(
      postsRef,
      where("school", "==", school),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const querySnapshot = await getDocs(q);
    const postList = [];
    querySnapshot.docs.map((doc) => {
      if (doc.data().creator !== user.uid) {
        postList.push(doc.data());
      }
    });
    setPosts(postList);
    setCursor(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setLoading(false);
  };

  const fetchLocalTagPosts = async (tagList) => {
    const postsRef = collection(firestore, "posts");
    const q = query(
      postsRef,
      where("school", "==", school),
      where("tags", "array-contains-any", tagList),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const querySnapshot = await getDocs(q);
    const postList = [];
    querySnapshot.docs.map((doc) => {
      if (doc.data().creator !== user.uid) {
        postList.push(doc.data());
      }
    });
    setPosts(postList);
    setCursor(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(false);
    if (firestore && school) {
      fetchLocalPosts();
    }
  }, [firestore, school]);

  const submitFilterHandler = async (tagList) => {
    setTags(tagList);

    setLoading(true);

    if (tagList.length !== 0) {
      fetchLocalTagPosts(tagList);
    } else {
      fetchLocalPosts();
    }
  };

  const submitProjectSearchHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (projectSearch !== "") {
        const postList = [];
        const { hits } = await postsIndex.search(projectSearch, {
          hitsPerPage: 20,
        });
        hits.map((hit) => {
          if (hit.creator !== user.uid) {
            postList.push(hit);
          }
        });
        setPosts(postList);
        setLoading(false);
      } else {
        fetchLocalPosts();
      }
    } catch (error) {
      console.log("FUCK");
    }
  };

  // Infinite scrolling

  const observerFull = useRef(null);
  const observerBase = useRef(null);
  const lastElementFull = useRef(null);
  const lastElementBase = useRef(null);

  const infiniteFetchHomePosts = async () => {
    const postsRef = collection(firestore, "posts");
    const q = query(
      postsRef,
      where("school", "==", school),
      orderBy("createdAt", "desc"),
      limit(20),
      startAfter(cursor)
    );
    const querySnapshot = await getDocs(q);
    const postList = [];
    querySnapshot.docs.map((doc) => {
      if (doc.data().creator !== user.uid) {
        postList.push(doc.data());
      }
    });
    setPosts([...posts, ...postList]);
    setCursor(querySnapshot.docs[querySnapshot.docs.length - 1]);
  };

  const infiniteFetchHomeTagPosts = async () => {
    const postsRef = collection(firestore, "posts");
    const q = query(
      postsRef,
      where("school", "==", school),
      where("tags", "array-contains-any", tags),
      orderBy("createdAt", "desc"),
      limit(20),
      startAfter(cursor)
    );
    const querySnapshot = await getDocs(q);
    const postList = [];
    querySnapshot.docs.map((doc) => {
      if (doc.data().creator !== user.uid) {
        postList.push(doc.data());
      }
    });
    setPosts([...posts, ...postList]);
    setCursor(querySnapshot.docs[querySnapshot.docs.length - 1]);
  };

  const infiniteFetchAlgoliaPosts = async () => {
    try {
      const postList = [];
      const { hits } = await postsIndex.search(projectSearch, {
        filters: `school:${school}`,
        hitsPerPage: 20,
        page: page + 1,
      });
      hits.map((hit) => {
        if (hit.creator !== user.uid) {
          postList.push(hit);
        }
      });
      setPosts([...posts, ...postList]);
      setPage(page + 1);
    } catch (error) {
      console.log("FUCK");
    }
  };

  useEffect(() => {
    if (cursor && tags && school) {
      // FULL VIEW

      if (observerFull.current) observerFull.current.disconnect();

      observerFull.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (page) {
            infiniteFetchAlgoliaPosts();
          } else {
            if (tags.length) {
              infiniteFetchHomeTagPosts();
            } else {
              infiniteFetchHomePosts();
            }
          }
        }
      });

      if (lastElementFull.current) {
        observerFull.current.observe(lastElementFull.current);
      }

      // BASE VIEW

      if (observerBase.current) observerBase.current.disconnect();

      observerBase.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (page) {
            infiniteFetchAlgoliaPosts();
          } else {
            if (tags) {
              infiniteFetchHomeTagPosts();
            } else {
              infiniteFetchHomePosts();
            }
          }
        }
      });

      if (lastElementBase.current) {
        observerBase.current.observe(lastElementBase.current);
      }
    }
  });

  return (
    <>
      <Flex alignItems={"flex-end"} h={"75px"} w={"600px"} maxW={"90%"}>
        <form onSubmit={submitProjectSearchHandler}>
          <InputGroup>
            <Input
              value={projectSearch}
              type={"search"}
              placeholder={"Search for projects"}
              color={"white"}
              boxShadow={"0px 0px 5px rgba(255, 255, 255, 0.5)"}
              onChange={(e) => setProjectSearch(e.target.value)}
            />
            <InputRightElement>
              <Button
                type={"submit"}
                variant={"ghost"}
                colorScheme={"whiteAlpha"}
                onClick={submitProjectSearchHandler}
              >
                <Search2Icon color={"#FFFFFF"} />
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
        <style jsx>{`
          form {
            width: 100%;
          }
        `}</style>
      </Flex>
      <Box
        align={"center"}
        w={"100%"}
        h={"100%"}
        overflowX={"hidden"}
        overflowY={"scroll"}
        sx={{
          "::-webkit-scrollbar": {
            width: "5px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#455765",
            borderRadius: "10px",
          },
        }}
      >
        {/** FULL VIEW */}

        <HomeFull
          school={school}
          posts={posts}
          tags={tags}
          loading={loading}
          lastElementFull={lastElementFull}
          submitFilterHandler={submitFilterHandler}
          display={{
            xxl: "flex",
            xl: "flex",
            lg: "flex",
            md: "none",
            sm: "none",
            base: "none",
          }}
        />

        {/** BASE VIEW */}

        <HomeBase
          school={school}
          posts={posts}
          tags={tags}
          loading={loading}
          lastElementBase={lastElementBase}
          submitFilterHandler={submitFilterHandler}
          display={{
            xxl: "none",
            xl: "none",
            lg: "none",
            md: "flex",
            sm: "flex",
            base: "flex",
          }}
        />
      </Box>
    </>
  );
};

export default Home;
