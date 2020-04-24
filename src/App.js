import React, { useEffect } from 'react';

import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { AccountProvider } from './context/AccountContext'
import { CurrentOrderProvider } from  './context/CurrentOrderContext'
import useAccount from './hooks/useAccount'
import useCurrentOrder from './hooks/useCurrentOrder'
import { getToken } from './hooks/useCookies'
import useScreenSize from './hooks/useScreenSize'

import Header from './components/Header';
import OrderPage from './pages/OrderPage'
import AdminPortalPage from './pages/AdminPortalPage'

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

  const currentOrderContext = useCurrentOrder()

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
        <CurrentOrderProvider
          value={currentOrderContext}
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

                  {account && account.admin &&
                    <>
                      <Route
                        exact
                        path={"/admin-portal"}
                        render={() =>
                          <AdminPortalPage />
                        }
                      />

                      <Route
                        exact
                        path={"/admin-portal/:page"}
                        render={() =>
                          <AdminPortalPage />
                        }
                      />

                      <Route
                        exact
                        path={"/admin-portal/:page/:tab"}
                        render={() =>
                          <AdminPortalPage />
                        }
                      />
                    </>
                  }
              </Switch>
            </div>
          </Router>
        </CurrentOrderProvider>
      </AccountProvider>
    </>
  );
};
