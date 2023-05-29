import React from "react";
import { CircleLoading } from "../../assets";
import "./loader.scss";

// ----------------------------------------------------------------------

export default function Loader() {
  return (
    <div className="loaderDefaultButton">
      <CircleLoading />
    </div>
  );
}
