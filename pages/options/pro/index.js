// FRONTEND IMPORTS

import { useState, useEffect, useContext } from "react";

import { Button, Flex } from "@chakra-ui/react";

import OptionsProPage from "../../../components/options/pages/ProPage";

import { UserContext } from "../../../utils/context";

// BACKEND IMPORTS

import { firestore } from "../../../utils/firebase";

import { doc, updateDoc } from "firebase/firestore";

// STRIPE IMPORTS

import { stripe } from "../../../utils/stripe";

const OptionsPro = () => {
  const { user, stripeId } = useContext(UserContext);

  const [subscription, setSubscription] = useState();

  useEffect(() => {
    const init = async () => {
      const subscriptions = await stripe.subscriptions.list({
        customer: stripeId,
      });
      setSubscription(subscriptions);
    };
    if (stripeId) {
      init();
    }
  }, [stripeId]);

  const postPurchaseHandler = async (session) => {
    if (
      session.url !== "http://localhost:3000/home" ||
      session.url !== "http://localhost:3000/options/pro"
    ) {
      window.location.href = session.url;
    }

    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${session.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
      }
    );
    const data = await response.json();

    const docRef = doc(firestore, "users", user.uid);
    await updateDoc(docRef, {
      stripeId: data.customer,
    });

    window.location.href = session.url;
  };

  const submitProHandler = async () => {
    const response = await fetch("/api/pro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
      }),
    });
    if (response.ok) {
      const session = await response.json();
      window.location.href = session.url;
    } else {
      console.error(response.statusText);
    }
  };

  const handleClick = async () => {
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeId,
    });
    window.location = session.url;
  };

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      w={"100%"}
      h={"100%"}
      overflowX={"hidden"}
      overflowY={"auto"}
      paddingTop={"50px"}
      paddingBottom={"150px"}
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
      <OptionsProPage
        subscription={subscription}
        submitProHandler={submitProHandler}
        handleClick={handleClick}
      />
    </Flex>
  );
};

export default OptionsPro;

OptionsPro.getLayoutOptions = function PageLayout(page) {
  return <>{page}</>;
};
