import {
  faSquare,
  faThLarge,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Room, RoomEvent, setLogLevel, VideoPresets } from "livekit-client";
import {
  ControlsProps,
  ControlsView,
  DisplayContext,
  DisplayOptions,
  LiveKitRoom,
  ParticipantProps,
  ParticipantView,
} from "@livekit/react-components";
import { CSSProperties, useState } from "react";
import "react-aspect-ratio/aspect-ratio.css";
import { useNavigate, useLocation } from "react-router-dom";
import "@livekit/components-styles";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

// new feature
const StyledComponent = styled.div`
  width: 100%;
  background-color: yellow;
  justify-content: center;
  align-items: center;
  backgroundcolor: yellow;
  height: 70%;
  justifycontent: center;
  alignitems: center;
  color: black;
`;

// new feature
// This component provides global styling using styled-components. This is used for providing dynamic styles across the entire application
interface GlobalStylesProps {
  isOpen: boolean;
}

const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
  // CSS properties for the root element
  :root {
    --height-1: ${(props) => (props.isOpen ? "auto" : "100%")};
    --height-2: ${(props) => (props.isOpen ? "100px" : "100%")};
    --height-3: ${(props) => (props.isOpen ? "150px" : "100%")};
    --flex-1: ${(props) => (props.isOpen ? "flex" : "grid")};
    --columns: ${(props) =>
      props.isOpen ? "100px 100%" : "auto min-content min-content"};
  }

  // CSS classes with various styling
  ._3rLR0 {
    display: var(--flex-1);
    overflow: auto;
  }

  ._14898 {
    height: var(--height-1);
  }

  ._2HbZ0 {
    height: var(--height-3);
    overflow: auto;
  }

  ._2sm4e {
    height: var(--height-2);
  }

  ._2zM8F {
    grid-template-columns: auto;
    overflow-x: auto;
  }

  .react-aspect-ratio-placeholder {
    --aspect-ratio: (1) !important;
  }

  // media query for responsive design
  @media (max-width: 800px) {
    ._2zM8F {
        grid-template-columns: ${(props) =>
          props.isOpen ? "110px max-content" : "auto"};
    }
  }
`;

// new feature
// A styled button component with specific padding, color, border and transition properties
export const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #0099ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007acc;
  }
`;

export const RoomPage = () => {
  const [numParticipants, setNumParticipants] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>({
    stageLayout: "grid",
    showStats: false,
  });
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const url = query.get("url");
  const token = query.get("token");
  const recorder = query.get("recorder");

  if (!url || !token) {
    return <div>url and token are required</div>;
  }

  const onLeave = () => {
    navigate("/");
  };

  const updateParticipantSize = (room: Room) => {
    setNumParticipants(room.participants.size + 1);
  };

  const onParticipantDisconnected = (room: Room) => {
    updateParticipantSize(room);

    /* Special rule for recorder */
    if (
      recorder &&
      parseInt(recorder, 10) === 1 &&
      room.participants.size === 0
    ) {
      console.log("END_RECORDING");
    }
  };

  const updateOptions = (options: DisplayOptions) => {
    setDisplayOptions({
      ...displayOptions,
      ...options,
    });
  };

  // new feature
  // A renderer for control options for participants
  const ControlsRenderer = (props: ControlsProps) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "90vw",
        }}
      >
        <StyledButton onClick={() => setIsOpen(!isOpen)}>Toggle</StyledButton>
        <ControlsView {...props} />
      </div>
    );
  };

  // new feature
  // A renderer for the participant's view
  interface ParticipantRendererProps extends ParticipantProps {
    style?: CSSProperties;
  }

  const ParticipantRenderer = (props: ParticipantRendererProps) => {
    return isOpen ? (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "nowrap",
        }}
      >
        <ParticipantView
          {...props}
          width="100px"
          height="100px"
          orientation="landscape"
        />
      </div>
    ) : (
      <ParticipantView {...props} />
    );
  };

  return (
    <>
      <GlobalStyles isOpen={isOpen} />
      <DisplayContext.Provider value={displayOptions}>
        <div className="roomContainer">
          <div className="topBar">
            <h2>LiveKit Video</h2>
            <div className="right">
              <div>
                <input
                  id="showStats"
                  type="checkbox"
                  onChange={(e) =>
                    updateOptions({ showStats: e.target.checked })
                  }
                />
                <label htmlFor="showStats">Show Stats</label>
              </div>
              <div>
                <button
                  className="iconButton"
                  disabled={displayOptions.stageLayout === "grid"}
                  onClick={() => {
                    updateOptions({ stageLayout: "grid" });
                  }}
                >
                  <FontAwesomeIcon height={32} icon={faThLarge} />
                </button>
                <button
                  className="iconButton"
                  disabled={displayOptions.stageLayout === "speaker"}
                  onClick={() => {
                    updateOptions({ stageLayout: "speaker" });
                  }}
                >
                  <FontAwesomeIcon height={32} icon={faSquare} />
                </button>
              </div>
              <div className="participantCount">
                <FontAwesomeIcon icon={faUserFriends} />
                <span>{numParticipants}</span>
              </div>
            </div>
          </div>

          {isOpen ? (
            <StyledComponent>
              <h1>Hello</h1>
            </StyledComponent>
          ) : null}

          <LiveKitRoom
            data-lk-theme="default"
            participantRenderer={ParticipantRenderer}
            controlRenderer={ControlsRenderer}
            url={url}
            token={token}
            onConnected={(room) => {
              setLogLevel("debug");
              onConnected(room, query);
              room.on(RoomEvent.ParticipantConnected, () =>
                updateParticipantSize(room)
              );
              room.on(RoomEvent.ParticipantDisconnected, () =>
                onParticipantDisconnected(room)
              );
              updateParticipantSize(room);
            }}
            roomOptions={{
              adaptiveStream: isSet(query, "adaptiveStream"),
              dynacast: isSet(query, "dynacast"),
              publishDefaults: {
                simulcast: isSet(query, "simulcast"),
              },
              videoCaptureDefaults: {
                resolution: VideoPresets.h720.resolution,
              },
            }}
            onLeave={onLeave}
          />
        </div>
      </DisplayContext.Provider>
    </>
  );
};

async function onConnected(room: Room, query: URLSearchParams) {
  // make it easier to debug
  (window as any).currentRoom = room;

  if (isSet(query, "audioEnabled")) {
    const audioDeviceId = query.get("audioDeviceId");
    if (audioDeviceId && room.options.audioCaptureDefaults) {
      room.options.audioCaptureDefaults.deviceId = audioDeviceId;
    }
    await room.localParticipant.setMicrophoneEnabled(true);
  }

  if (isSet(query, "videoEnabled")) {
    const videoDeviceId = query.get("videoDeviceId");
    if (videoDeviceId && room.options.videoCaptureDefaults) {
      room.options.videoCaptureDefaults.deviceId = videoDeviceId;
    }
    await room.localParticipant.setCameraEnabled(true);
  }
}

function isSet(query: URLSearchParams, key: string): boolean {
  return query.get(key) === "1" || query.get(key) === "true";
}
