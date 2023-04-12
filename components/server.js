import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  arrayUnion,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { firestore } from "../utils/firebase";

{
  /** FUNCTIONS */
}

// Change cover

export const CoverChangeHandler = async (e, user, setProgress) => {
  const storage = getStorage();

  const addDocumentURL = async (url, fileName) => {
    if (user) {
      await updateDoc(doc(firestore, "users", user.uid), {
        coverPhotoName: fileName,
        coverPhotoURL: url,
      });
    }
  };

  if (user && e.target.files[0]) {
    // Get initial cover name

    const docRef = doc(firestore, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Delete previous cover

      if (docSnap.data().coverPhotoName) {
        const initialCoverRef = ref(
          storage,
          `users/${user.uid}/profile/cover/${docSnap.data().coverPhotoName}`
        );
        deleteObject(initialCoverRef)
          .then(() => {})
          .catch(() => {});
      }
    }

    // Add new cover

    const coverRef = ref(
      storage,
      `users/${user.uid}/profile/cover/${e.target.files[0].name}`
    );
    const uploadTask = uploadBytesResumable(coverRef, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      () => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDocumentURL(downloadURL, e.target.files[0].name);
          setProgress(null);
        });
      }
    );
  }
};

// Go to message

const createMessageDoc = async (members, router) => {
  const docRef = await addDoc(collection(firestore, "messages"), {
    members: members.map((member) => {
      return member.id;
    }),
    active: members.map((member) => {
      return member.id;
    }),
  });
  router.push(`/messages/${docRef.id}`);
};

const rejoinDMHandler = async (id, data, user, router) => {
  if (data.members.includes(user.uid)) {
    const messageRef = doc(firestore, "messages", id);
    await updateDoc(messageRef, {
      active: arrayUnion(user.uid),
    });
  }
  router.push(`/messages/${id}`);
};

export const createMessageHandler = async (members, user, router) => {
  let exists = false;

  try {
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
            rejoinDMHandler(doc.id, doc.data(), user, router);
          }
        }
      }
    });
    if (exists === false) {
      createMessageDoc(members, router);
    }
  } catch (error) {
    console.log(error);
  }
};
