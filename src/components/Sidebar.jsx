import { useState } from "react";
import { getAuth } from "firebase/auth";
import SidebarItem from "./SidebarItem";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  HomeIcon,
  CameraIcon,
  PhotographIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

const Sidebar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  return (
    <>
      <ChevronDoubleRightIcon
        className="cursor-pointer w-9 min-w-9 h-9 p-1 rounded-md text-indigo-800 hover:bg-blue-100 transition-all"
        onClick={() => setShowDropdown((prev) => !prev)}
      />
      {showDropdown && (
        <aside className="flex flex-col bg-white h-full justify-between fixed left-0 top-0 w-60 text-black rounded-lg p-4 shadow-lg transition-all ease-in-out">
          <div className="flex flex-col gap-2 items-start">
            <div className="flex justify-between w-full items-center flex-row-reverse">
              <ChevronDoubleLeftIcon
                className="cursor-pointer w-9 h-9 p-1 rounded-md text-indigo-800 hover:bg-blue-100 transition-all"
                onClick={() => setShowDropdown((prev) => !prev)}
              />
              <h1 className="text-3xl font-bold text-blue-800 transition-all">
                Taggy
              </h1>
            </div>
            <hr className="w-full my-2 bg-blue-500 h-[1px] border-none" />
            <SidebarItem
              text="Home"
              link="/"
              icon={<HomeIcon className="h-6" />}
              color="indigo"
            />
            {currentUser && (
              <>
                <SidebarItem
                  text="Add Photo"
                  link={`/photo/add/${currentUser.uid}`}
                  icon={<CameraIcon className="h-6" />}
                  color="indigo"
                />
                <SidebarItem
                  text="Library"
                  link={`/photo/show/${currentUser.uid}`}
                  icon={<PhotographIcon className="h-6" />}
                  color="indigo"
                />
              </>
            )}
            <SidebarItem
              text="Sign Out"
              link="none"
              icon={<UserCircleIcon className="h-6" />}
              color="red"
            />
          </div>

          {currentUser ? (
            <div className="flex flex-col mt-4">
              <hr className="w-full my-2 bg-blue-500 h-[1.5px] border-none" />
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-blue-300"
                    src={currentUser.photoURL}
                    alt="User"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-blue-600">
                      {currentUser.displayName}
                    </h1>
                    <p className="text-xs text-blue-500">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col mt-4">
              <hr className="w-full my-2 bg-blue-500 h-[1.5px] border-none" />
              <p className="text-blue-500 text-sm text-center">
                Not signed in
              </p>
            </div>
          )}
        </aside>
      )}
    </>
  );
};

export default Sidebar;
