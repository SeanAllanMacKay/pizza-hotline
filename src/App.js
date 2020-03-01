import React from 'react';

import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import useScreenSize from './hooks/useScreenSize'

import Header from './components/Header';

let history = createBrowserHistory();

export default () => {
  const [screenSize] = useScreenSize();
  return (
    <>
      <Router history={history}>
        <Header />
        <div
          style={{
            padding: '30px',
            height: 'calc(100vh)'
          }}
        >
          <Switch>
              <Route
                exact
                path={"/"}
                render={() =>
                  <h2>Coming Soon!</h2>
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
                  <h2>Coming Soon!</h2>
                }
              />

              <Route
                exact
                path={"/gift-cards"}
                render={() =>
                  <h2>Coming Soon!</h2>
                }
              />

              <Route
                exact
                path={"/contact"}
                render={() =>
                  <h2>Coming Soon!</h2>
                }
              />
          </Switch>
        </div>
      </Router>
    </>
  );
};
