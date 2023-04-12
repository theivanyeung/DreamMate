import { Box } from "@chakra-ui/react";

import ChatMessageViewLayoutTopBar from "./Layout/TopBar";
import ChatMessageViewLayoutBottomBar from "./Layout/BottomBar";

const ChatMessageViewLayout = (props) => {
  return (
    <Box w={"100%"} h={"100%"} bgColor={"#292929"}>
      <ChatMessageViewLayoutTopBar user={props.user} member={props.member} />
      <Box w={"100%"} h={"calc(100% - 110px)"}>
        {props.children}
      </Box>
      <ChatMessageViewLayoutBottomBar
        user={props.user}
        messageId={props.messageId}
      />
    </Box>
  );
};

export default ChatMessageViewLayout;
