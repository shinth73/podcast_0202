/** @format */

import { faCog, faSearch, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faDeezer } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { useForm } from "react-hook-form";

interface IFormProps {
  searchTerm: string;
}

export const Header = withRouter(({ match, location }) => {
  const { data: userData } = useMe();
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };

  return (
    <div className="fixed w-full border-bottom bg-black border-b-2 border-gray-800">
      <div
        className="sm:mx-1 md:mx-10 lg:mx-20 xl:mx-36
       text-gray-300 text-opacity-60 flex justify-between 
      items-center"
      >
        <div className="mx-3">
          <Link to="/">
            <div className="flex justify-around items-center">
              <FontAwesomeIcon icon={faDeezer} className="text-2xl text-white" />
              <div className="font-bold ml-1 text-sm text-green-400 hidden md:flex">
                {" "}
                PodcastCom.
              </div>
            </div>
          </Link>
        </div>
        <div className="w-8/12 flex justify-around items-center">
          <div className="py-2 w-1/5 flex justify-center text-sm font-bold border-bottom border-b-4 border-yellow-400 border-opacity-0 hover:border-opacity-70">
            <Link to="/category/News">News</Link>
          </div>
          <div className="py-2 w-1/5 flex justify-center text-sm font-bold border-bottom border-b-4 border-yellow-400 border-opacity-0 hover:border-opacity-70">
            <Link to="/category/Sports">Sports</Link>
          </div>
          <div className="py-2 w-1/5 flex justify-center text-sm font-bold border-bottom border-b-4 border-yellow-400 border-opacity-0 hover:border-opacity-70">
            <Link to="/category/Movie">Movie</Link>
          </div>
          <div className="py-2 w-1/5 flex justify-center text-sm font-bold border-bottom border-b-4 border-yellow-400 border-opacity-0 hover:border-opacity-70">
            <Link to="/category/More">Music</Link>
          </div>
          <div className="py-2 w-1/5  flex justify-center text-sm font-bold border-bottom border-b-4 border-yellow-400 border-opacity-0 hover:border-opacity-70">
            <Link to="/category/Health">Health</Link>
          </div>
        </div>
        <div className="flex justify-around items-center">
          <div className="ml-2">
            <form onSubmit={handleSubmit(onSearchSubmit)} className="bg-black ">
              <input
                ref={register({ required: true, min: 3 })}
                name="searchTerm"
                type="Search"
                className="input rounded-sm text-sm font-bold  border-0 h-5 w-11/12"
                placeholder="Search..."
              />
            </form>
          </div>
          <div className="md:mx-3">
            {userData.me.role === "Host" ? (
              <Link to="/my-podcasts">
                <FontAwesomeIcon className="text-sm text-white" icon={faCog} />
              </Link>
            ) : (
              <Link to="/edit-profile">
                <FontAwesomeIcon className="text-sm text-white" icon={faCog} />
              </Link>
            )}
          </div>
          <div className="ml-2 md:mx-3">
            <Link to="/logout">
              <FontAwesomeIcon className="text-sm text-white" icon={faSignOutAlt} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});
