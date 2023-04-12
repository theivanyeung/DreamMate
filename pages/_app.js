// FRONTEND IMPORTS

import { useState } from "react";

import Head from "next/head";
import Router from "next/router";

import { ChakraProvider, Flex } from "@chakra-ui/react";

import TopBarProgress from "react-topbar-progress-indicator";

import customTheme from "../styles/customTheme";

import GlobalLayout from "../components/global/layout/Layout";
import OptionsLayout from "../components/options/layout/Layout";
import ChatMessageControl from "../components/messages/MessageControl";

// BACKEND IMPORTS

import AuthRouting from "../utils/AuthRouting";
import { UserContext } from "../utils/context";
import { useUserData } from "../utils/hooks";

TopBarProgress.config({
  barColors: {
    0: "#FEFEFE",
    "1.0": "#FEFEFE",
  },
  shadowBlur: 5,
  shadowColor: "#000000",
});

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  // TopBar Progress

  const [progress, setProgress] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setProgress(true);
  });

  Router.events.on("routeChangeComplete", () => {
    setProgress(false);
  });

  if (Component.getLayoutC) {
    return Component.getLayoutC(
      <ChakraProvider resetCss theme={customTheme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    );
  }

  if (Component.getLayoutOptions) {
    return Component.getLayoutOptions(
      <UserContext.Provider value={userData}>
        {progress && <TopBarProgress />}
        <ChakraProvider resetCss theme={customTheme}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="shortcut icon" href="/favicon/favicon.ico" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
          </Head>
          <AuthRouting>
            <GlobalLayout>
              <OptionsLayout>
                <Component {...pageProps} />
              </OptionsLayout>
            </GlobalLayout>
          </AuthRouting>
        </ChakraProvider>
      </UserContext.Provider>
    );
  }

  if (Component.getLayoutMessages) {
    return Component.getLayoutMessages(
      <UserContext.Provider value={userData}>
        {progress && <TopBarProgress />}
        <ChakraProvider resetCss theme={customTheme}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="shortcut icon" href="/favicon/favicon.ico" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
          </Head>
          <AuthRouting>
            <GlobalLayout>
              <Flex w={"100%"} h={"100%"} overflow={"hidden"}>
                <ChatMessageControl />
                <Component {...pageProps} />
              </Flex>
            </GlobalLayout>
          </AuthRouting>
        </ChakraProvider>
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={userData}>
      {progress && <TopBarProgress />}
      <ChakraProvider resetCss theme={customTheme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <AuthRouting>
          <GlobalLayout>
            <Component {...pageProps} />
          </GlobalLayout>
        </AuthRouting>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
