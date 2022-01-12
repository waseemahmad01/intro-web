import React, { useMemo, useEffect } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, close }) => {
  const newWindow = useMemo(() =>
    window.open(
      "about:blank",
      "newWin",
      `width=400,height=300,left=${window.screen.availWidth / 2 - 200},top=${
        window.screen.availHeight / 2 - 150
      }`
    )
  );
  newWindow.onbeforeunload = () => {
    close();
  };
  useEffect(() => () => close());
  return createPortal(children, newWindow.document.body);
};

export default Portal;
