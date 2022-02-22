//Thanks to Vitor Paladini
//https://paladini.dev/posts/how-to-make-an-extremely-reusable-tooltip-component-with-react--and-nothing-else/
//https://codesandbox.io/s/how-to-make-an-extremely-reusable-tooltip-component-with-react-and-nothing-else-7opo3?from-embed=&file=/src/Tooltip.js
import React, { useState } from "react";

const Tooltip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 700);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      id="tooltip"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      onTouchStart={showTip}
      onTouchEnd={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div className="wrapper">
          <div className={`${props.direction || "top"} ` + " tooltip-label"}>
            {/* Content */}
            {props.content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
