/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";
import { LogoutPage } from "../pages/users/logout";
import { PageNotFound } from "../pages/404";
import { Home } from "../pages/home";
import { Episodes } from "../pages/episodes";
import { useMe } from "../hooks/useMe";
import { Category } from "../pages/podcast-bycategory";
import { EditProfile } from "../pages/users/edit-profile";
import { CreatePodcast } from "../pages/hosts/create-podcast";
import { CreateEpisode } from "../pages/hosts/create-episode";
import { MyPodcasts } from "../pages/hosts/my-podcast";

const HostRoutes = [
  <Route key={1} path="/create-podcast" exact>
    <CreatePodcast />
  </Route>,
  <Route key={2} path="/create-episode" exact>
    <CreateEpisode />
  </Route>,
  <Route key={2} path="/my-podcasts" exact>
    <MyPodcasts />
  </Route>,
];

const ListenerRoutes = [
  <Route key={1} path="/" exact>
    <Home />
  </Route>,
  <Route key={2} path="/podcast/:id">
    <Episodes />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    console.log("return");
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  console.log("LoggedInRouter", data.me.role);
  return (
    <Router>
      <Header />
      <div className="bg-black w-full ">
        <div className="sm:mx-1 md:mx-10 lg:mx-20 xl:mx-36">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            {data.me.role === "Host" && HostRoutes}
            {data.me.role === "Listener" && ListenerRoutes}
            <Route path="/edit-profile" exact>
              <EditProfile />
            </Route>
            <Route path="/logout" exact>
              <LogoutPage />
            </Route>
            <Route path="/category/:category">
              <Category />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};
