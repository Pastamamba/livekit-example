import { LocalUserChoices, PreJoin } from "@livekit/components-react";
import type { NextPage } from "next";
import { useState } from "react";
import CustomizeExample from "./customize";
import "@livekit/components-styles";
import ActiveRooms from "./CustomizedRoom/ActiveRooms";
import styles from "./styles.module.css";

const IndexPage: NextPage = () => {
  const [connected, setConnected] = useState(false);
  const [preJoinChoices, setPreJoinChoices] = useState<
    LocalUserChoices | undefined
  >(undefined);
  const [token, setToken] = useState(null);
  const [roomNameInput, setRoomNameInput] = useState(""); // Lisätty roomNameInput-tila

  const generateToken = async (userName: string, roomName: string) => {
    try {
      const response = await fetch("http://localhost:5000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName: roomName,
          participantName: userName,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.text();
    } catch (error) {
      console.error("Error fetching token:", error);
      return null; // Return null if there's an error
    }
  };

  const handleOnSubmit = async (values: LocalUserChoices) => {
    const userName = values.username;
    const generatedToken = await generateToken(userName, roomNameInput); // Käytetään roomNameInputia täällä
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
          <CustomizeExample
            token={token}
            userChoices={preJoinChoices}
            connected={connected}
            setConnected={setConnected}
          />
        ) : (
          <div data-lk-theme="default">
            <ActiveRooms />
            <h2 className={styles["room-name-title"]}>Room Name</h2>
            <input
              className={styles["room-name-input"]}
              id="roomName"
              name="roomName"
              type="text"
              value={roomNameInput}
              placeholder="Room Name"
              onChange={(e) => setRoomNameInput(e.target.value)}
            />
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
