import { useEffect, useState } from "react";

import { getAuth } from "firebase/auth";
import { firestore } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const useUserData = () => {
  const auth = getAuth();

  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [description, setDescription] = useState(null);
  const [status, setStatus] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [photoName, setPhotoName] = useState(null);
  const [coverPhotoURL, setCoverPhotoURL] = useState(null);
  const [coverPhotoName, setCoverPhotoName] = useState(null);
  const [dob, setDob] = useState(null);
  const [school, setSchool] = useState(null);
  const [recruiting, setRecruiting] = useState(null);
  const [postId, setPostId] = useState(null);
  const [stripeId, setStripeId] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        if (doc.data()) {
          setUsername(doc.data().username);
          setFirstName(doc.data().firstName);
          setLastName(doc.data().lastName);
          setDescription(doc.data().description);
          setStatus(doc.data().status);
          setPhotoURL(doc.data().photoURL);
          setPhotoName(doc.data().photoName);
          setCoverPhotoURL(doc.data().setCoverPhotoURL);
          setCoverPhotoName(doc.data().coverPhotoName);
          setDob(doc.data().dob);
          setSchool(doc.data().school);
          setRecruiting(doc.data().recruiting);
          setPostId(doc.data().postId);
          setStripeId(doc.data().stripeId);
        }
      });
    } else {
      setUsername(null);
      setFirstName(null);
      setLastName(null);
      setDescription(null);
      setStatus(null);
      setPhotoURL(null);
      setPhotoName(null);
      setCoverPhotoURL(null);
      setCoverPhotoName(null);
      setDob(null);
      setSchool(null);
      setRecruiting(null);
      setPostId(null);
      setStripeId(null);
    }

    return unsubscribe;
  }, [user]);

  return {
    username,
    user,
    firstName,
    lastName,
    description,
    status,
    photoURL,
    photoName,
    coverPhotoURL,
    coverPhotoName,
    dob,
    school,
    recruiting,
    postId,
    stripeId,
  };
};
