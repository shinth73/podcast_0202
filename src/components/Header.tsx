/** @format */

import { faPodcast, faSearch, faSignOutAlt, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { faDeezer } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, withRouter } from "react-router-dom";

// Arts = "Arts",
// Movie = "Movie",
// Education = "Education",
// Health = "Health",
// Music = "  Music",
// News = "News",
// Science = "Science",
// Sports = "Sports",
// Etc = "Etc",
export const Header = withRouter(({ match, location }) => {
  return (
    <div className="md:w-full border-bottom bg-black border-b-2 border-gray-800">
      <div
        className="sm:mx-1 md:mx-10 lg:mx-20 xl:mx-36
       text-gray-300 text-opacity-60 flex justify-between 
      items-center"
      >
        <div className="mx-3">
          <Link to="/">
            <div className="mx5 flex justify-around items-center">
              <FontAwesomeIcon icon={faDeezer} className="text-2xl text-white" />
              <div className="font-bold ml-1 text-sm text-green-400"> PodcastCom.</div>
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
          <div className="mx-2">
            <Link to="/">
              <FontAwesomeIcon className="text-sm text-white" icon={faSearch} />
            </Link>
          </div>
          <div className="mx-2">
            <Link to="/edit-profile">
              <FontAwesomeIcon className="text-sm text-white" icon={faUserCog} />
            </Link>
          </div>
          <div className="mx-3">
            <Link to="/logout">
              <FontAwesomeIcon className="text-sm text-white" icon={faSignOutAlt} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});
