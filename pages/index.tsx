import { LocalUserChoices, PreJoin } from "@livekit/components-react";
import type { NextPage } from "next";
import { useState } from "react";
import "@livekit/components-styles";
import styles from "../styles/styles.module.css";
import { generateUserToken } from "./api/generateUserToken";
import LiveKitRoomWrapper from "./LiveKitRoomWrapper";

const IndexPage: NextPage = () => {
  const [connected, setConnected] = useState(false);
  const [preJoinChoices, setPreJoinChoices] = useState<
    LocalUserChoices | undefined
  >(undefined);
  const [token, setToken] = useState(null);
  const [roomNameInput, setRoomNameInput] = useState("");

  const handleOnSubmit = async (values: LocalUserChoices) => {
    const userName = values.username;
    const generatedToken = await generateUserToken(userName, roomNameInput);
    if (generatedToken) {
      setToken(generatedToken);
      setPreJoinChoices(values);
      setConnected(true);
    }
  };

  return (
    <>
      <div data-lk-theme="default">
        {preJoinChoices && connected ? (
          <LiveKitRoomWrapper
            token={token}
            userChoices={preJoinChoices}
            connected={connected}
            setConnected={setConnected}
          />
        ) : (
          <div data-lk-theme="default">
            <div className={styles.centerContainer}>
              <h2 className={styles["room-name-title"]}>
                Room name to connect
              </h2>
              <input
                className={styles["room-name-input"]}
                id="roomName"
                name="roomName"
                type="text"
                value={roomNameInput}
                placeholder="Room Name"
                onChange={(e) => setRoomNameInput(e.target.value)}
              />
            </div>
            <PreJoin
              data-lk-theme="default"
              onError={(err) =>
                console.log("error while setting up prejoin", err)
              }
              defaults={{
                username: "",
                videoEnabled: true,
                audioEnabled: false,
              }}
              onSubmit={handleOnSubmit}
            ></PreJoin>
          </div>
        )}
      </div>
    </>
  );
};

export default IndexPage;
