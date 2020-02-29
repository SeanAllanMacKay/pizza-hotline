import React from 'react';

import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import useScreenSize from './hooks/useScreenSize'

import Header from './components/Header';

let history = createBrowserHistory();

export default () => {
  const [screenSize] = useScreenSize();

  return (
    <Router history={history}>
        <Switch>
          <Header
            history={history}
          />
          <div
            style={{
              padding: '30px'
            }}
          >
            <Route
              exact
              path={"/"}
              render={() =>
                <></>
              }
            />

            <Route
              exact
              path={"/order-online"}
              render={() =>
                <></>
              }
            />

            <Route
              exact
              path={"/menu/:location"}
              render={() =>
                <></>
              }
            />

            <Route
              exact
              path={"/gift-cards"}
              render={() =>
                <></>
              }
            />
          </div>
        </Switch>
    </Router>
  );
};
