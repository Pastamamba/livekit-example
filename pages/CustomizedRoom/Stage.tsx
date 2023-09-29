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
    ? { display: "flex" }
    : { height: "87vh", background: "#1e1e1e" };
  const tileStyle = toggleDivState ? { width: "150px" } : { padding: ".8em" };

  return (
    <div className={styles.participantGrid}>
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
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                      margin: ".2em",
                    }}
                  >
                    <Image
                      src="/no-picture.png"
                      alt="Image description"
                      width={150}
                      height={150}
                    />
                  </div>
                )}
                <div className={myStyles["participant-indicators"]}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.25rem",
                    backgroundColor: "#00000080",
                    borderRadius: ".25rem"
                  }}>
                    {/* Display mute indicators for microphone and the current track */}
                    <TrackMutedIndicator source={Track.Source.Microphone} />
                    <TrackMutedIndicator source={track.source} />
                    <ParticipantName className={myStyles["participant-name"]} />
                  </div>
                  {/* Display the participant's name */}
                </div>
              </div>
            )
          }
        </TrackContext.Consumer>
      </GridLayout>
    </div>
  );
};

export default Stage;
