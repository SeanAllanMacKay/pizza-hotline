import React, { useEffect } from 'react';

import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { AccountProvider } from './context/AccountContext'
import useAccount from './hooks/useAccount'
import { getToken } from './hooks/useCookies'
import useScreenSize from './hooks/useScreenSize'

import Header from './components/Header';
import OrderPage from './pages/OrderPage'

let history = createBrowserHistory();

export default () => {
  const [screenSize] = useScreenSize();

  const token = getToken()
  const accountContext = useAccount()
  const {
    account,
    setAccount,
    refreshAccount
  } = accountContext

  useEffect(() => {
    (async () => {
      if(token && !account) {
        await refreshAccount()
      } else if (!token){
        setAccount(null)
      }
    })()
  }, [account, setAccount, refreshAccount, token])

  return (
    <>
      <AccountProvider
        value={accountContext}
      >
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
                    <OrderPage />
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
      </AccountProvider>
    </>
  );
};
