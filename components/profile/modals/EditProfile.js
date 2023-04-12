// FRONTEND IMPORTS

import { useState, useContext, useEffect } from "react";

import Image from "next/image";

import {
  ModalContent,
  Box,
  Heading,
  Flex,
  Input,
  Textarea,
  Button,
  SkeletonCircle,
  CircularProgress,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Divider,
} from "@chakra-ui/react";
import { ChevronDownIcon, DeleteIcon, PhoneIcon } from "@chakra-ui/icons";

import { UserContext } from "../../../utils/context";

// BACKEND IMPORTS

import { firestore } from "../../../utils/firebase";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const ProfileModalEditProfile = (props) => {
  const { creatorData } = props;

  const { user } = useContext(UserContext);

  const [initialPhotoName, setInitialPhotoName] = useState(
    creatorData && creatorData.photoName
  );
  const [initialPhotoURL, setInitialPhotoURL] = useState(
    creatorData && creatorData.photoURL
  );

  const [photoName, setPhotoName] = useState(
    creatorData && creatorData.photoName
  );
  const [photoURL, setPhotoURL] = useState(creatorData && creatorData.photoURL);
  const [firstName, setFirstName] = useState(
    creatorData && creatorData.firstName
  );
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastName, setLastName] = useState(creatorData && creatorData.lastName);
  const [lastNameInput, setLastNameInput] = useState("");
  const [description, setDescription] = useState(
    creatorData && creatorData.description
  );
  const [descriptionInput, setDescriptionInput] = useState(
    creatorData && creatorData.description
  );
  const [status, setStatus] = useState(creatorData && creatorData.status);
  const [statusInput, setStatusInput] = useState(
    creatorData && creatorData.status
  );
  const [selectedFile, setSelectedFile] = useState();
  const [uploadProgress, setUploadProgress] = useState(null);

  const [socialOptions, setSocialOptions] = useState(props.socialOptions);
  const [socialList, setSocialList] = useState(props.socialList);

  const [openSocials, setOpenSocials] = useState(false);

  return (
    <ModalContent
      boxShadow={"0px 0px 3px 2px rgba(0, 0, 0, 0.25)"}
      borderRadius={props.isFull ? "0px" : "12px"}
      bgColor={"#383838"}
    >
      <Box align={"center"} w={"100%"} h={"100%"}>
        <Box mt={"15px"} align={"left"} w={"90%"}>
          {/** PROFILE PHOTO */}

          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            h={"40px"}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"lg"}
              lineHeight={"27px"}
              letterSpacing={"0.1em"}
              color={"#FFFFFF"}
            >
              About Me
            </Heading>
            <PhotoUpload
              user={user}
              photoName={photoName}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setUploadProgress={setUploadProgress}
              setPhotoURL={setPhotoURL}
              setPhotoName={setPhotoName}
            />
          </Flex>
          <Box mt={"15px"} align={"center"} w={"100%"}>
            <Box
              w={"150px"}
              h={"150px"}
              borderRadius={"1000px"}
              overflow={"hidden"}
            >
              {uploadProgress ? (
                <CircularProgress
                  value={uploadProgress}
                  thickness={"5px"}
                  size={"150px"}
                  color={"#000000"}
                />
              ) : photoURL ? (
                <Image src={photoURL} alt={"Avatar"} width={150} height={150} />
              ) : (
                <SkeletonCircle
                  startColor={"#151515"}
                  endColor={"#2B2B2B"}
                  size={"150"}
                />
              )}
            </Box>
          </Box>

          {/** BIO */}

          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={"15px"}
            w={"100%"}
            gap={"5px"}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              lineHeight={"27px"}
              letterSpacing={"0.1em"}
              color={"#FFFFFF"}
            >
              First Name*
            </Heading>
            <Input
              placeholder={firstName && firstName}
              w={"75%"}
              borderRadius={"12px"}
              color={"#FFFFFF"}
              onChange={(e) => setFirstNameInput(e.target.value)}
            />
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={"15px"}
            w={"100%"}
            gap={"5px"}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              lineHeight={"27px"}
              letterSpacing={"0.1em"}
              color={"#FFFFFF"}
            >
              Last Name*
            </Heading>
            <Input
              placeholder={lastName && lastName}
              w={"75%"}
              borderRadius={"12px"}
              color={"#FFFFFF"}
              onChange={(e) => setLastNameInput(e.target.value)}
            />
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={"15px"}
            w={"100%"}
            gap={"5px"}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              lineHeight={"27px"}
              letterSpacing={"0.1em"}
              color={"#FFFFFF"}
            >
              Status
            </Heading>
            <Input
              placeholder={status && status}
              w={"75%"}
              borderRadius={"12px"}
              color={"#FFFFFF"}
              onChange={(e) => setStatusInput(e.target.value)}
            />
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={"15px"}
            w={"100%"}
            gap={"5px"}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              lineHeight={"27px"}
              letterSpacing={"0.1em"}
              color={"#FFFFFF"}
            >
              About Me
            </Heading>
            <Textarea
              placeholder={description && description}
              w={"75%"}
              h={"150px"}
              borderRadius={"12px"}
              color={"#FFFFFF"}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          </Flex>

          <Divider my={"30px"} />

          {openSocials === false && (
            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              mt={"15px"}
            >
              <Button
                mb={"15px"}
                colorScheme={"whiteAlpha"}
                bgColor={"#000000"}
                onClick={() => setOpenSocials(true)}
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"md"}
                  letterSpacing={"0.1em"}
                  color={"#FFFFFF"}
                >
                  Edit Socials
                </Heading>
              </Button>
            </Flex>
          )}
          {openSocials && (
            <Socials
              socialOptions={socialOptions}
              socialList={socialList}
              setSocialList={setSocialList}
              setSocialOptions={setSocialOptions}
            />
          )}

          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            h={"100px"}
          >
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"40%"}
              gap={"25px"}
            >
              <CancelBtn
                onClose={props.onClose}
                user={user}
                photoName={photoName}
                initialPhotoName={initialPhotoName}
                initialPhotoURL={initialPhotoURL}
              />
              <SaveBtn
                onClose={props.onClose}
                user={user}
                firstName={firstName}
                firstNameInput={firstNameInput}
                lastName={lastName}
                lastNameInput={lastNameInput}
                description={description}
                descriptionInput={descriptionInput}
                status={status}
                statusInput={statusInput}
                photoName={photoName}
                initialPhotoName={initialPhotoName}
                socialList={socialList}
                socialOptions={socialOptions}
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </ModalContent>
  );
};

const PhotoUpload = (props) => {
  const {
    user,
    photoName,
    selectedFile,
    setSelectedFile,
    setUploadProgress,
    setPhotoURL,
    setPhotoName,
  } = props;

  const userRef = firestore.collection("users").doc(user.uid);

  const storage = getStorage();

  useEffect(() => {
    userRef.get().then((doc) => {
      setPhotoName(doc.data().photoName);
    });
  }, [selectedFile]);

  const updatePhoto = async (downloadURL, event) => {
    await updateDoc(userRef, {
      photoURL: downloadURL,
      photoName: event.target.files[0].name,
    });
  };

  const fileChangeHandler = async (event) => {
    setSelectedFile(event.target.files[0]);

    // Delete previous file

    if (props.photoName) {
      const prePhotoRef = ref(
        storage,
        `users/${user.uid}/profile/photo/${props.photoName}`
      );
      deleteObject(prePhotoRef)
        .then(() => {})
        .catch(() => {});
    }

    // Upload file to storage

    if (event.target.files[0] && event.target.files[0].name !== photoName) {
      const photoRef = ref(
        storage,
        `users/${user.uid}/profile/photo/${event.target.files[0].name}`
      );
      const uploadTask = uploadBytesResumable(photoRef, event.target.files[0]);
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
            setPhotoURL(downloadURL);
            updatePhoto(downloadURL, event);
            setSelectedFile(null);
          });
        }
      );
    }
  };

  return (
    <Flex w={"100px"} h={"30px"} overflow={"hidden"} borderRadius={"12px"}>
      <Button
        w={"100px"}
        h={"30px"}
        bgColor={"#000000"}
        borderRadius={"12px"}
        position={"absolute"}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"sm"}
          position={"absolute"}
          color={"#FFFFFF"}
        >
          Upload Photo
        </Heading>
      </Button>
      <Input
        type={"file"}
        accept={"image/*"}
        opacity={"0"}
        onChange={fileChangeHandler}
      />
    </Flex>
  );
};

const Socials = (props) => {
  const { socialOptions, socialList, setSocialList, setSocialOptions } = props;

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={"15px"}
    >
      <Menu>
        <MenuButton
          as={Button}
          mb={"15px"}
          colorScheme={"whiteAlpha"}
          bgColor={"#000000"}
          rightIcon={<ChevronDownIcon color={"#FFFFFF"} />}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            letterSpacing={"0.1em"}
            color={"#FFFFFF"}
          >
            Add Socials
          </Heading>
        </MenuButton>
        <MenuList>
          {socialOptions.map((item, index) => {
            return (
              <MenuItem
                key={index}
                icon={
                  item.alt === "Phone Icon" ? (
                    <PhoneIcon boxSize={"15px"} />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={15}
                      height={15}
                    />
                  )
                }
                onClick={() => {
                  setSocialList((existingSocials) => {
                    return [
                      ...existingSocials,
                      {
                        src: item.src,
                        title: item.alt.slice(0, -5),
                        alt: item.alt,
                        input: "",
                      },
                    ];
                  });
                  setSocialOptions((existingSocials) => {
                    return [
                      ...existingSocials.slice(0, index),
                      ...existingSocials.slice(index + 1),
                    ];
                  });
                }}
              >
                {item.alt.slice(0, -5)}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>

      {socialList.map((item, index) => {
        return (
          <Flex
            key={index}
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={"15px"}
            w={"100%"}
            gap={"15px"}
          >
            {item.alt === "Phone Icon" ? (
              <PhoneIcon boxSize={"30px"} color={"#FFFFFF"} />
            ) : (
              <Image src={item.src} alt={item.alt} width={30} height={30} />
            )}
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              letterSpacing={"0.1em"}
              color={"#FFFFFF"}
            >
              {item.title}
            </Heading>
            <Input
              placeholder={item.input}
              borderRadius={"12px"}
              color={"#FFFFFF"}
              onChange={(e) => {
                setSocialList((existingSocials) => {
                  return [
                    ...existingSocials.slice(0, index),
                    {
                      src: existingSocials[index].src,
                      title: existingSocials[index].title,
                      alt: existingSocials[index].alt,
                      link: existingSocials[index].link,
                      input: e.target.value,
                    },
                    ...existingSocials.slice(index + 1),
                  ];
                });
              }}
            />
            <Button
              variant={"ghost"}
              _hover={{
                backgroundColor: "#000000",
              }}
              onClick={() => {
                setSocialList((existingSocials) => {
                  return [
                    ...existingSocials.slice(0, index),
                    ...existingSocials.slice(index + 1),
                  ];
                });
                setSocialOptions((existingSocials) => {
                  return [
                    ...existingSocials,
                    {
                      src: item.src,
                      alt: item.alt,
                    },
                  ];
                });
              }}
            >
              <DeleteIcon color={"#FFFFFF"} />
            </Button>
          </Flex>
        );
      })}
    </Flex>
  );
};

const CancelBtn = (props) => {
  const { user, photoName, initialPhotoName, initialPhotoURL } = props;

  const userRef = firestore.collection("users").doc(user.uid);

  const storage = getStorage();

  const cancelHandler = async () => {
    if (initialPhotoName !== photoName) {
      await updateDoc(userRef, {
        photoURL: initialPhotoURL,
        photoName: initialPhotoName,
      });

      const photoRef = ref(
        storage,
        `users/${user.uid}/profile/photo/${photoName}`
      );
      deleteObject(photoRef)
        .then(() => {})
        .catch(() => {});
    }
  };

  return (
    <Button
      w={"70px"}
      h={"30px"}
      bgColor={"#EFEFEF"}
      borderRadius={"12px"}
      onClick={() => {
        props.onClose();
        cancelHandler();
      }}
    >
      <Heading fontWeight={"medium"} fontSize={"sm"}>
        Cancel
      </Heading>
    </Button>
  );
};

const SaveBtn = (props) => {
  const {
    user,
    firstName,
    firstNameInput,
    lastName,
    lastNameInput,
    description,
    descriptionInput,
    status,
    statusInput,
    photoName,
    initialPhotoName,
    socialList,
    socialOptions,
  } = props;

  const userRef = firestore.collection("users").doc(user.uid);

  const storage = getStorage();

  const saveHandler = async () => {
    const re = /^(?=[a-zA-Z0-9._]{3,30}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (
      firstName !== firstNameInput &&
      firstNameInput &&
      re.test(firstNameInput)
    ) {
      await updateDoc(userRef, {
        firstName: firstNameInput,
      });
    }
    if (lastName !== lastNameInput && lastNameInput && re.test(lastNameInput)) {
      await updateDoc(userRef, {
        lastName: lastNameInput,
      });
    }
    if (description !== descriptionInput) {
      await updateDoc(userRef, {
        description: descriptionInput,
      });
    }
    if (status !== statusInput) {
      await updateDoc(userRef, {
        status: statusInput,
      });
    }
    if (initialPhotoName !== photoName) {
      const photoRef = ref(
        storage,
        `users/${user.uid}/profile/photo/${initialPhotoName}`
      );
      deleteObject(photoRef)
        .then(() => {})
        .catch(() => {});
    }
    socialList.forEach((item) => {
      if (item.input && item.input !== item.link) {
        saveSocialHandler(item);
      }
    });
    socialOptions.forEach((item) => {
      deleteSocialHandler(item);
    });
  };

  const saveSocialHandler = async (item) => {
    await setDoc(
      doc(
        doc(firestore, "users", user.uid),
        "socials",
        item.title.toLowerCase()
      ),
      {
        link: item.input,
      }
    );
  };

  const deleteSocialHandler = async (item) => {
    await setDoc(
      doc(
        doc(firestore, "users", user.uid),
        "socials",
        item.alt.slice(0, -5).toLowerCase()
      ),
      {
        link: "",
      }
    );
  };

  return (
    <Button
      w={"70px"}
      h={"30px"}
      bgColor={"#000000"}
      borderRadius={"12px"}
      onClick={() => {
        props.onClose();
        saveHandler();
      }}
    >
      <Heading fontWeight={"medium"} fontSize={"sm"} color={"#FFFFFF"}>
        Save
      </Heading>
    </Button>
  );
};

export default ProfileModalEditProfile;
