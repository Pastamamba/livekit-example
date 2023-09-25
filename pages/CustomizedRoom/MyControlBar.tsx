import React from "react";
import "@livekit/components-styles";
import { ControlBar } from "@livekit/components-react";
import styles from "../../styles/MyButton.module.scss";

type MyControlBarProps = {
  toggleDivState: boolean;
  setToggleDivState: React.Dispatch<React.SetStateAction<boolean>>;
};

const MyControlBar: React.FC<MyControlBarProps> = ({
                                                       toggleDivState,
                                                       setToggleDivState,
                                                   }) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "1em",
            }}
        >
            <button className={styles.myButton}
                    onClick={() => {
                        setToggleDivState(!toggleDivState);
                    }}
            >
                Toggle
            </button>
            <ControlBar style={{ flex: 0 }} />
        </div>
    );
};

export default MyControlBar;
