

import { useState, CSSProperties } from "react";
import { DotLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#ffffff",
};

export function LoadingText() {
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      <DotLoader
        color={"#14b8a6"}
        cssOverride={override}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
  