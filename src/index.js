import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import SignIn from "./SignIn/SignIn";

function Fiscal24() {
  return (
    <div>
      <SignIn />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Fiscal24 />, rootElement);
