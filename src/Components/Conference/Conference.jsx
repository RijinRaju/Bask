import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"


function Conference() {
  const { roomID } = useParams();
  const myMeeting = async (element) => {
    const appID = 322928257;
    const serverSecret = "2027d25b87828ba317e8d808fa44454e";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
"username"    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };
  return (
    // <div className="flex">
    //       <TemporaryDrawer/>
    <div className="room-page">
      <div ref={myMeeting} />
    </div>
    // </div>
  );
}

export default Conference;