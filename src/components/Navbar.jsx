import { useState } from "react";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import { activeBellIcon, inActiveBellIcon } from "./icons";

const Navbar = () => {

  const [activeBell, setActiveBell] = useState(false);

  return (
    <div className="myNavbar">
        <div className="bellIcon" onClick={() => setActiveBell(!activeBell)}>
        {activeBell ? activeBellIcon : inActiveBellIcon}
        </div>
        <h1 className="brand-name text-3xl">Taggi</h1>
        <ProfileDropdownMenu />
    </div>
  )
}

export default Navbar