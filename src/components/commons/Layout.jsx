import React from "react";
import { ModalContextProvider } from "../../contexts/modalContenx";
import { Hearder } from "./Hearder";
import { Menu } from "./Menu";

export const Layout = (props) => {
  return (
    <ModalContextProvider>
      <div>
        <Hearder />
        <div className="container">
          <div className="columns">
            <div className="column is-one-quarter">
              <Menu />
            </div>
            <div className="column">{props.children}</div>
          </div>
        </div>
      </div>
    </ModalContextProvider>
  );
};

