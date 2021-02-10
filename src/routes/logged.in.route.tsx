/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";
import { LogoutPage } from "../pages/users/logout";
import { PageNotFound } from "../pages/404";
import { Home } from "../pages/home";
import { Episodes } from "../pages/episodes";
import { useMe } from "../hooks/useMe";
import { EditProfile } from "../pages/users/edit-profile";
import { CreatePodcast } from "../pages/hosts/create-podcast";
import { CreateEpisode } from "../pages/hosts/create-episode";
// import { EditEpisode } from "../pages/hosts/edit-episode";
import { MyPodcasts } from "../pages/hosts/my-podcast";
import { Category } from "../pages/podcast-bycategory";
import { EditPodcast } from "../pages/hosts/edit-podcast";
import { DeletePodcast } from "../pages/hosts/delete-podcast";

const hostRoutes = [
  {
    path: "/create-podcast",
    component: <CreatePodcast />,
  },
  {
    path: "/create-podcast",
    component: <CreatePodcast />,
  },
  {
    path: "/create-episode",
    component: <CreateEpisode />,
  },
  {
    path: "/my-podcasts",
    component: <MyPodcasts />,
  },
  {
    path: "/edit-podcast/:id",
    component: <EditPodcast />,
  },
];

const commonRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/edit-profile",
    component: <EditProfile />,
  },
  {
    path: "/logout",
    component: <LogoutPage />,
  },
  {
    path: "/podcast/:id",
    component: <Episodes />,
  },
  {
    path: "/category/:category",
    component: <Category />,
  },
  {
    path: "/delete-podcast/:id",
    component: <DeletePodcast />,
  },
];

const listenerRoutes = [
  {
    path: "/",
    component: <Home />,
  },
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
      <div className="bg-black w-full h-full pt-14">
        <div className="sm:mx-1 md:mx-10 lg:mx-20 xl:mx-36">
          <Switch>
            {data.me.role === "Host" &&
              hostRoutes.map((route) => (
                <Route exact key={route.path} path={route.path}>
                  {route.component}
                </Route>
              ))}
            {data.me.role === "Listener" &&
              listenerRoutes.map((route) => (
                <Route exact key={route.path} path={route.path}>
                  {route.component}
                </Route>
              ))}
            {commonRoutes.map((route) => (
              <Route exact key={route.path} path={route.path}>
                {route.component}
              </Route>
            ))}
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};
