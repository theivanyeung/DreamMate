import { Box, Flex, Heading, UnorderedList, ListItem } from "@chakra-ui/react";

import SEO from "../../../components/SEO";
import LayoutHeader from "../../../components/c/layout/Header";
import LayoutFooter from "../../../components/c/layout/Footer";

import {
  TOS_SEO_TITLE,
  TOS_SEO_DESCRIPTION,
  TOS_SEO_KEYWORDS,
  TOS_SEO_IMAGE,
  TOS_PRODUCTION_URL,
} from "../../../components/constants";

const TOS = () => {
  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      overflowX={"hidden"}
      overflowY={"scroll"}
      sx={{
        "::-webkit-scrollbar": {
          width: "5px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#455765",
          borderRadius: "10px",
        },
      }}
    >
      <SEO
        title={TOS_SEO_TITLE}
        description={TOS_SEO_DESCRIPTION}
        keywords={TOS_SEO_KEYWORDS}
        image={TOS_SEO_IMAGE}
        url={TOS_PRODUCTION_URL}
      />
      <Box align={"center"} bgColor={"#151515"} overflow={"hidden"}>
        <LayoutHeader />
        <Flex
          flexDirection={"column"}
          gap={"25px"}
          w={"1000px"}
          maxW={"85%"}
          mt={"50px"}
          mb={"250px"}
        >
          <Heading
            my={"10px"}
            fontWeight={"medium"}
            fontSize={"5xl"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            Terms of Service
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"normal"}
            fontSize={"xl"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            Welcome To DreamMate!
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"normal"}
            fontSize={"xl"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            These terms and conditions outline the rules and regulations for the
            use of DreamMate&#39;s Website, located at dreammate.io.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"normal"}
            fontSize={"xl"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            By accessing this website, we assume you accept these terms and
            conditions. Do not continue to use DreamMate if you do not agree to
            take all of the terms and conditions stated on this page.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"3xl"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            Cookies:
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            The website uses cookies to help personalize your online experience.
            By accessing DreamMate, you agreed to use the required cookies.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            The website uses cookies to help personalize your online experience.
            By accessing DreamMate, you agreed to use the required cookies.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            We may use cookies to collect, store, and track information for
            statistical or marketing purposes to operate our website. You have
            the ability to accept or decline optional Cookies. There are some
            required Cookies that are necessary for the operation of our
            website. These cookies do not require your consent as they always
            work. Please keep in mind that by accepting required Cookies, you
            also accept third-party Cookies, which might be used via third-party
            provided services if you use such services on our website, for
            example, a video display window provided by third parties and
            integrated into our website.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"3xl"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            License:
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            Unless otherwise stated, DreamMate and/or its licensors own the
            intellectual property rights for all material on DreamMate. All
            intellectual property rights are reserved. You may access this from
            DreamMate for your own personal use subjected to restrictions set in
            these terms and conditions.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"3xl"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            You must not:
          </Heading>
          <UnorderedList>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              Copy or republish material from DreamMate
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              Sell, rent, or sub-license material from DreamMate
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              Reproduce, duplicate or copy material from DreamMate
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              Redistribute content from DreamMate
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              This Agreement shall begin on the date hereof.
            </ListItem>
          </UnorderedList>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            Parts of this website offer users an opportunity to post and
            exchange opinions and information in certain areas of the website.
            DreamMate does not filter, edit, publish or review Comments before
            their presence on the website. Comments do not reflect the views and
            opinions of DreamMate, its agents, and/or affiliates. Comments
            reflect the views and opinions of the person who posts their views
            and opinions. To the extent permitted by applicable laws, DreamMate
            shall not be liable for the Comments or any liability, damages, or
            expenses caused and/or suffered as a result of any use of and/or
            posting of and/or appearance of the Comments on this website.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            DreamMate reserves the right to monitor all Comments and remove any
            Comments that can be considered inappropriate, offensive, or causes
            breach of these Terms and Conditions.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"3xl"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            You warrant and represent that:
          </Heading>
          <UnorderedList>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              You are entitled to post the Comments on our website and have all
              necessary licenses and consents to do so;
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              The Comments do not invade any intellectual property right,
              including without limitation copyright, patent, or trademark of
              any third party;
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              The Comments do not contain any defamatory, libelous, offensive,
              indecent, or otherwise unlawful material, which is an invasion of
              privacy.
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              The Comments will not be used to solicit or promote business or
              custom or present commercial activities or unlawful activity.
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              You hereby grant DreamMate a non-exclusive license to use,
              reproduce, edit and authorize others to use, reproduce and edit
              any of your Comments in any and all forms, formats, or media.
            </ListItem>
          </UnorderedList>
          <Heading
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"3xl"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            Hyperlinking to our Content:
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            The following organizations may link to our Website without prior
            written approval:
          </Heading>
          <UnorderedList>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              Government agencies;
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              Search engines;
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              News organizations;
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              Online directory distributors may link to our Website in the same
              manner as they hyperlink to the Websites of other listed
              businesses; and
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              System-wide Accredited Businesses except soliciting non-profit
              organizations, charity shopping malls, and charity fundraising
              groups which may not hyperlink to our Web site.
            </ListItem>
          </UnorderedList>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            These organizations may link to our home page, to publications, or
            to other Website information so long as the link: (a) is not in any
            way deceptive; (b) does not falsely imply sponsorship, endorsement,
            or approval of the linking party and its products and/or services;
            and (c) fits within the context of the linking party&#39;s site.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            We may consider and approve other link requests from the following
            types of organizations:
          </Heading>
          <UnorderedList>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              commonly-known consumer and/or business information sources;
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              dot.com community sites;
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              associations or other groups representing charities;
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              online directory distributors;
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              internet portals;
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              accounting, law, and consulting firms; and
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              educational institutions and trade associations.
            </ListItem>
          </UnorderedList>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            We will approve link requests from these organizations if we decide
            that: (a) the link would not make us look unfavorably to ourselves
            or to our accredited businesses; (b) the organization does not have
            any negative records with us; (c) the benefit to us from the
            visibility of the hyperlink compensates the absence of DreamMate;
            and (d) the link is in the context of general resource information.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            These organizations may link to our home page so long as the link:
            (a) is not in any way deceptive; (b) does not falsely imply
            sponsorship, endorsement, or approval of the linking party and its
            products or services; and (c) fits within the context of the linking
            party&#39;s site.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            If you are one of the organizations listed in paragraph 2 above and
            are interested in linking to our website, you must inform us by
            sending an e-mail to DreamMate. Please include your name, your
            organization name, contact information as well as the URL of your
            site, a list of any URLs from which you intend to link to our
            Website, and a list of the URLs on our site to which you would like
            to link. Wait 2-3 weeks for a response.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"3xl"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            Approved organizations may hyperlink to our Website as follows:
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            By use of our corporate name; or By use of the uniform resource
            locator being linked to; or Using any other description of our
            Website being linked to that makes sense within the context and
            format of content on the linking party&#39;s site. No use of
            DreamMate&#39;s logo or other artwork will be allowed for linking
            absent a trademark license agreement.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"3xl"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            Content Liability:
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            We shall not be held responsible for any content that appears on
            your Website. You agree to protect and defend us against all claims
            that are raised on your Website. No link(s) should appear on any
            Website that may be interpreted as libelous, obscene, or criminal,
            or which infringes, otherwise violates, or advocates the
            infringement or other violation of, any third party rights.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"3xl"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            Reservation of Rights:
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            We reserve the right to request that you remove all links or any
            particular link to our Website. You approve to immediately remove
            all links to our Website upon request. We also reserve the right to
            amend these terms and conditions and its linking policy at any time.
            By continuously linking to our Website, you agree to be bound to and
            follow these linking terms and conditions.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"3xl"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            Removal of links from our website:
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            If you find any link on our Website that is offensive for any
            reason, you are free to contact and inform us at any moment. We will
            consider requests to remove links, but we are not obligated to or so
            or to respond to you directly.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            We do not ensure that the information on this website is correct. We
            do not warrant its completeness or accuracy, nor do we promise to
            ensure that the website remains available or that the material on
            the website is kept up to date.
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"3xl"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            Disclaimer:
          </Heading>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties, and conditions relating to our website
            and the use of this website. Nothing in this disclaimer will:
          </Heading>
          <UnorderedList>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              limit or exclude our or your liability for death or personal
              injury;
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              limit or exclude our or your liability for fraud or fraudulent
              misrepresentation;
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              limit any of our or your liabilities in any way that is not
              permitted under applicable law;
            </ListItem>
            <ListItem
              textAlign={"left"}
              fontWeight={"light"}
              fontSize={"lg"}
              color={"#FFFFFF"}
              letterSpacing={"0.05em"}
            >
              or exclude any of our or your liabilities that may not be excluded
              under applicable law. The limitations and prohibitions of
              liability set in this Section and elsewhere in this disclaimer:
              (a) are subject to the preceding paragraph; and (b) govern all
              liabilities arising under the disclaimer, including liabilities
              arising in contract, in tort, and for breach of statutory duty.
            </ListItem>
          </UnorderedList>
          <Heading
            textAlign={"left"}
            fontWeight={"light"}
            fontSize={"lg"}
            color={"#FFFFFF"}
            letterSpacing={"0.05em"}
          >
            As long as the website and the information and services on the
            website are provided free of charge, we will not be liable for any
            loss or damage of any nature.
          </Heading>
        </Flex>
        <LayoutFooter />
      </Box>
    </Box>
  );
};

export default TOS;

TOS.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
