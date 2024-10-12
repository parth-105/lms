"use client"
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { useEffect } from "react";
import { useState } from "react";
import { MeetingAppProvider } from "@/helpers/context/MeetingAppContextDef";
import { MeetingContainer } from "@/component/live/meeting/MeetingContainer";
import { LeaveScreen } from "@/component/live/screens/LeaveScreen";
import { JoiningScreen } from "@/component/live/screens/JoiningScreen"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Liveapp() {
  const [token, setToken] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);
  const [customAudioStream, setCustomAudioStream] = useState(null);
  const [customVideoStream, setCustomVideoStream] = useState(null)
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  



useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia("only screen and (max-width: 768px)");
      setIsMobile(mediaQuery.matches);

      if (mediaQuery.matches) {
        window.onbeforeunload = () => "Are you sure you want to exit?";
      }
    }
  }, []);

  return (
    <>
        <ToastContainer
      toastClassName={() =>
        "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
      }
      bodyClassName={() => "text-black text-base font-normal"}
      position="bottom-left"
      autoClose={4000}
      hideProgressBar={true}
      newestOnTop={false}
      closeButton={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
      <MeetingAppProvider>
        {isMeetingStarted ? (

          <MeetingProvider
            config={{
              meetingId,
              micEnabled: micOn,
              webcamEnabled: webcamOn,
              name: participantName ? participantName : "TestUser",
              multiStream: true,
              customCameraVideoTrack: customVideoStream,
              customMicrophoneAudioTrack: customAudioStream
            }}
            token={token}
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
          >
            <MeetingContainer
              onMeetingLeave={() => {
                setToken("");
                setMeetingId("");
                setParticipantName("");
                setWebcamOn(false);
                setMicOn(false);
                setMeetingStarted(false);
              }}
              setIsMeetingLeft={setIsMeetingLeft}
            />
          </MeetingProvider>

        ) : isMeetingLeft ? (
          <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
        ) :  (
         
          <JoiningScreen
            participantName={participantName}
            setParticipantName={setParticipantName}
            setMeetingId={setMeetingId}
            setToken={setToken}
            micOn={micOn}
            setMicOn={setMicOn}
            webcamOn={webcamOn}
            setWebcamOn={setWebcamOn}
            customAudioStream={customAudioStream}
            setCustomAudioStream={setCustomAudioStream}
            customVideoStream={customVideoStream}
            setCustomVideoStream={setCustomVideoStream}
            onClickStartMeeting={() => {
              setMeetingStarted(true);
            }}
            startMeeting={isMeetingStarted}
            setIsMeetingLeft={setIsMeetingLeft}
          />
        )}
      </MeetingAppProvider>
    </>
  );
}

export default Liveapp;
