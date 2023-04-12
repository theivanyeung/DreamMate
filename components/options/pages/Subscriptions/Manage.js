import { useContext, useEffect, useState } from "react";

import { Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { UserContext } from "../../../../utils/context";
import { stripe } from "../../../../utils/stripe";

const OptionsSubscriptionPageManage = () => {
  const { stripeId } = useContext(UserContext);

  const [subscription, setSubscription] = useState();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    const init = async () => {
      const subscriptions = await stripe.subscriptions.list({
        customer: stripeId,
      });
      setSubscription(subscriptions);
      setLoading(false);
    };
    if (stripeId) {
      init();
    } else {
      setLoading(false);
    }
  }, [stripeId]);

  const handleClick = async () => {
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeId,
    });
    window.location = session.url;
  };

  return (
    <>
      <Heading
        fontWeight={"medium"}
        fontSize={"2xl"}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
        w={"100%"}
        textAlign={"left"}
      >
        Your Subscriptions
      </Heading>

      <Heading
        fontWeight={"normal"}
        fontSize={"md"}
        letterSpacing={"0.05em"}
        color={"#DCDDDE"}
        w={"100%"}
        textAlign={"left"}
      >
        These are your current subscriptions. They will be billed on the same
        billing cycle. You can update any subscriptions at any time.
      </Heading>

      <Heading
        fontWeight={"normal"}
        fontSize={"lg"}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
        w={"100%"}
        paddingX={"10px"}
        paddingY={"25px"}
        border={"1px solid #FFFFFF"}
        borderRadius={"12px"}
      >
        You have no active subscriptions. 🤔
      </Heading>

      {/** Resurrect when implementing pro plan */}

      {/* {loading !== null &&
        (loading ? (
          <Spinner size={"lg"} color={"#FFFFFF"} />
        ) : subscription ? (
          <Button
            colorScheme={"whiteAlpha"}
            w={"100%"}
            rightIcon={<ExternalLinkIcon color={"#FFFFFF"} />}
            onClick={handleClick}
          >
            <Heading
              fontWeight={"normal"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
              color={"#FFFFFF"}
            >
              🔥 Manage your subscriptions
            </Heading>
          </Button>
        ) : (
          <Heading
            fontWeight={"normal"}
            fontSize={"lg"}
            letterSpacing={"0.05em"}
            color={"#FFFFFF"}
            w={"100%"}
            paddingX={"10px"}
            paddingY={"25px"}
            border={"1px solid #FFFFFF"}
            borderRadius={"12px"}
          >
            You have no active subscriptions. 🤔
          </Heading>
        ))} */}
    </>
  );
};

export default OptionsSubscriptionPageManage;
