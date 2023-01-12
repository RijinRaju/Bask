import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"


function Conference() {
  const { roomID } = useParams();
  const myMeeting = async (element) => {
    const appID = 1815423577;
    const serverSecret = "2ebedd03954fcabcf9860308cf08cbf8";
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