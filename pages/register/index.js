// FRONTEND IMPORTS

import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";

import RegisterLayoutHeader from "../../components/register/layout/Header";
import RegisterSignUp from "../../components/register/SignUp";
import RegisterSignIn from "../../components/register/SignIn";
import RegisterLayoutFooter from "../../components/register/layout/Footer";
import GlobalLoading from "../../components/global/pages/Loading";

// BACKEND IMPORTS

import firebase from "firebase/compat/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { firestore } from "../../utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// STRIPE IMPORTS

import { stripe } from "../../utils/stripe";

const Register = () => {
  const router = useRouter();
  const auth = getAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(true);
  const [register, setRegister] = useState(true);
  const [pageVisual, setPageVisual] = useState([true, false, false]);

  const chooseRegisterHandler = (register) => {
    setRegister(register);
  };

  // Auth Redirect

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/home");
      } else {
        setLoading(false);
      }
    });
  }, []);

  // SIGN IN

  const submitSignInHandler = async (email, password, setErrorState) => {
    onOpen();

    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/home");
      })
      .catch((error) => {
        setErrorState("Invalid username or email");
        onClose();
      });
  };

  // SIGN UP

  const submitSignUpHandler = async (
    username,
    email,
    password,
    firstName,
    lastName,
    month,
    numMonth,
    day,
    year,
    school
  ) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        createUser(
          user,
          username,
          email,
          firstName,
          lastName,
          month,
          numMonth,
          day,
          year,
          school
        );
      })
      .catch(() => {
        console.log("FUCK");
        onClose();
      });
  };

  const createUser = async (
    user,
    username,
    email,
    firstName,
    lastName,
    month,
    numMonth,
    day,
    year,
    school
  ) => {
    // Store user

    // const customer = await stripe.customers.create({
    //   email: email,
    //   name: `${firstName} ${lastName}`,
    // });

    await setDoc(doc(firestore, "users", user.uid), {
      username: username,
      firstName: firstName,
      lastName: lastName,
      description: "",
      status: "",
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/dreammate-b3ce5.appspot.com/o/default%2Fprofile-pic.png?alt=media&token=0ad567f6-756b-46e9-b2e8-755d57ebe7e6",
      coverPhotoURL:
        "https://firebasestorage.googleapis.com/v0/b/dreammate-b3ce5.appspot.com/o/default%2Fcover.png?alt=media&token=70c5e37e-61c1-4981-9744-b07a005e6331",
      dob: `${numMonth}/${day}/${year}`,
      school: school,
      postId: "",
      stripeId: "",
    });

    // Store socials

    await setDoc(doc(doc(firestore, "users", user.uid), "socials", "email"), {
      link: "",
    });

    await setDoc(
      doc(doc(firestore, "users", user.uid), "socials", "linkedin"),
      {
        link: "",
      }
    );

    await setDoc(
      doc(doc(firestore, "users", user.uid), "socials", "facebook"),
      {
        link: "",
      }
    );

    await setDoc(doc(doc(firestore, "users", user.uid), "socials", "twitter"), {
      link: "",
    });

    await setDoc(
      doc(doc(firestore, "users", user.uid), "socials", "instagram"),
      {
        link: "",
      }
    );

    await setDoc(doc(doc(firestore, "users", user.uid), "socials", "phone"), {
      link: "",
    });

    // Store username

    await setDoc(doc(firestore, "usernames", username), {
      user: user.uid,
    });

    // Store email

    const emailRef = doc(firestore, "emails", `${email}`);
    const emailSnap = await getDoc(emailRef);

    if (!emailSnap.exists()) {
      await setDoc(doc(firestore, "emails", email), {
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    router.push("/home");
  };

  return (
    <>
      {loading ? (
        <GlobalLoading />
      ) : (
        <Box
          w={"100vw"}
          h={"100vh"}
          overflowX={"hidden"}
          overflowY={"scroll"}
          bgColor={"#FEFEFE"}
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
          <RegisterLayoutHeader
            register={register}
            pageVisual={pageVisual}
            chooseRegisterHandler={chooseRegisterHandler}
          />
          <Box align={"center"} bgColor={"#FEFEFE"}>
            {register ? (
              <RegisterSignUp
                pageVisual={pageVisual}
                setPageVisual={setPageVisual}
                submitSignUpHandler={submitSignUpHandler}
              />
            ) : (
              <RegisterSignIn submitSignInHandler={submitSignInHandler} />
            )}
          </Box>
          <RegisterLayoutFooter
            register={register}
            chooseRegisterHandler={chooseRegisterHandler}
          />

          <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
            <ModalOverlay />
            <ModalContent
              justifyContent={"center"}
              alignItems={"center"}
              w={"100vw"}
              h={"100vh"}
              bgColor={"rgba(0, 0, 0, 0)"}
            >
              <Spinner color={"#FFFFFF"} size={"xl"} />
            </ModalContent>
          </Modal>
        </Box>
      )}
    </>
  );
};

export default Register;

Register.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
