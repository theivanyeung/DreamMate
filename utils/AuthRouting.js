import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import GlobalLoading from "../components/global/pages/Loading";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthRouting = ({ children }) => {
  const router = useRouter();
  const auth = getAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        router.push("/register");
      }
    });
  }, []);

  return <>{loading ? <GlobalLoading /> : children}</>;
};

export default AuthRouting;
