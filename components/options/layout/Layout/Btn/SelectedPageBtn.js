import Link from "next/link";
import Image from "next/image";

import { Button, Heading } from "@chakra-ui/react";

const OptionsLayoutSelectedPageBtn = (props) => {
  return (
    <Link href={props.link}>
      <Button
        my={"15px"}
        w={"200px"}
        maxW={"85%"}
        h={"40px"}
        bgColor={"#454545"}
        colorScheme={"whiteAlpha"}
        borderRadius={"6px"}
        onClick={props.onClose}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"lg"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          {props.title}
        </Heading>
      </Button>
    </Link>
  );
};

export default OptionsLayoutSelectedPageBtn;
