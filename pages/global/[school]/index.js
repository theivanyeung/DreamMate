// FRONTEND IMPORTS

import { useEffect, useState, useContext, useRef } from "react";

import { useRouter } from "next/router";

import {
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import SchoolFull from "../../../components/school/Full";
import SchoolBase from "../../../components/school/Base";

import { UserContext } from "../../../utils/context";

// BACKEND IMPORTS

import { firestore } from "../../../utils/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore";

// ALGOLIA IMPORTS

import { postsIndex } from "../../../utils/algolia";

const GlobalSearch = () => {
  const { user } = useContext(UserContext);

  const router = useRouter();

  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [school, setSchool] = useState();
  const [projectSearch, setProjectSearch] = useState("");
  const [cursor, setCursor] = useState();
  const [page, setPage] = useState(0);

  const fetchSchoolPosts = async (school) => {
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

  const fetchSchoolTagPosts = async (tagList) => {
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

    const init = async () => {
      const q = query(
        collection(firestore, "schools"),
        where("id", "==", router.query.school)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 1) {
        querySnapshot.forEach((doc) => {
          setSchool(doc.id);
          fetchSchoolPosts(doc.id);
        });
      }
    };
    if (firestore && router) {
      init();
    }
  }, [firestore, router]);

  const submitFilterHandler = async (tagList) => {
    setTags(tagList);

    setLoading(true);

    if (tagList.length !== 0) {
      fetchSchoolTagPosts(tagList);
    } else {
      fetchSchoolPosts();
    }
  };

  const submitProjectSearchHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (projectSearch !== "") {
        const postList = [];
        const { hits } = await postsIndex.search(projectSearch, {
          filters: `school:${school}`,
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
        fetchSchoolPosts();
        setPage(0);
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

  const infiniteFetchSchoolPosts = async () => {
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

  const infiniteFetchSchoolTagPosts = async () => {
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
              infiniteFetchSchoolTagPosts();
            } else {
              infiniteFetchSchoolPosts();
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
              infiniteFetchSchoolTagPosts();
            } else {
              infiniteFetchSchoolPosts();
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
      <Flex alignItems={"center"} h={"75px"} w={"600px"} maxW={"90%"}>
        <form onSubmit={submitProjectSearchHandler}>
          <InputGroup>
            <Input
              value={projectSearch}
              type={"search"}
              placeholder={"Search for schools"}
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
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
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

        <SchoolFull
          posts={posts}
          tags={tags}
          loading={loading}
          school={school}
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

        <SchoolBase
          posts={posts}
          tags={tags}
          loading={loading}
          school={school}
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
      </Flex>
    </>
  );
};

export default GlobalSearch;
