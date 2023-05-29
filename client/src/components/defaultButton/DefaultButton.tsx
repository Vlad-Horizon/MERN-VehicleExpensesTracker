import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import "./defaultButton.scss";
import Loader from "./loader";

interface compotentProps {
  text: string;
  to?: string;
  border?: boolean;
  bg?: boolean;
  events?: componentEvents;
  style?: object;
  red?: boolean;
  isLoad?: boolean;
}

interface componentEvents {
  onClick?: any;
}

export default function DefaultButton({
  text,
  to,
  border,
  bg,
  red,
  events,
  style,
  isLoad,
}: compotentProps) {
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const refButton = useRef<any>(null);
  const circlePosition = useRef({ x: 0, y: 0 });

  const mainButtonElement = () => {
    if (border && bg) return <>Buton ERROR props</>;

    const handleClick = (e: any) => {
      const button = e.target as HTMLButtonElement;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      circlePosition.current.x = x;
      circlePosition.current.y = y;
    };

    const keyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        refButton.current.click();
      }
    };

    return (
      <div
        ref={refButton}
        tabIndex={0}
        className={`defaultButton ${isLoad ? "defaultButton_load" : ""} ${
          border ? "defaultButton_border" : ""
        }  ${bg ? "defaultButton_bg" : ""} ${
          red ? "defaultButton_bg_red" : ""
        }`}
        style={style}
        onKeyDown={keyPress}
        onMouseDown={(e) => {
          setShouldRender(true);
          handleClick(e);
        }}
        {...events}
      >
        {isLoad ? <Loader /> : text}
        <CSSTransition
          in={shouldRender}
          timeout={550}
          classNames="buttonAnimation"
          onExited={() => setShouldRender(false)}
          onEnter={() => setShouldRender(false)}
          unmountOnExit
        >
          <span
            className="buttonAnimation"
            style={{
              top:
                refButton.current?.clientWidth &&
                `${
                  -refButton.current.clientWidth + circlePosition.current.y
                }px`,
              left:
                refButton.current?.clientWidth &&
                `${
                  -refButton.current.clientWidth + circlePosition.current.x
                }px`,
              width: `${
                refButton.current?.clientWidth &&
                refButton.current.clientWidth * 2
              }px`,
              height: `${
                refButton.current?.clientWidth &&
                refButton.current.clientWidth * 2
              }px`,
            }}
          ></span>
        </CSSTransition>
      </div>
    );
  };

  if (to) {
    return <Link to={to}>{mainButtonElement()}</Link>;
  }

  return <>{mainButtonElement()}</>;
}
