import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './pathToPage.scss';

interface PathToPage {
  props: [string, string][];
}

export default function PathToPage({ props }: PathToPage) {
  const { pathname } = useLocation();

  return (
    <div className="pathToPageComponent">
      {props.map((item, i) => (
        <span key={i}>
          {pathname !== item[1] ? (
            <Link to={item[1]}>
              <span className="page">{item[0]}</span>
            </Link>
          ) : (
            <span className="thisPage">{item[0]}</span>
          )}
          <span className="line">{`/`}</span>
        </span>
      ))}
    </div>
  );
}
