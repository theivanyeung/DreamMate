import { useEffect } from "react";
import ProfileHeaderDesktop from "./Header/Desktop";
import ProfileHeaderMobile from "./Header/Mobile";
import ProfileHeaderTablet from "./Header/Tablet";

const ProfileHeader = (props) => {
  return (
    <>
      <ProfileHeaderDesktop
        router={props.router}
        user={props.user}
        creatorId={props.creatorId}
        creatorData={props.creatorData}
        socialOptions={props.socialOptions}
        socialList={props.socialList}
        members={props.members}
        display={{
          "2xl": "block",
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <ProfileHeaderTablet
        router={props.router}
        user={props.user}
        creatorId={props.creatorId}
        creatorData={props.creatorData}
        socialOptions={props.socialOptions}
        socialList={props.socialList}
        members={props.members}
        display={{
          "2xl": "none",
          xxl: "block",
          xl: "block",
          lg: "block",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <ProfileHeaderMobile
        router={props.router}
        user={props.user}
        creatorId={props.creatorId}
        creatorData={props.creatorData}
        socialOptions={props.socialOptions}
        socialList={props.socialList}
        members={props.members}
        display={{
          "2xl": "none",
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "block",
          sm: "block",
          base: "block",
        }}
      />
    </>
  );
};

export default ProfileHeader;
