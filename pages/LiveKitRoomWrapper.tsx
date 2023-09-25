// CustomizeExample component provides a customized video room experience.

import React, { useMemo, useState } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
  LocalUserChoices,
} from "@livekit/components-react";
import { Room, RoomOptions, VideoPresets } from "livekit-client";
import styles from "../styles/Simple.module.css";
import { useRouter } from "next/router";
import NewHtmlElement from "./CustomizedRoom/NewHtmlElement";
import Stage from "./CustomizedRoom/Stage";
import MyControlBar from "./CustomizedRoom/MyControlBar";

type LiveKitRoomWrapperProps = {
  token: string;
  userChoices: LocalUserChoices;
  connected: boolean;
  setConnected: any;
};

/**
 * CustomizeExample component provides a customized video room experience.
 * It includes a toggleable custom HTML element, a custom control bar, and a stage for video tracks.
 */
const LiveKitRoomWrapper: React.FC<LiveKitRoomWrapperProps> = ({
  token,
  userChoices,
  connected,
  setConnected,
}) => {
  // URL for the LiveKit server
  const liveKitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  // Access router to get query parameters
  const router = useRouter();
  const { hq } = router.query;

  // Define room options based on user choices and query parameters
  const roomOptions = useMemo(
    (): RoomOptions => ({
      videoCaptureDefaults: {
        deviceId: userChoices.videoDeviceId ?? undefined,
        resolution: hq === "true" ? VideoPresets.h2160 : VideoPresets.h720,
      },
      publishDefaults: {
        videoSimulcastLayers:
          hq === "true"
            ? [VideoPresets.h1080, VideoPresets.h720]
            : [VideoPresets.h540, VideoPresets.h216],
      },
      audioCaptureDefaults: {
        deviceId: userChoices.audioDeviceId ?? undefined,
      },
      adaptiveStream: { pixelDensity: "screen" },
      dynacast: true,
    }),
    [hq, userChoices.videoDeviceId, userChoices.audioDeviceId]
  );

  // State for room and connection status
  const [room] = useState(new Room());
  const [isConnected, setIsConnected] = useState(false);
  const [toggleDivState, setToggleDivState] = useState(false);

  // Handle disconnection from the room
  const handleDisconnect = () => {
    setConnected(false);
  };

  return (
    <div className={styles.container} data-lk-theme="default">
      {connected && (
        <LiveKitRoom
          room={room}
          token={token}
          serverUrl={liveKitUrl}
          options={roomOptions}
          connect={connected}
          onConnected={() => setIsConnected(true)}
          onDisconnected={handleDisconnect}
          style={{
            backgroundColor: "#8ca9a9",
            borderRadius: "1em",
              minHeight: "100vh",
            padding: "1em",
          }}
          video={userChoices.videoEnabled}
          audio={userChoices.audioEnabled}
        >
          {isConnected && toggleDivState && <NewHtmlElement />}
          <RoomAudioRenderer />
          {isConnected ? <Stage toggleDivState={toggleDivState} /> : <div style={{height: "90vh"}}/>}
          {isConnected ? (
            <MyControlBar
              toggleDivState={toggleDivState}
              setToggleDivState={setToggleDivState}
            />
          ) : (
            <ControlBar />
          )}
        </LiveKitRoom>
      )}
    </div>
  );
};

export default LiveKitRoomWrapper;
