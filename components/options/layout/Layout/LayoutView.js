import { useRouter } from "next/router";

import { Flex, List, ListItem } from "@chakra-ui/react";

import OptionsLayoutPageBtn from "./Btn/PageBtn";
import OptionsLayoutSelectedPageBtn from "./Btn/SelectedPageBtn";

import { Options } from "../../../items";
import OptionsSignOut from "../../components/SignOut";

const OptionsLayoutLayoutView = (props) => {
  const route = useRouter();
  const path = route.asPath;

  const getOptionsPath = (path) => {
    for (let n = 10; n < path.length; n++) {
      if (path.substring(n, n + 1) == "/") {
        return path.substring(9, n);
      }
    }
    return path.substring(9, path.length);
  };
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      h={"100%"}
      paddingY={"20px"}
      bgColor={"#212121"}
      {...props}
    >
      <List>
        {Options.map((option, index) => (
          <ListItem key={index}>
            {getOptionsPath(path) === option.id ? (
              <OptionsLayoutSelectedPageBtn
                onClose={props.onClose}
                title={option.title}
                link={option.link}
                icon={option.icon}
              />
            ) : (
              <OptionsLayoutPageBtn
                onClose={props.onClose}
                title={option.title}
                link={option.link}
                icon={option.icon}
              />
            )}
          </ListItem>
        ))}
      </List>
      <OptionsSignOut />
    </Flex>
  );
};

export default OptionsLayoutLayoutView;
