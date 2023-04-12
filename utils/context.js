import { createContext } from "react";

export const UserContext = createContext({
  user: null,
  username: null,
  firstName: null,
  lastName: null,
  description: null,
  photoURL: null,
  photoName: null,
  coverPhotoURL: null,
  coverPhotoName: null,
  email: null,
  linkedin: null,
  facebook: null,
  twitter: null,
  instagram: null,
  phoneNum: null,
  dob: null,
  school: null,
  recruiting: null,
  postId: null,
  stripeId: null,
});
