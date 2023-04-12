import Link from "next/link";

import {
  Flex,
  Heading,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import LayoutHeaderDrawer from "./modal/Drawer";

const LayoutHeaderBase = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h={"150px"}
      display={props.display}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"85%"}>
        <Link href={"/"}>
          <Flex as={"button"}>
            <Heading fontWeight={"medium"} fontSize={"5xl"} color={"#FFFFFF"}>
              Dream&nbsp;
            </Heading>
            <Heading fontWeight={"light"} fontSize={"5xl"} color={"#FFFFFF"}>
              Mate
            </Heading>
          </Flex>
        </Link>

        <Button onClick={onOpen}>
          <HamburgerIcon />
        </Button>
      </Flex>

      <Drawer
        placement={"right"}
        size={"full"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <LayoutHeaderDrawer onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default LayoutHeaderBase;
