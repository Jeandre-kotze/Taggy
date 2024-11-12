import { useState } from "react";
import ProfileDropdownMenu from "./ProfileDropdownMenu.jsx";
import { activeBellIcon, inActiveBellIcon } from './icons.jsx';

// eslint-disable-next-line react/prop-types
const Wrapper = ({children, setIsAuth}) => {

    const [activeBell, setActiveBell] = useState(false);

  return (
    <div>
        <div className="flex justify-between items-center fixed w-full top-0 left-0 px-4 text-white z-10 py-2">
          <ProfileDropdownMenu changeIsAuth={setIsAuth}/>
        <h1 className="brand-name text-6xl text-center">Taggi</h1>
        <div className="bellIcon" onClick={() => setActiveBell(!activeBell)}>
          {activeBell ? activeBellIcon : inActiveBellIcon}
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Wrapper