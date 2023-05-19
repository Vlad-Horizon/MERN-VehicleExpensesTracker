import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import './defaultButton.scss';

interface compotentProps {
  text: string;
  to?: string;
  border?: boolean;
  bg?: boolean;
  events?: componentEvents;
  style?: object;
  red?: boolean;
}

interface componentEvents {
  onClick?: any;
}

export default function DefaultButton({ text, to, border, bg, red, events, style }: compotentProps) {
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const refButton = useRef<HTMLDivElement>(null);
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

    return (
      <div
        ref={refButton}
        className={`defaultButton ${border ? 'defaultButton_border' : ''}  ${bg ? 'defaultButton_bg' : ''} ${
          red ? 'defaultButton_bg_red' : ''
        }`}
        style={style}
        onMouseDown={(e) => {
          setShouldRender(true);
          handleClick(e);
        }}
        {...events}
      >
        {text}
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
              top: refButton.current?.clientWidth && `${-refButton.current.clientWidth + circlePosition.current.y}px`,
              left: refButton.current?.clientWidth && `${-refButton.current.clientWidth + circlePosition.current.x}px`,
              width: `${refButton.current?.clientWidth && refButton.current.clientWidth * 2}px`,
              height: `${refButton.current?.clientWidth && refButton.current.clientWidth * 2}px`,
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
