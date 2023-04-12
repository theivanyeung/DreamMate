// FRONTEND IMPORTS

import { useState, useEffect, useContext } from "react";

import Image from "next/image";

import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Flex,
  ModalContent,
  ModalCloseButton,
  CircularProgress,
  Skeleton,
} from "@chakra-ui/react";

import ProfileModalCreatePostFirst from "./CreatePost/First";
import ProfileModalCreatePostSecond from "./CreatePost/Second";
import ProfileModalCreatePostLoading from "./CreatePost/Loading";
import ProfileModalCreatePostSubmit from "./CreatePost/Submit";

import { UserContext } from "../../../utils/context";

// BACKEND IMPORTS

import firebase from "firebase/compat/app";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

import { firestore, storage } from "../../../utils/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const ProfileModalCreatePost = (props) => {
  const { user, postId, school } = useContext(UserContext);

  const [modal, setModal] = useState(0);
  const [postData, setPostData] = useState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [website, setWebsite] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState();
  const [thumbnailName, setThumbnailName] = useState();
  const [thumbnailFile, setThumbnailFile] = useState();
  const [uploadProgress, setUploadProgress] = useState(null);

  useEffect(() => {
    const init = async () => {
      const postRef = doc(firestore, "posts", postId);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        setPostData(postSnap.data());
      }
    };

    if (postId) {
      init();
    }
  }, [postId]);

  // DETAILS HANDLER

  const detailHandler = (title, description, lookingFor, website) => {
    setTitle(title);
    setDescription(description);
    setLookingFor(lookingFor);
    setWebsite(website);
    setModal(1);
  };

  // THUMBNAIL HANDLERS

  const deleteThumbnail = async () => {
    const storageRef = ref(storage, `temp/thumbnails/${thumbnailName}`);
    deleteObject(storageRef)
      .then(() => {})
      .catch(() => {});
  };

  const thumbnailChangeHandler = async (e) => {
    if (e.target.files[0]) {
      setThumbnailURL();
      setThumbnailName(e.target.files[0].name);
      setThumbnailFile(e.target.files[0]);

      if (
        thumbnailURL &&
        thumbnailName &&
        e.target.files[0].name !== thumbnailName
      ) {
        deleteThumbnail();
      }

      if (e.target.files[0].name !== thumbnailName) {
        const storageRef = ref(
          storage,
          `temp/thumbnails/${e.target.files[0].name}`
        );

        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUploadProgress(null);
              setThumbnailURL(downloadURL);
            });
          }
        );
      }
    }
  };

  // SUBMIT HANDLER

  const createPostHandler = async (tags) => {
    setModal(2);
    deleteThumbnail();

    if (postId) {
      const postRef = doc(firestore, "posts", postId);
      const postSnap = await getDoc(postRef);
      const storageRef = ref(
        storage,
        `users/${user.uid}/posts/${postSnap.data().thumbnailName}`
      );
      deleteObject(storageRef)
        .then(() => {})
        .catch(() => {});
    }

    const postThumbNailRef = ref(
      storage,
      `users/${user.uid}/posts/${thumbnailName}`
    );
    const uploadTask = uploadBytesResumable(postThumbNailRef, thumbnailFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          uploadPostHandler(tags, downloadURL);
        });
        console.log("SUCCESS!");
      }
    );
  };

  const uploadPostHandler = async (tags, downloadURL) => {
    const newPostData = {
      title: title,
      description: description,
      thumbnailURL: thumbnailURL ? downloadURL : "",
      thumbnailName: thumbnailName ? thumbnailName : "",
      creator: user.uid,
      tags: tags,
      lookingFor: lookingFor,
      website: website,
      school: school,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    console.log(thumbnailURL);
    console.log(downloadURL);

    const userRef = doc(firestore, "users", user.uid);

    if (postId) {
      await setDoc(doc(firestore, "posts", postId), newPostData);

      const oldPostRef = doc(firestore, "posts", postId);
      const oldPostSnap = await getDoc(oldPostRef);

      // Deleting previous thumbnail from storage
      const postThumbnailRef = ref(
        storage,
        `users/${user.uid}/posts/${oldPostSnap.data().thumbnailName}`
      );
      deleteObject(postThumbnailRef)
        .then(() => {})
        .catch(() => {});

      postData.tags.map((tag) => {
        updateTagHandler(tag, false);
      });
    } else {
      const postRef = await addDoc(collection(firestore, "posts"), newPostData);
      await updateDoc(userRef, {
        postId: postRef.id,
      });
    }

    tags.map((tag) => {
      updateTagHandler(tag, true);
    });

    setModal(3);
  };

  const updateTagHandler = async (tag, increase) => {
    const tagRef = doc(firestore, "tags", tag);
    const tagSnap = await getDoc(tagRef);

    if (tagSnap.exists()) {
      if (increase) {
        await updateDoc(tagRef, {
          uses: increment(1),
        });
      } else {
        await updateDoc(tagRef, {
          uses: increment(-1),
        });
      }
    } else {
      await setDoc(tagRef, {
        uses: 1,
      });
    }
  };

  return (
    <ModalContent
      boxShadow={"0px 0px 3px 2px rgba(0, 0, 0, 0.25)"}
      borderRadius={"12px"}
      bgColor={"#383838"}
    >
      <Box align={"center"} w={"100%"}>
        <Box align={"center"} mt={"10px"} w={"100%"}>
          {(() => {
            switch (modal) {
              case 0:
                return (
                  <ProfileModalCreatePostFirst
                    detailHandler={detailHandler}
                    deleteThumbnail={deleteThumbnail}
                  />
                );
              case 1:
                return (
                  <ProfileModalCreatePostSecond
                    thumbnailURL={thumbnailURL}
                    uploadProgress={uploadProgress}
                    thumbnailChangeHandler={thumbnailChangeHandler}
                    createPostHandler={createPostHandler}
                    deleteThumbnail={deleteThumbnail}
                  />
                );
              case 2:
                return <ProfileModalCreatePostLoading />;
              case 3:
                return <ProfileModalCreatePostSubmit onClose={props.onClose} />;
            }
          })()}
        </Box>
      </Box>
    </ModalContent>
  );
};

export default ProfileModalCreatePost;
