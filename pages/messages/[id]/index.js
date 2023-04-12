import { Flex } from "@chakra-ui/react";
import ChatMessageControl from "../../../components/messages/MessageControl";
import MessagesMessageControl from "../../../components/messages/MessageControl";
import ChatMessageView from "../../../components/messages/MessageView";

const Messages = () => {
  return <ChatMessageView />;
};

export default Messages;

Messages.getLayoutMessages = function PageLayout(page) {
  return <>{page}</>;
};
