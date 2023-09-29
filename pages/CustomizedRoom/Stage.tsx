import React from "react";
import {
  useTracks,
  TrackContext,
  VideoTrack,
  TrackMutedIndicator,
  ParticipantName,
  GridLayout,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import styles from "../../styles/Simple.module.css";
import myStyles from "../../styles/Customize.module.css";
import { isTrackReference } from "@livekit/components-core";
import Image from "next/image";
import NewHtmlElement from "./NewHtmlElement";

type StageProps = {
  toggleDivState: boolean;
};

/**
 * The Stage component displays a grid layout of video tracks.
 * It also provides a toggle functionality to adjust the display style.
 */
const Stage: React.FC<StageProps> = ({ toggleDivState }) => {
  // Fetch the camera and screen share tracks
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ]);

  // Adjust styles based on the toggle state
  const gridLayoutStyle = toggleDivState
      ? { height: "20vh", background: "#111111", display: "flex"} // Set height to 80vh when toggleDivState is true
      : { background: "#111111" }; // Set height to 100vh when toggleDivState is false
  const tileStyle = toggleDivState
      ? { width: "150px" }
      : {
    padding: ".8em",
        background: "#1e1e1e",
        borderRadius: ".5em",
        margin: ".4em",
      };

  return (
    <div className={styles.participantGrid} style={{
      height: "92vh"
    }}>
      {toggleDivState && <NewHtmlElement />}
      <GridLayout style={gridLayoutStyle} tracks={tracks}>
        <TrackContext.Consumer>
          {(track) =>
            track && (
              <div style={tileStyle}>
                {/* Check if the track is a reference and display accordingly */}
                {isTrackReference(track) &&
                !track?.publication?.track?.isMuted ? (
                  <VideoTrack {...track} />
                ) : (
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                      margin: ".2em",
                    }}
                  >
                    {!toggleDivState
                        ? <Image
                            src="/participant-placeholder.svg"
                            alt="Image description"
                            layout={"fill"}
                            objectFit={"contain"}
                        />
                        : <Image
                            src="/participant-placeholder.svg"
                            alt="Image description"
                            width={120}
                            height={120}
                        />

                    }

                    <div className={myStyles["participant-indicators"]}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.25rem",
                        backgroundColor: "#00000080",
                        borderRadius: ".25rem"
                      }}>
                        {/* Display mute indicators for microphone and the current track */}
                        <TrackMutedIndicator source={Track.Source.Microphone} show="muted" />
                        <TrackMutedIndicator show="unmuted" source={track.source} />
                        <ParticipantName className={myStyles["participant-name"]} />
                      </div>
                      {/* Display the participant's name */}
                    </div>
                  </div>
                )}

              </div>
            )
          }
        </TrackContext.Consumer>
      </GridLayout>
    </div>
  );
};

export default Stage;
