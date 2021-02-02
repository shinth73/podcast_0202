import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";
import { WelcomePage } from "../pages/welcome";
import { LogoutPage } from "../pages/logout";
import { PageNotFound } from "../pages/404";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/logout" exact>
          <LogoutPage />
        </Route>
        <Route path="/" exact>
          <WelcomePage />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
};
