import React from "react";
import { ControlBar } from "@livekit/components-react";

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
        display: "inline-flex",
        alignItems: "center",
        paddingTop: "1em",
      }}
    >
      <button
        className="your-button-class"
        onClick={() => {
          setToggleDivState(!toggleDivState);
        }}
      >
        Toggle
      </button>
      <ControlBar style={{ flex: 1 }} />
    </div>
  );
};

export default MyControlBar;
